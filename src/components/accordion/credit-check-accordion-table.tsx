import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  Table as TableType,
  Row,
} from "@tanstack/react-table";
import dayjs from "dayjs";
import { Badge, BadgeText, Text, ScanSearch } from "@usekeyhole/nativewind";
import React from "react";
import { View } from "react-native";
import { CountrySelectorFlag } from "@usekeyhole/web";
import {
  Table,
  TableContainer,
  TableHeader,
  TableFlatList,
  TableRow,
  TableCell,
  TableHead,
  TableHeadText,
  TableCellText,
  TableSkeleton,
  TablePagination,
  AccordionTable,
  AccordionTableRow,
  AccordionTableRowContent,
  AccordionTableRowToggle,
  TableRowProps,
} from "./table";
import { AccordionContent, AccordionProps } from "./accordion";

// Mock types
type CreditCheckResponse = {
  id: string;
  hashedValue: string;
  createDate: string;
  recipientName: string;
  referenceNumber: string;
  approved: boolean;
  creditCheckType: "DanishCreditCheck" | "NorwegianCreditCheck";
  remarks: { id: string; message: string }[];
};

type CreditChecksResponse = {
  results: CreditCheckResponse[];
};

// Mock localization
const useLocalizationContext = () => ({
  t: (key: string) => key,
});

// Dummy remarks table (optional)
const CreditCheckRemarksTable = ({ table }: { table: any }) => (
  <Text className="text-sm text-muted-foreground">Remarks Table</Text>
);

const creditCheckRemarksTableColumns = [
  {
    id: "message",
    accessorKey: "message",
    header: () => <TableHeadText>Message</TableHeadText>,
    cell: ({ row }: any) => (
      <TableCell>
        <TableCellText>{row.original.message}</TableCellText>
      </TableCell>
    ),
  },
];

type CreditChecksTableProps = {
  table: TableType<CreditCheckResponse>;
  isPending?: boolean;
};
function CreditChecksTable({ isPending, table }: CreditChecksTableProps) {
  const { t } = useLocalizationContext();

  const pageSize = table.getState().pagination.pageSize;
  const tableRows = table.getRowModel().rows;

  return (
    <TableContainer>
      <Table>
        <TableFlatList<(typeof tableRows)[number]>
          data={isPending ? Array(pageSize) : tableRows}
          keyExtractor={(item, index) => String(item?.id || index)}
          ListHeaderComponent={() =>
            table.getHeaderGroups().map((headerGroup) => (
              <TableHeader key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <React.Fragment key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </React.Fragment>
                ))}
              </TableHeader>
            ))
          }
          renderItem={({ item: row, index }) =>
            isPending ? (
              <SkeletonRow isLastRow={index === pageSize - 1} />
            ) : (
              <CreditChecksTableRow
                key={row.id}
                row={row}
                index={index}
                isPending={isPending}
              />
            )
          }
          ListEmptyComponent={() => (
            <TableRow isLastRow>
              <TableCell className="flex-1 justify-center">
                <TableCellText className="text-center">
                  {t("credit_checks_table_empty_title")}
                </TableCellText>
                <TableCellText className="text-center">
                  {t("credit_checks_table_empty_description")}
                </TableCellText>
              </TableCell>
            </TableRow>
          )}
        />
      </Table>
    </TableContainer>
  );
}

type CreditChecksAccordionTableProps = CreditChecksTableProps &
  Pick<AccordionProps, "multiple">;
