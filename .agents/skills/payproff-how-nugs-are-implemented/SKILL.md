---
name: payproff-data-fetching
description: 'Patterns for building URL-synced filters and React Query data fetching in payproff-apps. Use when adding new filters, queries, list pages, or paginated data fetching. Covers nuqs URL state, query key conventions, API param mapping, and the expo-router nuqs adapter.'
---

# payproff-apps — Data Fetching & URL Filters

## When to Use
- Adding a new filter to a list page
- Creating a new API query hook
- Building a new paginated list page
- Understanding how URL state syncs to API calls

---

## 1. URL Filter State with nuqs

All filter state lives in the URL, managed by **nuqs** (`useQueryStates`).

### Define the nuqs config object

```ts
// packages/ui/src/components/your-list-filters.tsx
import {
  parseAsArrayOf,
  parseAsBoolean,
  parseAsIsoDate,
  parseAsString,
  parseAsStringLiteral,
  createSerializer,
  useQueryStates,
} from 'nuqs';

const yourListNuqs = {
  search: parseAsString.withDefault(''),
  status: parseAsArrayOf(parseAsStringLiteral(['active', 'inactive'])).withDefault([]),
  createdFrom: parseAsIsoDate,   // null by default (no .withDefault)
  createdTo: parseAsIsoDate,
  role: parseAsArrayOf(parseAsStringLiteral(SomeRoles)).withDefault([]),
  isTodo: parseAsBoolean.withDefault(false),
  sort: parseAsString.withDefault('asc'),
};

// Serializer for building links with pre-filled filters
export const yourListSearchParamsSerializer = createSerializer(yourListNuqs);

export function useYourListSearchParams() {
  return useQueryStates(yourListNuqs);
}

export type YourListFilters = ReturnType<typeof useYourListSearchParams>['0'];
export type UpdateYourListFilters = ReturnType<typeof useYourListSearchParams>['1'];
```

### Parser cheat sheet

| Data type | Parser |
|---|---|
| Free text string | `parseAsString.withDefault('')` |
| Multi-select enum | `parseAsArrayOf(parseAsStringLiteral(VALUES)).withDefault([])` |
| Date (ISO) | `parseAsIsoDate` (no default = nullable) |
| Boolean toggle | `parseAsBoolean.withDefault(false)` |
| Numeric | `parseAsInteger` / `parseAsFloat` |
| JSON object | `parseAsJson(zodSchema.parse)` |

---

## 2. Expo Router ↔ nuqs Adapter

The custom adapter in `packages/ui/src/lib/nuqs-expo-adapter.ts` bridges nuqs with Expo Router:
- **Reads** URL params via `useLocalSearchParams()`, filtering out dynamic route segments (e.g. `[id]`)
- **Writes** back via `router.setParams()`, explicitly setting removed params to `undefined`

The `NuqsExpoAdapter` provider must wrap the app for nuqs to work on native/web.

---

## 3. API Layer

### Define params type and fetch function

```ts
// packages/ui/src/api/your-resource.ts
export type GetYourResourceParams = {
  skip?: number;
  take?: number;
  filter?: string;          // free-text search
  state?: SomeState[];
  createdFrom?: number;     // Unix ms (not ISO date)
  createdTo?: number;
  role?: SomeRole[];
};

export type GetYourResourceResponse = {
  total: number;
  result: YourResourceDto[];
};

export async function getYourResources(params?: GetYourResourceParams) {
  return payproffFetch
    .get('YourResource', { searchParams: createSearchParams(params) })
    .json<GetYourResourceResponse>();
}
```

> Dates must be converted from ISO `Date` → Unix milliseconds before being sent to the API (see section 4).

---

## 4. React Query Hooks

### Query keys & query options

```ts
// packages/ui/src/hooks/your-resource.ts
export const YourResourceQueryKeys = {
  all: ['your-resource'] as const,
  lists: () => [...YourResourceQueryKeys.all, 'list'] as const,
  singles: () => [...YourResourceQueryKeys.all, 'single'] as const,
};

export const YourResourceQueries = {
  list: (params?: GetYourResourceParams, options?: ExternalQueryOptions) =>
    queryOptions({
      queryKey: [...YourResourceQueryKeys.lists(), params], // full params in key = one cache entry per filter combo
      queryFn: () => getYourResources(params),
      ...options,
    }),
  single: (params: { id: string }, options?: ExternalQueryOptions) =>
    queryOptions({
      queryKey: [...YourResourceQueryKeys.singles(), params],
      queryFn: () => getYourResource(params),
      ...options,
    }),
};

export function useYourResourcesQuery(
  params?: GetYourResourceParams,
  options?: ExternalQueryOptions,
) {
  return useQuery(YourResourceQueries.list(params, options));
}
```

