import * as React from "react";

/*
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  FacetedFilter, FacetedFilterContent,
  FacetedFilterEmpty,
  FacetedFilterGroup,
  FacetedFilterIndicator,
  FacetedFilterInput,
  FacetedFilterItem,
  FacetedFilterList,
  FacetedTriggerValue,
  FactedTrigger,
} from "./facetedFilter";
import { Badge, BadgeText, Button } from "@usekeyhole/nativewind";
import { CommandItem, SelectContent, SelectEmpty } from "@usekeyhole/web";
import { Text, View } from "react-native";

type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  state: string;
  progress: number;
};

const defaultData: Person[] = [
  {
    firstName: "tanner",
    lastName: "linsley",
    age: 24,
    visits: 100,
    state: "Active",
    progress: 50,
  },
  {
    firstName: "tandy",
    lastName: "miller",
    age: 40,
    visits: 40,
    state: "Onboarding",
    progress: 80,
  },
  {
    firstName: "joe",
    lastName: "dirte",
    age: 45,
    visits: 20,
    state: "Closed",
    progress: 10,
  },
];

const columnHelper = createColumnHelper<Person>();

const columns = [
  columnHelper.accessor("firstName", {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.lastName, {
    id: "lastName",
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Last Name</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("age", {
    header: () => "Age",
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("visits", {
    header: () => <span>Visits</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("state", {
    header: "state",
    footer: (info) => info.column.id,
    filterFn: "arrIncludesSome",
  }),
  columnHelper.accessor("progress", {
    header: "Profile Progress",
    footer: (info) => info.column.id,
  }),
];

export function Table() {
  const [data, _setData] = React.useState(() => [...defaultData]);
  const rerender = React.useReducer(() => ({}), {})[1];
  const options = useGuaranteeStatusFilters();
  const [columnFilters, setColumnFilters] = React.useState<any>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
    },
    // manualFiltering: true,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    // getFacetedRowModel: getFacetedRowModel(),
    onColumnFiltersChange: setColumnFilters,
  });

  // This is for storing selected values in the table not in the Faceted Component
  const column = table.getColumn("state");
  const [selectedValues, setSelectedValues] = React.useState(
    new Set(column?.getFilterValue() as string[])
  );

  const handleChange = (item) => {
    const isSelected = selectedValues.has(item.value);
    if (isSelected) {
      selectedValues.delete(item.value);
    } else {
      selectedValues.add(item.value);
    }
    const filterValues = Array.from(selectedValues);
    column?.setFilterValue(filterValues.length ? filterValues : undefined);
  };

  const clearFilters = () => {
    setSelectedValues(new Set(column?.getFilterValue() as string[]));
    column.setFilterValue(undefined);
  };

  return (
    <>
      <View className="items-start">
        <FacetedFilter
          title="Status"
          column={table.getColumn("state")}
          options={options}
        ></FacetedFilter>
      </View>
      <View>
        <div className="p-2">
          <table>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
            <tfoot>
              {table.getFooterGroups().map((footerGroup) => (
                <tr key={footerGroup.id}>
                  {footerGroup.headers.map((header) => (
                    <th key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.footer,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </tfoot>
          </table>
          <div className="h-4" />
          <button onClick={() => rerender()} className="border p-2">
            Rerender
          </button>
        </div>
      </View>

      {/* <FactedTrigger>
          <FacetedTriggerValue />
        </FactedTrigger>
        <FacetedFilterContent align="start" className=" bg-white">
          <FacetedFilterInput placeholder="Random Text" />
          <FacetedFilterList onClearFilters={clearFilters}>
            <FacetedFilterEmpty>No address found.</FacetedFilterEmpty>
            <FacetedFilterGroup>
              {options.map((item) => {
                const isSelected = selectedValues.has(item.value);
                return (
                  <FacetedFilterItem
                    value={item.value}
                    key={item.value}
                    checked={isSelected}
                    onChange={() => handleChange(item)}
                  >
                    <FacetedFilterIndicator />
                    <Badge
                    // size={item.BadgeInfo.size}
                    // variant={item.BadgeInfo.variant}
                    >
                      <BadgeText>{item.label}</BadgeText>
                    </Badge>
                  </FacetedFilterItem>
                );
              })}
            </FacetedFilterGroup>
          </FacetedFilterList>
        </FacetedFilterContent> }
    </>
  );
}

export const GUARANTEE_STATES = [
  "Inactive",
  "Closed",
  "Active",
  "MovingOut",
  "Onboarding",
] as const;

export const getStatusTextAndColor = (status: string) => {
  switch (status) {
    case "Active":
      return {
        color: "red",
        text: "Active",
      };

    case "Inactive":
      return {
        color: "darkGrey",
        text: "-",
      };

    case "MovingOut":
      return {
        color: "green50",
        text: "MoveOut",
      };

    case "Onboarding":
      return {
        color: "paragraph",
        text: "Onboarding",
      };

    case "Closed":
      return {
        color: "green",
        text: "Closed",
      };

    // - dispute
    default:
      return {
        color: "darkGrey",
        text: status,
      };
  }
};

const useGuaranteeStatusFilters = () => {
  return GUARANTEE_STATES.map<{
    label: string;
    value: any;
    icon: React.FC;
  }>((state) => {
    const { text, color } = getStatusTextAndColor(state);
    return {
      label: text,
      value: state,
      icon: undefined,
    };
  })
    .filter((filter) => filter.label !== "-")
    .sort((a, b) => a.label.localeCompare(b.label));
};
*/
