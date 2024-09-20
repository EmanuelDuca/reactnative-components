import * as React from "react";

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
import { FacetedFilter } from "./facetedFilter";
import { Badge } from "@usekeyhole/nativewind";

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

  return (
    <>
      <FacetedFilter
        title="Status"
        column={table.getColumn("state")}
        options={options}
      />
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
        text: "status_pill_active",
      };

    case "Inactive":
      return {
        color: "darkGrey",
        text: "-",
      };

    case "MovingOut":
      return {
        color: "green50",
        text: "label_move_out_claim",
      };

    case "Onboarding":
      return {
        color: "paragraph",
        text: "status_pill_onboarding",
      };

    case "Closed":
      return {
        color: "green",
        text: "label_closed",
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
    };
  })
    .filter((filter) => filter.label !== "-")
    .sort((a, b) => a.label.localeCompare(b.label));
};