### Invalidation helper (after mutations)

```ts
function handleYourResourceQueryInvalidation(
  queryClient: QueryClient,
  resource: YourResourceDto,
) {
  queryClient.invalidateQueries({ queryKey: YourResourceQueryKeys.lists() });
  queryClient.setQueryData(
    YourResourceQueries.single({ id: resource.id }).queryKey,
    resource,
  );
}
```

---

## 5. Wiring URL Filters → API Params (Page Component)

This is the mapping layer — the page component is responsible for translating URL filter values into API params.

```tsx
// packages/ui/src/pages/.../your-list-page-content.tsx
import { keepPreviousData } from '@tanstack/react-query';
import dayjs from 'dayjs';
import React from 'react';
import { useDebounceValue } from 'usehooks-ts';
import { useYourListSearchParams } from '~ui/components/your-list-filters';
import { useYourResourcesQuery } from '~ui/hooks/your-resource';
import { getSomeStatesFromDisplayStatus } from '~ui/lib/helpers/your-resource';

export function YourListPageContent() {
  const [filters, updateFilters] = useYourListSearchParams();

  // Pagination lives in local state (not in URL)
  const [pageSize, setPageSize] = React.useState(10);
  const [currentPage, setCurrentPage] = React.useState(1);

  // Debounce search to avoid firing a request on every keystroke
  const [debouncedSearch] = useDebounceValue(filters.search, 300);

  const query = useYourResourcesQuery(
    {
      take: pageSize,
      skip: (currentPage - 1) * pageSize,

      // Free-text search: only pass if non-empty
      filter: debouncedSearch || undefined,

      // Display status → one or more API states
      state: filters.status?.flatMap((s) => getSomeStatesFromDisplayStatus(s)),

      // Direct mappings
      role: filters.role,
      currency: filters.currency,

      // Field rename: URL uses camelCase, API may differ
      payoutAccountId: filters.payoutAccount,

      // Date: ISO Date object → start/end of day in Unix ms
      createdFrom: filters.createdFrom
        ? dayjs(filters.createdFrom).startOf('day').valueOf()
        : undefined,
      createdTo: filters.createdTo
        ? dayjs(filters.createdTo).endOf('day').valueOf()
        : undefined,

      isTodo: filters.isTodo,
    },
    { placeholderData: keepPreviousData }, // show previous results while loading
  );

  const items = query.data?.result ?? [];
  const total = query.data?.total ?? 0;
  const totalPages = Math.ceil(total / pageSize);

  // ... render
}
```

### Common transformations

| URL filter value | API param | Transformation |
|---|---|---|
| `filters.search` (string) | `filter` | Pass only if non-empty; debounce 300ms |
| `filters.status` (display enum[]) | `state` | `flatMap(getStatesFromDisplayStatus)` — 1 display status can map to N API states |
| `filters.createdFrom` (Date \| null) | `createdFrom` | `dayjs(d).startOf('day').valueOf()` |
| `filters.createdTo` (Date \| null) | `createdTo` | `dayjs(d).endOf('day').valueOf()` |
| `filters.payoutAccount` (string[]) | `payoutAccountId` | renamed |
| `filters.role`, `filters.currency` | same name | direct |
| `filters.isTodo` (boolean) | `isTodo` | direct; `false` is still passed |

> Filters stored in the URL but **not** sent to the API (client-side only): `sort`, `showHiddenTransactions`, `recipient`, `user` — handle these client-side if needed.

---

## 6. Conventions & Gotchas

- **Query key includes full params** — every unique filter/page combination gets its own cache entry automatically.
- **`keepPreviousData`** — always use on paginated/filtered lists so previous results stay visible during loading.
- **Pagination resets** — when filters change, reset `currentPage` to 1 to avoid empty results on page 5 of a now-smaller dataset.
- **Debounce search** — always 300ms via `useDebounceValue` before passing to the query.
- **Dates to API** — the API expects Unix milliseconds (`number`), not ISO strings or `Date` objects.
- **`null` vs `undefined`** — nuqs returns `null` for parsers without `.withDefault()`; convert to `undefined` before passing to API params.
- **`ExternalQueryOptions`** — the shared type from `~ui/hooks/helpers` that extends `queryOptions` with `enabled`, `placeholderData`, `refetchInterval`, `meta`, etc.
