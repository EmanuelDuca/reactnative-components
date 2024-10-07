import * as React from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { FacetedFilter } from "../facetedFilter";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";

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
    cell: (info) => (
      <Text style={{ fontStyle: "italic" }}>{info.getValue()}</Text>
    ),
    header: () => <Text>Last Name</Text>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("age", {
    header: () => <Text>Age</Text>,
    cell: (info) => <Text>{info.renderValue()}</Text>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("visits", {
    header: () => <Text>Visits</Text>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("state", {
    header: () => <Text>State</Text>,
    footer: (info) => info.column.id,
    filterFn: "arrIncludesSome",
  }),
  columnHelper.accessor("progress", {
    header: () => <Text>Profile Progress</Text>,
    footer: (info) => info.column.id,
  }),
];

export function MobileTable() {
  const [data, _setData] = React.useState(() => [...defaultData]);
  const options = useGuaranteeStatusFilters();
  const [columnFilters, setColumnFilters] = React.useState<any>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
  });

  return (
    <ScrollView>
      <View style={styles.container}>
        <FacetedFilter
          title="Status"
          column={table.getColumn("state")}
          options={options}
        />
        <View style={styles.table}>
          {/* Header */}
          {table.getHeaderGroups().map((headerGroup) => (
            <View key={headerGroup.id} style={styles.row}>
              {headerGroup.headers.map((header) => (
                <Text key={header.id} style={styles.headerCell}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </Text>
              ))}
            </View>
          ))}
          {/* Body */}
          {table.getRowModel().rows.map((row) => (
            <View key={row.id} style={styles.row}>
              {row.getVisibleCells().map((cell) => (
                <Text key={cell.id} style={styles.cell}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Text>
              ))}
            </View>
          ))}
          {/* Footer */}
          {table.getFooterGroups().map((footerGroup) => (
            <View key={footerGroup.id} style={styles.row}>
              {footerGroup.headers.map((header) => (
                <Text key={header.id} style={styles.footerCell}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </Text>
              ))}
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  table: {
    marginVertical: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  headerCell: {
    fontWeight: "bold",
    padding: 8,
  },
  cell: {
    padding: 8,
  },
  footerCell: {
    fontWeight: "bold",
    padding: 8,
  },
  button: {
    padding: 12,
    backgroundColor: "#007AFF",
    borderRadius: 8,
    alignItems: "center",
  },
});

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
