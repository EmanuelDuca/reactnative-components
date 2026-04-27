---
name: query-params
description: 'URL query parameter management with nuqs and Expo Router. Use when: reading or writing URL search params, adding filter/sort state to URLs, creating serialized links with params, or syncing component state with the URL.'
---

# Query Parameters (nuqs)

## Stack

| Library | Purpose |
|---------|---------|
| `nuqs` | Type-safe URL query state management |
| Custom Expo adapter | Bridges nuqs with Expo Router's `useLocalSearchParams` / `router.setParams` |

## Architecture

### Expo Router Adapter

nuqs is connected to Expo Router via a custom adapter at `packages/ui/src/lib/nuqs-expo-adapter.ts`.

It's mounted at the app root in `AppRootLayout`:

```tsx
<NuqsExpoAdapter>
  <ThemeStoreProvider>
    {/* ... rest of app */}
  </ThemeStoreProvider>
</NuqsExpoAdapter>
```

The adapter:
- Reads query params via `useLocalSearchParams`, filtering out dynamic route segments (e.g. `[id]`)
- Updates params via `router.setParams()`
- Removes stale params by setting them to `undefined`

## Core Pattern

### 1. Define parser object (page-level constant)

Define a nuqs parser object outside the component, co-located with the page that owns it:

```typescript
import {
  parseAsString,
  parseAsBoolean,
  parseAsArrayOf,
  parseAsStringLiteral,
  parseAsIsoDate,
  parseAsFloat,
  createSerializer,
  useQueryStates,
} from 'nuqs';

const myPageNuqs = {
  search: parseAsString.withDefault(''),
  status: parseAsArrayOf(parseAsStringLiteral(['active', 'pending'] as const)).withDefault([]),
  date: parseAsIsoDate,
  redirect: parseAsString,
};
```

### 2. Create a serializer (for building links)

```typescript
export const myPageSerializer = createSerializer(myPageNuqs);

// Usage: build URL with type-safe params
const url = myPageSerializer('/my-page', { search: 'test', status: ['active'] });
// → "/my-page?search=test&status=active"
```

### 3. Read/write with `useQueryStates`

```typescript
export function useMyPageSearchParams() {
  return useQueryStates(myPageNuqs);
}

// In component
function MyPage() {
  const [searchParams, setSearchParams] = useMyPageSearchParams();

  // Read
  searchParams.search   // string (default: '')
  searchParams.status   // string[] (default: [])
  searchParams.date     // Date | null

  // Write (partial updates)
  setSearchParams({ search: 'new value' });

  // Reset a param to null (removes from URL)
  setSearchParams({ date: null });
}
```

### 4. Single param with `useQueryState` (rare)

For isolated params not part of a group:

```typescript
import { useQueryState, parseAsBoolean } from 'nuqs';

const [isRedirect] = useQueryState('as24-redirect', parseAsBoolean.withDefault(false));
```

## Real Examples

### Filter State (complex)

```typescript
// packages/ui/src/components/transaction-list-filters.tsx
const transactionListNuqs = {
  search: parseAsString.withDefault(''),
  status: parseAsArrayOf(parseAsStringLiteral(TransactionDisplayStatuses)).withDefault([]),
  currency: parseAsArrayOf(parseAsStringLiteral(config.currencies)).withDefault([]),
  createdFrom: parseAsIsoDate,
  createdTo: parseAsIsoDate,
  recipient: parseAsArrayOf(parseAsString).withDefault([]),
  payoutAccount: parseAsArrayOf(parseAsString).withDefault([]),
  role: parseAsArrayOf(parseAsStringLiteral(TransactionRoles)).withDefault([]),
  user: parseAsArrayOf(parseAsString).withDefault([]),
  sort: parseAsString.withDefault('asc'),
  showHiddenTransactions: parseAsBoolean.withDefault(false),
  isTodo: parseAsBoolean.withDefault(false),
};

export const transactionListSearchParamsSerializer = createSerializer(transactionListNuqs);
export function useTransactionListSearchParams() {
  return useQueryStates(transactionListNuqs);
}
```

### Redirect Param (simple, reused across pages)

```typescript
// packages/ui/src/pages/auth/sign-in-page-content/sign-in-page-content.tsx
const signInPageNuqs = {
  redirect: parseAsString,
};
export const signInPageSerializer = createSerializer(signInPageNuqs);

// In component
const [searchParams] = useQueryStates(signInPageNuqs);
router.replace(searchParams.redirect ?? Routes.Dashboard.Home);
```

### Form Prefill from URL

```typescript
// packages/ui/src/pages/.../transaction-flow-prefiller.tsx
const newTransactionPrefillNuqs = {
  type: parseAsStringLiteral(TransactionTypes),
  amount: parseAsFloat,
  currency: parseAsStringLiteral(config.currencies),
  feePayer: parseAsStringLiteral(TransactionFeePayers),
  recipient: parseAsString,
};

export const newTransactionPrefillSerializer = createSerializer(newTransactionPrefillNuqs);

// Reads URL params and prefills form
const [payproffDetails] = useQueryStates(newTransactionPrefillNuqs);
prefillFormValues({ form: flow.form, values: { ... } });
```

## Available Parsers

| Parser | Output Type | Example |
|--------|-------------|---------|
| `parseAsString` | `string \| null` | `?q=hello` |
| `parseAsBoolean` | `boolean \| null` | `?active=true` |
| `parseAsFloat` | `number \| null` | `?amount=99.5` |
| `parseAsInteger` | `number \| null` | `?page=2` |
| `parseAsIsoDate` | `Date \| null` | `?from=2024-01-01` |
| `parseAsStringLiteral(values)` | union type \| null | `?status=active` |
| `parseAsArrayOf(parser)` | `T[]` | `?tag=a&tag=b` |

Use `.withDefault(value)` to provide a fallback (returned instead of `null`).

## Conventions

1. **Define nuqs objects as page-level constants** — named `<pageName>Nuqs`
2. **Export serializers** — named `<pageName>Serializer`, used to build links from other pages
3. **Export custom hooks** when params are consumed in child components — `useMyPageSearchParams()`
4. **Prefer `useQueryStates`** over individual `useQueryState` for grouped params
5. **Use `parseAsStringLiteral`** for enum-like values — provides type safety
6. **Use `.withDefault()`** for params that should never be null in logic

## Key Files

| File | Purpose |
|------|---------|
| `packages/ui/src/lib/nuqs-expo-adapter.ts` | Custom Expo Router adapter for nuqs |
| `packages/ui/src/pages/app-root-layout.tsx` | `<NuqsExpoAdapter>` provider mount |
| `packages/ui/src/components/transaction-list-filters.tsx` | Complex filter example |
| `packages/ui/src/pages/auth/sign-in-page-content/sign-in-page-content.tsx` | Redirect param example |
| `packages/ui/src/pages/.../transaction-flow-prefiller.tsx` | URL-to-form prefill example |