function CreditChecksAccordionTable({
  isPending,
  multiple,
  table,
}: CreditChecksAccordionTableProps) {
  const { t } = useLocalizationContext();

  const pageSize = table.getState().pagination.pageSize;
  const tableRows = table.getRowModel().rows;

  return (
    <TableContainer>
      <AccordionTable multiple={multiple}>
        <TableFlatList<(typeof tableRows)[number]>
          data={isPending ? Array(pageSize) : tableRows}
          keyExtractor={(item, index) => String(item?.id || index)}
          ListHeaderComponent={() =>
            table.getHeaderGroups().map((headerGroup) => (
              <TableHeader key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <React.Fragment key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </React.Fragment>
                ))}
              </TableHeader>
            ))
          }
          renderItem={({ item: row, index }) =>
            isPending ? (
              <SkeletonRow isLastRow={index === pageSize - 1} />
            ) : (
              <CreditChecksTableAccordionRow
                key={row.id}
                row={row}
                index={index}
                isPending={isPending}
              />
            )
          }
          ListEmptyComponent={() => (
            <TableRow
              className="flex flex-1 flex-col items-center justify-center py-12"
              isLastRow
            >
              <ScanSearch className="mb-4 size-12 stroke-1" />
              <Text className="mb-2 font-semibold">
                {t("credit_checks_table_empty_title")}
              </Text>
              <Text className="mb-4 text-accent-foreground">
                {t("credit_checks_table_empty_description")}
              </Text>
            </TableRow>
          )}
        />
      </AccordionTable>
    </TableContainer>
  );
}

type CreditChecksTableRowProps = {
  row: Row<CreditCheckResponse>;
  index: number;
  isPending?: boolean;
};

function CreditChecksTableRow({
  index,
  isPending,
  row,
  ...props
}: CreditChecksTableRowProps) {
  const remarksTable = useReactTable({
    columns: creditCheckRemarksTableColumns,
    data: row?.original?.remarks || [],
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <View key={row.id} className="bg-accent">
      <TableRow
        style={{
          gap: 24,
          height: 48,
        }}
        {...props}
      >
        {row.getVisibleCells().map((cell) => (
          <React.Fragment key={cell.id}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </React.Fragment>
        ))}
      </TableRow>
      {row.original.remarks.length > 0 && (
        <View className="border-b border-border p-4">
          <CreditCheckRemarksTable table={remarksTable} isPending={false} />
        </View>
      )}
    </View>
  );
}

function CreditChecksTableAccordionRow({
  index,
  isPending,
  row,
}: CreditChecksTableRowProps) {
  const remarks = row.original.remarks;

  const RowContent = row
    .getVisibleCells()
    .map((cell) => (
      <React.Fragment key={cell.id}>
        {flexRender(cell.column.columnDef.cell, cell.getContext())}
      </React.Fragment>
    ));

  if (remarks.length === 0) return <TableRow>{RowContent}</TableRow>;

  const remarksTable = useReactTable({
    columns: creditCheckRemarksTableColumns,
    data: remarks,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <AccordionTableRow value={row.id}>
      <AccordionTableRowContent>{RowContent}</AccordionTableRowContent>

      <AccordionContent className="p-4">
        {remarks.length > 0 && (
          <CreditCheckRemarksTable table={remarksTable} isPending={false} />
        )}
      </AccordionContent>
    </AccordionTableRow>
  );
}

const creditChecksTableColumns: ColumnDef<
  CreditChecksResponse["results"][number]
>[] = [
  {
    id: "hashedValue",
    accessorKey: "hashedValue",
    enableSorting: true,
    header: ({ column }) => {
      const { t } = useLocalizationContext();
      return (
        <TableHead column={column} className="min-w-[130px] flex-1">
          <TableHeadText>{t("label_ssn")}</TableHeadText>
        </TableHead>
      );
    },
    cell: ({ row }) => {
      const countyCode =
        row.original.creditCheckType === "NorwegianCreditCheck" ? "NO" : "DK";
      return (
        <TableCell className="min-w-[130px] flex-1">
          <View className="flex-row items-center gap-2">
            <CountrySelectorFlag code={countyCode} />
            <TableCellText>{row.original.hashedValue || "-"}</TableCellText>
          </View>
        </TableCell>
      );
    },
  },
  {
    id: "createDate",
    accessorKey: "createDate",
    enableSorting: true,
    header: ({ column }) => {
      const { t } = useLocalizationContext();
      return (
        <TableHead column={column} className="min-w-[130px] flex-1 justify-end">
          <TableHeadText>{t("label_checked_on")}</TableHeadText>
        </TableHead>
      );
    },
    cell: ({ row }) => {
      const createdDate = dayjs(row.original.createDate).format(
        "DD.MM.YYYY hh:mm"
      );
      return (
        <TableCell className="min-w-[130px] flex-1 justify-end">
          <TableCellText>{createdDate}</TableCellText>
        </TableCell>
      );
    },
  },
  {
    id: "recepientName",
    accessorKey: "recipientName",
    enableSorting: true,
    header: ({ column }) => {
      const { t } = useLocalizationContext();
      return (
        <TableHead column={column} className="min-w-[150px] flex-1 justify-end">
          <TableHeadText style={{ textAlign: "right" }}>
            {t("label_on_behalf_of")}
          </TableHeadText>
        </TableHead>
      );
    },
    cell: ({ row }) => {
      const recipient = row.original.recipientName || "-";
      return (
        <TableCell className="min-w-[150px] flex-1 justify-end">
          <TableCellText>{recipient}</TableCellText>
        </TableCell>
      );
    },
  },
  {
    id: "referenceNumber",
    accessorKey: "referenceNumber",
    enableSorting: true,
    header: ({ column }) => {
      const { t } = useLocalizationContext();
      return (
        <TableHead column={column} className="min-w-[150px] justify-end">
          <TableHeadText>{t("label_reference_no")}</TableHeadText>
        </TableHead>
      );
    },
    cell: ({ row }) => {
      return (
        <TableCell className="min-w-[150px] justify-end">
          <TableCellText>{row.original.referenceNumber}</TableCellText>
        </TableCell>
      );
    },
  },
  {
    id: "approved",
    accessorKey: "approved",
    enableSorting: true,
    header: ({ column }) => {
      const { t } = useLocalizationContext();
      return (
        <TableHead column={column} className="max-w-[150px] flex-1 justify-end">
          <TableHeadText>{t("label_status")}</TableHeadText>
        </TableHead>
      );
    },
    cell: ({ row }) => {
      const { t } = useLocalizationContext();
      return (
        <TableCell className="max-w-[150px] flex-1 justify-end">
          <TableCellText>
            <Badge variant={row.original.approved ? "green" : "destructive"}>
              <BadgeText>
                {row.original.approved ? t("label_clear") : t("label_remarks")}
              </BadgeText>
            </Badge>
          </TableCellText>
        </TableCell>
      );
    },
  },
  {
    id: "toggle",
    header: () => <TableHead className="w-[60px]" />,
    cell: ({ row }) => {
      return (
        <TableCell className="w-[60px] justify-center">
          {row.original.remarks.length > 0 && <AccordionTableRowToggle />}
        </TableCell>
      );
    },
  },
];

const SkeletonRow = React.memo((props: TableRowProps) => {
  return (
    <TableRow {...props}>
      <TableCell className="min-w-[130px] flex-1">
        <TableSkeleton
          style={{
            width: `${Math.floor(Math.random() * 30) + 70}%`,
          }}
        />
      </TableCell>
      <TableCell className="min-w-[130px] flex-1 justify-end">
        <TableSkeleton
          style={{
            width: 150,
            marginHorizontal: "auto",
          }}
        />
      </TableCell>
      <TableCell className="min-w-[150px] flex-1 justify-end">
        <TableSkeleton
          style={{
            width: `${Math.floor(Math.random() * 50) + 30}%`,
            marginLeft: "auto",
          }}
        />
      </TableCell>
      <TableCell className="min-w-[150px] flex-1 justify-end">
        <TableSkeleton
          style={{
            width: `${Math.floor(Math.random() * 50) + 30}%`,
            marginLeft: "auto",
          }}
        />
      </TableCell>
      <TableCell className="max-w-[130px] flex-1 justify-end">
        <TableSkeleton
          style={{
            width: `${Math.floor(Math.random() * 50) + 30}%`,
            marginLeft: "auto",
          }}
        />
      </TableCell>
      <TableCell className="w-[60px]" />
    </TableRow>
  );
});

export {
  CreditChecksTable,
  CreditChecksAccordionTable,
  creditChecksTableColumns,
  CreditChecksTableProps,
};
