import * as React from "react";
import { ScrollView, View } from "react-native";
import {
  AccordionTableRowContent,
  Badge,
  BadgeText,
  Skeleton,
  Star,
  Text,
} from "@usekeyhole/nativewind";
import {
  Accordion,
  AccordionContent,
  AccordionContentText,
  AccordionDescription,
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionTrigger,
  AccordionTriggerTitle,
} from "~/components/accordion/accordion";
import { CountrySelectorFlag } from "@usekeyhole/web";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  PaginationState,
  Row,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { cn } from "@usekeyhole/utils";
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
  AccordionTableRowToggle,
  TableRowProps,
} from "~/components/accordion/table";

// Mock data based on your screenshot
const data = [
  {
    id: "1",
    hashedValue: "161080-****",
    createDate: "2025-05-14T02:29:00Z",
    recipientName: "Christines Ejendom",
    referenceNumber: "172471",
    approved: false,
    remarks: ["Something here"],
    countryCode: "DK",
  },
  {
    id: "2",
    hashedValue: "230693-****",
    createDate: "2025-05-05T11:40:00Z",
    recipientName: "-",
    referenceNumber: "550668",
    approved: true,
    remarks: [],
    countryCode: "DK",
  },
  {
    id: "3",
    hashedValue: "161080-****",
    createDate: "2025-04-30T12:38:00Z",
    recipientName: "33346816 AF 4. JANUA...",
    referenceNumber: "609357",
    approved: false,
    remarks: ["Details"],
    countryCode: "DK",
  },
  {
    id: "4",
    hashedValue: "150681-****",
    createDate: "2025-04-29T03:33:00Z",
    recipientName: "-",
    referenceNumber: "246433",
    approved: true,
    remarks: [],
    countryCode: "DK",
  },
  {
    id: "5",
    hashedValue: "161080-****",
    createDate: "2025-04-29T03:33:00Z",
    recipientName: "-",
    referenceNumber: "238050",
    approved: false,
    remarks: ["Details"],
    countryCode: "DK",
  },
];

export function StaticCreditCheckTable() {
  return (
    <TableContainer>
      <AccordionTable multiple={false}>
        <Table>
          <TableFlatList
            data={data}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={() => (
              <TableHeader>
                <TableHead className="min-w-[130px] flex-1">
                  <TableHeadText>SSN</TableHeadText>
                </TableHead>
                <TableHead className="min-w-[130px] flex-1 justify-end">
                  <TableHeadText>Checked on</TableHeadText>
                </TableHead>
                <TableHead className="min-w-[150px] flex-1 justify-end">
                  <TableHeadText>On behalf of</TableHeadText>
                </TableHead>
                <TableHead className="min-w-[150px] flex-1 justify-end">
                  <TableHeadText>Reference no.</TableHeadText>
                </TableHead>
                <TableHead className="max-w-[150px] flex-1 justify-end">
                  <TableHeadText>Status</TableHeadText>
                </TableHead>
                <TableHead className="w-[60px]" />
              </TableHeader>
            )}
            renderItem={({ item }) => {
              const rowContent = (
                <>
                  <TableCell className="min-w-[130px] flex-1">
                    <CountrySelectorFlag code={item.countryCode} />
                    <TableCellText className="ml-2">
                      {item.hashedValue}
                    </TableCellText>
                  </TableCell>

                  <TableCell className="min-w-[130px] flex-1 justify-end">
                    <TableCellText>30.04.2025</TableCellText>
                  </TableCell>

                  <TableCell className="min-w-[150px] flex-1 justify-end">
                    <TableCellText numberOfLines={1} ellipsizeMode="tail">
                      {item.recipientName}
                    </TableCellText>
                  </TableCell>

                  <TableCell className="min-w-[150px] flex-1 justify-end">
                    <TableCellText>{item.referenceNumber}</TableCellText>
                  </TableCell>

                  <TableCell className="max-w-[150px] flex-1 justify-end">
                    <Badge variant={item.approved ? "green" : "destructive"}>
                      <BadgeText>
                        {item.approved ? "Clear" : "Remarks"}
                      </BadgeText>
                    </Badge>
                  </TableCell>

                  <TableCell className="w-[60px] justify-center">
                    {item.remarks.length > 0 && <AccordionTableRowToggle />}
                  </TableCell>
                </>
              );

              if (item.remarks.length === 0) {
                return <TableRow>{rowContent}</TableRow>;
              }

              return (
                <AccordionTableRow value={item.id}>
                  <AccordionTableRowContent>
                    {rowContent}
                  </AccordionTableRowContent>
                  <AccordionContent className="p-4">
                    <Text className="text-sm text-muted-foreground">
                      This would be the expanded remark content.
                    </Text>
                  </AccordionContent>
                </AccordionTableRow>
              );
            }}
          />
        </Table>
      </AccordionTable>
    </TableContainer>
  );
}
export default function Page() {
  return <Content />;
}
const items = [...Array(4)].map((_, i) => i);
function Content() {
  const [page, setPage] = React.useState(1);
  const currentItems = items.slice((page - 1) * 10, page * 10);
  return (
    <View className="h-full w-full bg-background">
      <ScrollView>
        <View className="p-6">
          {/*           <Accordion>
            <AccordionItem variant="card" value="item1">
              <AccordionTrigger>
                <AccordionHeader>
                  <AccordionIcon>
                    <Star />
                  </AccordionIcon>
                  <AccordionTriggerTitle>
                    Accordion Trigger 1
                  </AccordionTriggerTitle>
                  <Badge variant="green" size="small">
                    <BadgeText>New</BadgeText>
                  </Badge>
                </AccordionHeader>
                <AccordionDescription>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Necessitatibus iste minus hic adipisci enim rerum error magni,
                  soluta accusantium modi pariatur atque nobis perferendis ipsa
                  possimus quisquam ullam sint repudiandae!
                </AccordionDescription>
              </AccordionTrigger>
              <AccordionContent>
                <AccordionContentText>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Mollitia, voluptates at sequi tempora iusto ab? Fuga sed,
                  nesciunt quibusdam amet ipsam recusandae aspernatur! Quo ab
                  distinctio molestiae impedit laudantium sit!
                </AccordionContentText>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item2" variant="card">
              <AccordionTrigger>
                <AccordionHeader>
                  <AccordionIcon>
                    <Star />
                  </AccordionIcon>
                  <AccordionTriggerTitle>
                    Accordion Trigger 2
                  </AccordionTriggerTitle>
                </AccordionHeader>
                <AccordionDescription>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Necessitatibus iste minus hic adipisci enim rerum error magni,
                  soluta accusantium modi pariatur atque nobis perferendis ipsa
                  possimus quisquam ullam sint repudiandae!
                </AccordionDescription>
              </AccordionTrigger>
              <AccordionContent>
                <AccordionContentText>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Mollitia, voluptates at sequi tempora iusto ab? Fuga sed,
                  nesciunt quibusdam amet ipsam recusandae aspernatur! Quo ab
                  distinctio molestiae impedit laudantium sit!
                </AccordionContentText>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item3">
              <AccordionTrigger>
                <AccordionHeader>
                  <AccordionIcon>
                    <Star />
                  </AccordionIcon>
                  <AccordionTriggerTitle>
                    Accordion Trigger 3
                  </AccordionTriggerTitle>
                </AccordionHeader>
                <AccordionDescription>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Necessitatibus iste minus hic adipisci enim rerum error magni,
                  soluta accusantium modi pariatur atque nobis perferendis ipsa
                  possimus quisquam ullam sint repudiandae!
                </AccordionDescription>
              </AccordionTrigger>
              <AccordionContent>
                <AccordionContentText>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Mollitia, voluptates at sequi tempora iusto ab? Fuga sed,
                  nesciunt quibusdam amet ipsam recusandae aspernatur! Quo ab
                  distinctio molestiae impedit laudantium sit!
                </AccordionContentText>
              </AccordionContent>
            </AccordionItem>
          </Accordion> */}
          <View>
            <StaticCreditCheckTable />
            {/*             <Table>
              <TableFlatList
                data={currentItems}
                ListHeaderComponent={() => (
                  <TableHeader>
                    <TableHead fixed className="w-32">
                      <TableHeadText>Header 1</TableHeadText>
                    </TableHead>
                    <TableHead className="min-w-32 flex-1">
                      <TableHeadText>Header 2</TableHeadText>
                    </TableHead>
                    <TableHead className="w-32">
                      <TableHeadText>Header 2</TableHeadText>
                    </TableHead>
                    <TableHead className="w-32">
                      <TableHeadText>Header 2</TableHeadText>
                    </TableHead>
                  </TableHeader>
                )}
                renderItem={(item) => (
                  <TableRow
                    key={item.item}
                    isLastRow={item.index === 9}
                    onPress={() => console.log("press")}
                  >
                    <TableCell
                      fixedKey={item.item} // unqiue key
                      className="flex w-32 flex-col items-start"
                    >
                      <TableCellText>Row {item.item}</TableCellText>
                      <TableCellText variant="label">Cell 6</TableCellText>
                    </TableCell>
                    <TableCell className="flex-1">
                      <TableCellText>Cell</TableCellText>
                    </TableCell>
                    <TableCell className="w-32">
                      <TableCellText>{item.index}</TableCellText>
                    </TableCell>
                    <TableCell className="w-32">
                      <TableCellText>{item.index}</TableCellText>
                    </TableCell>
                  </TableRow>
                )}
              />
            </Table> */}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

/* /* function TanStackTable() {
  const [rowSelection, setRowSelection] = React.useState({});
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const [{ pageIndex, pageSize }, setPagination] =
    React.useState<PaginationState>({
      pageIndex: 0,
      pageSize: 25,
    });

  const dataQuery = useQuery({
    queryKey: [
      "data",
      {
        pageIndex,
        pageSize,
        columnFilters,
        sorting,
      },
    ],
    queryFn: async () => {
      /*
        This fake query tries to mimic the Keyhole.Portal API.
        The API doesn't support filters at the time of
        writing this, so the filter setup might not
        be the same as the API.
      */
//       return fetchInvoices({
//         // Pagination
//         offset: pageIndex * pageSize,
//         limit: pageSize,
//         // Search by title, filters still apply
//         query:
//           (columnFilters.find((f) => f.id === "title")?.value as string) ?? "",
//         // Order by a column, API only supports one at a time
//         orderBy: sorting[0]?.id as keyof Invoice,
//         order: sorting[0]?.desc ? "desc" : "asc",
//         // E.g: Filter by status: ["PAID", "PENDING"]
//         filters: columnFilters
//           .filter((f) => f.id !== "title")
//           .map((f) => ({
//             key: f.id as keyof Invoice,
//             values: f.value as any[],
//           })),
//       });
//     },
//     placeholderData: keepPreviousData,
//     staleTime: 60 * 1000 * 5, // 5 minutes
//   });

//   const defaultData = React.useMemo(() => [] as Invoice[], []);
//   const pagination = React.useMemo(
//     () => ({
//       pageIndex,
//       pageSize,
//     }),
//     [pageIndex, pageSize]
//   );

//   const totalPages = dataQuery.data?.count
//     ? Math.ceil(dataQuery.data.total / dataQuery.data.limit)
//     : -1;

//   const table = useReactTable({
//     data: dataQuery.data?.items ?? defaultData,
//     columns,
//     pageCount: totalPages,
//     getRowId: (row) => row.id,
//     state: {
//       sorting,
//       rowSelection,
//       columnFilters,
//       pagination,
//     },
//     enableRowSelection: true,
//     onRowSelectionChange: setRowSelection,
//     onSortingChange: setSorting,
//     onColumnFiltersChange: setColumnFilters,
//     onPaginationChange: setPagination,
//     getCoreRowModel: getCoreRowModel(),
//     manualPagination: true, // server-side
//     manualSorting: true, // server-side
//     manualFiltering: true, // server-side
//   });

//   const tableRows = table.getRowModel().rows;

//   return (
//     <View>
//       <TableContainer>
//         <TableActionsBar>
//           <TableCellText variant="label">
//             Actions - TODO: Make Actions (filters and stuff)
//           </TableCellText>
//         </TableActionsBar>

//         <AccordionTable>
//           <TableFlatList<(typeof tableRows)[number]>
//             className="max-h-[500px]"
//             // we need an array of the page size, initially to render the skeleton
//             data={dataQuery.isFetching ? [...Array(pageSize)] : tableRows}
//             // id is not available in the skeleton, so we use index
//             keyExtractor={(item, index) => String(item?.id || index)}
//             ListHeaderComponent={() =>
//               table.getHeaderGroups().map((headerGroup) => (
//                 <TableHeader key={headerGroup.id} elevated>
//                   {headerGroup.headers.map((header) => (
//                     <React.Fragment key={header.id}>
//                       {flexRender(
//                         header.column.columnDef.header,
//                         header.getContext()
//                       )}
//                     </React.Fragment>
//                   ))}
//                 </TableHeader>
//               ))
//             }
//             // we render the skeleton row if fetching, otherwise the actual row
//             renderItem={({ item }) =>
//               dataQuery.isFetching ? (
//                 <TanStackTableSkeletonRow />
//               ) : (
//                 <TanStackTableRow row={item} />
//               )
//             }
//             // will be rendered when there is no results found
//             ListEmptyComponent={() => (
//               <TableRow>
//                 <TableCell className="w-full items-center justify-center">
//                   <TableCellText>No results found.</TableCellText>
//                 </TableCell>
//               </TableRow>
//             )}
//           />
//         </AccordionTable>
//       </TableContainer>

//       <TableFooter>
//         <TablePagination
//           className={cn(totalPages === -1 && "opacity-0")}
//           currentPage={pageIndex + 1}
//           totalPages={totalPages}
//           onPageChange={(p) => setPagination({ pageIndex: p - 1, pageSize })}
//           previousText="Previous"
//           nextText="Next"
//         />
//         {/* Import from @usekeyhole/web */}
//         {/* <TablePageSizeSelector
//           className={cn(totalPages === -1 && 'opacity-0')}
//           rowsPerPageText="Rows per page:"
//           value={pageSize}
//           onChange={(pageSize) => setPagination({ pageIndex, pageSize })}
//         /> */}
//       </TableFooter>
//     </View>
//   );
// }

/* function TanStackTableRow({ row }: { row: Row<Invoice> }) {
  const status =
    row.original.amount < 0
      ? "error"
      : row.original.amount > 5000
        ? "waiting"
        : undefined;

  const RowContent = row
    .getVisibleCells()
    .map((cell) => (
      <React.Fragment key={cell.id}>
        {flexRender(cell.column.columnDef.cell, cell.getContext())}
      </React.Fragment>
    ));

  if (status != "error") {
    return <TableRow status={status}>{RowContent}</TableRow>;
  }

  return (
    <AccordionTableRow value={row.id} status={status}>
      <AccordionTableRowContent>{RowContent}</AccordionTableRowContent>

      <AccordionContent>
        <View className="m-4 rounded-lg border border-red-700 bg-red-50 px-4 py-3">
          <TableHeadText>Wow! More content</TableHeadText>
          <TableCellText variant="label">
            This might be important...
          </TableCellText>
        </View>
      </AccordionContent>
    </AccordionTableRow>
  );
} */

/* function TanStackTableSkeletonRow() {
  return (
    <TableRow>
      <TableCell>
        <Skeleton
          style={{
            width: 80,
            height: 4,
          }}
        />
      </TableCell>
      <TableCell>
        <Skeleton
          style={{
            width: 180,
            height: 4,
          }}
        />
      </TableCell>
      <TableCell className="ml-auto">
        <Skeleton
          style={{
            width: 160,
            height: 4,
          }}
        />
      </TableCell>
      <TableCell className="w-7" />
    </TableRow>
  );
} */

/* const columns: ColumnDef<Invoice>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <TableHead column={column} className="w-28">
        <TableHeadText>Invoice</TableHeadText>
      </TableHead>
    ),
    cell: ({ row }) => (
      <TableCell className="w-28">
        <TableCellText>{row.getValue("id")}</TableCellText>
      </TableCell>
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <TableHead column={column} className="min-w-96 flex-1">
        <TableHeadText>Title</TableHeadText>
      </TableHead>
    ),
    cell: ({ row }) => (
      <TableCell className="min-w-96 flex-1">
        <TableCellText>{row.getValue("title")}</TableCellText>
      </TableCell>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <TableHead column={column} className="w-40 justify-end">
        <TableHeadText className="text-right">Amount</TableHeadText>
      </TableHead>
    ),
    cell: ({ row }) => (
      <TableCell className="w-40 justify-end">
        <TableCellText className="text-right">
          {Number(row.getValue("amount")).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </TableCellText>
      </TableCell>
    ),
  },
  {
    id: "toggle",
    header: () => <TableHead className="w-[60px]" />,
    cell: ({ row }) => {
      const status =
        row.original.amount < 0
          ? "error"
          : row.original.amount > 5000
            ? "waiting"
            : undefined;

      return (
        <TableCell className="w-[60px] justify-center">
          {status === "error" && <AccordionTableRowToggle />}
        </TableCell>
      );
    },
  },
]; */

/* const STATUS = {
  PAID: "PAID",
  PENDING: "PENDING",
  UNPAID: "UNPAID",
} as const;
type Status = (typeof STATUS)[keyof typeof STATUS];

type Invoice = {
  id: string;
  title: string;
  status: Status;
  amount: number;
};

const fetchInvoices = async ({
  query,
  offset = 0,
  limit = 10,
  orderBy = "id",
  order = "asc",
  filters,
}: {
  query?: string;
  offset?: number;
  limit?: number;
  orderBy?: keyof Invoice;
  order?: "asc" | "desc";
  filters?: {
    key: keyof Invoice;
    values: any[];
  }[];
}) => {
  await new Promise((r) => setTimeout(r, 1200));

  const filteredData = data.filter((item) => {
    let pass = true;

    if (filters) {
      for (const filter of filters) {
        if (!filter.values.includes(item[filter.key])) {
          pass = false;
          break;
        }
      }
    }

    if (query) {
      const titleLower = item.title.toLowerCase();
      const queryLower = query.toLowerCase();
      if (!titleLower.includes(queryLower)) {
        pass = false;
      }
    }

    return pass;
  });

  const sortedData = filteredData.sort((a, b) => {
    if (order === "asc") {
      if (a[orderBy] < b[orderBy]) return -1;
      if (a[orderBy] > b[orderBy]) return 1;
      return 0;
    } else {
      if (a[orderBy] > b[orderBy]) return -1;
      if (a[orderBy] < b[orderBy]) return 1;
      return 0;
    }
  });

  const results = sortedData;

  const items = results.slice(offset, offset + limit);

  return {
    offset: offset,
    limit: limit,
    count: items.length,
    total: results.length,
    search: query,
    orderBy: orderBy,
    order: order,
    items,
  };
}; */

/* const data = [
  { id: "INV001", title: "Lorem Ipsum", status: STATUS.PAID, amount: 6000 },
  { id: "INV002", title: "Ipsum Dolor", status: STATUS.PENDING, amount: 300 },
  {
    id: "INV003",
    title: "Adipiscing Elit",
    status: STATUS.UNPAID,
    amount: 400,
  },
  {
    id: "INV004",
    title: "Tempor Incididunt",
    status: STATUS.PAID,
    amount: -800,
  },
  {
    id: "INV005",
    title: "Labore Et Dolore",
    status: STATUS.PENDING,
    amount: -1000,
  },
  { id: "INV006", title: "Magna Aliqua", status: STATUS.UNPAID, amount: 2500 },
  { id: "INV007", title: "Voluptate Velit", status: STATUS.PAID, amount: 3000 },
  {
    id: "INV008",
    title: "Quia Non Numquam",
    status: STATUS.PENDING,
    amount: 4500,
  },
  {
    id: "INV009",
    title: "Ullam Corporis",
    status: STATUS.UNPAID,
    amount: 8000,
  },
  {
    id: "INV010",
    title: "Reprehenderit Qui",
    status: STATUS.PAID,
    amount: 15000,
  },
  { id: "INV011", title: "Dolorem Eum", status: STATUS.PENDING, amount: 6500 },
  {
    id: "INV012",
    title: "Accusamus Et Iusto",
    status: STATUS.UNPAID,
    amount: -3500,
  },
  {
    id: "INV013",
    title: "Deserunt Mollitia",
    status: STATUS.PAID,
    amount: -2500,
  },
  {
    id: "INV014",
    title: "Rerum Facilis",
    status: STATUS.PENDING,
    amount: 12000,
  },
  {
    id: "INV015",
    title: "Libero Tempore",
    status: STATUS.UNPAID,
    amount: 5000,
  },
  { id: "INV016", title: "Aut Officiis", status: STATUS.PAID, amount: 8500 },
  { id: "INV017", title: "Rerum Hic", status: STATUS.PENDING, amount: 12500 },
  {
    id: "INV018",
    title: "Magnam Aliquam",
    status: STATUS.UNPAID,
    amount: -9000,
  },
  { id: "INV019", title: "Minima Veniam", status: STATUS.PAID, amount: 7500 },
  {
    id: "INV020",
    title: "Laboriosam Nisi",
    status: STATUS.PENDING,
    amount: 100,
  },
  {
    id: "INV021",
    title: "Voluptate Velit",
    status: STATUS.UNPAID,
    amount: 4950,
  },
  { id: "INV022", title: "Dolorem Eum", status: STATUS.PAID, amount: 2500 },
  {
    id: "INV023",
    title: "Vel Illum Qui",
    status: STATUS.PENDING,
    amount: 5000,
  },
  { id: "INV024", title: "Distinctio Et", status: STATUS.UNPAID, amount: 7500 },
  {
    id: "INV025",
    title: "Temporibus Autem",
    status: STATUS.PAID,
    amount: -3500,
  },
  {
    id: "INV026",
    title: "Aut Rerum Necessitatibus",
    status: STATUS.PENDING,
    amount: 750,
  },
  { id: "INV027", title: "Ea Voluptate", status: STATUS.UNPAID, amount: 6500 },
  { id: "INV028", title: "Qui Blanditiis", status: STATUS.PAID, amount: 4000 },
  {
    id: "INV029",
    title: "Et Harum Quidem",
    status: STATUS.PENDING,
    amount: 250,
  },
  {
    id: "INV030",
    title: "Laborum Et Dolorum",
    status: STATUS.UNPAID,
    amount: 400,
  },
  { id: "INV031", title: "Lorem Ipsum", status: STATUS.PAID, amount: 6000 },
  { id: "INV032", title: "Ipsum Dolor", status: STATUS.PENDING, amount: 300 },
  {
    id: "INV033",
    title: "Adipiscing Elit",
    status: STATUS.UNPAID,
    amount: 400,
  },
  {
    id: "INV034",
    title: "Tempor Incididunt",
    status: STATUS.PAID,
    amount: -800,
  },
  {
    id: "INV035",
    title: "Labore Et Dolore",
    status: STATUS.PENDING,
    amount: -1000,
  },
  { id: "INV036", title: "Magna Aliqua", status: STATUS.UNPAID, amount: 2500 },
  { id: "INV037", title: "Voluptate Velit", status: STATUS.PAID, amount: 3000 },
  {
    id: "INV038",
    title: "Quia Non Numquam",
    status: STATUS.PENDING,
    amount: 4500,
  },
  {
    id: "INV039",
    title: "Ullam Corporis",
    status: STATUS.UNPAID,
    amount: 8000,
  },
  {
    id: "INV040",
    title: "Reprehenderit Qui",
    status: STATUS.PAID,
    amount: 15000,
  },
  { id: "INV041", title: "Dolorem Eum", status: STATUS.PENDING, amount: 6500 },
  {
    id: "INV042",
    title: "Accusamus Et Iusto",
    status: STATUS.UNPAID,
    amount: -3500,
  },
  {
    id: "INV043",
    title: "Deserunt Mollitia",
    status: STATUS.PAID,
    amount: -2500,
  },
  {
    id: "INV044",
    title: "Rerum Facilis",
    status: STATUS.PENDING,
    amount: 12000,
  },
  {
    id: "INV045",
    title: "Libero Tempore",
    status: STATUS.UNPAID,
    amount: 5000,
  },
  { id: "INV046", title: "Aut Officiis", status: STATUS.PAID, amount: 8500 },
  { id: "INV047", title: "Rerum Hic", status: STATUS.PENDING, amount: 12500 },
  {
    id: "INV048",
    title: "Magnam Aliquam",
    status: STATUS.UNPAID,
    amount: -9000,
  },
  { id: "INV049", title: "Minima Veniam", status: STATUS.PAID, amount: 7500 },
  {
    id: "INV050",
    title: "Laboriosam Nisi",
    status: STATUS.PENDING,
    amount: 100,
  },
  {
    id: "INV051",
    title: "Voluptate Velit",
    status: STATUS.UNPAID,
    amount: 4950,
  },
  { id: "INV052", title: "Dolorem Eum", status: STATUS.PAID, amount: 2500 },
  {
    id: "INV053",
    title: "Vel Illum Qui",
    status: STATUS.PENDING,
    amount: 5000,
  },
  { id: "INV054", title: "Distinctio Et", status: STATUS.UNPAID, amount: 7500 },
  {
    id: "INV055",
    title: "Temporibus Autem",
    status: STATUS.PAID,
    amount: -3500,
  },
  {
    id: "INV056",
    title: "Aut Rerum Necessitatibus",
    status: STATUS.PENDING,
    amount: 750,
  },
  { id: "INV057", title: "Ea Voluptate", status: STATUS.UNPAID, amount: 6500 },
  { id: "INV058", title: "Qui Blanditiis", status: STATUS.PAID, amount: 4000 },
  {
    id: "INV059",
    title: "Et Harum Quidem",
    status: STATUS.PENDING,
    amount: 250,
  },
  {
    id: "INV060",
    title: "Laborum Et Dolorum",
    status: STATUS.UNPAID,
    amount: 400,
  },
  { id: "INV061", title: "Lorem Ipsum", status: STATUS.PAID, amount: 6000 },
  { id: "INV062", title: "Ipsum Dolor", status: STATUS.PENDING, amount: 300 },
  {
    id: "INV063",
    title: "Adipiscing Elit",
    status: STATUS.UNPAID,
    amount: 400,
  },
  {
    id: "INV064",
    title: "Tempor Incididunt",
    status: STATUS.PAID,
    amount: -800,
  },
  {
    id: "INV065",
    title: "Labore Et Dolore",
    status: STATUS.PENDING,
    amount: -1000,
  },
  { id: "INV066", title: "Magna Aliqua", status: STATUS.UNPAID, amount: 2500 },
  { id: "INV067", title: "Voluptate Velit", status: STATUS.PAID, amount: 3000 },
  {
    id: "INV068",
    title: "Quia Non Numquam",
    status: STATUS.PENDING,
    amount: 4500,
  },
  {
    id: "INV069",
    title: "Ullam Corporis",
    status: STATUS.UNPAID,
    amount: 8000,
  },
  {
    id: "INV070",
    title: "Reprehenderit Qui",
    status: STATUS.PAID,
    amount: 15000,
  },
  { id: "INV071", title: "Dolorem Eum", status: STATUS.PENDING, amount: 6500 },
  {
    id: "INV072",
    title: "Accusamus Et Iusto",
    status: STATUS.UNPAID,
    amount: -3500,
  },
  {
    id: "INV073",
    title: "Deserunt Mollitia",
    status: STATUS.PAID,
    amount: -2500,
  },
  {
    id: "INV074",
    title: "Rerum Facilis",
    status: STATUS.PENDING,
    amount: 12000,
  },
  {
    id: "INV075",
    title: "Libero Tempore",
    status: STATUS.UNPAID,
    amount: 5000,
  },
  { id: "INV076", title: "Aut Officiis", status: STATUS.PAID, amount: 8500 },
  { id: "INV077", title: "Rerum Hic", status: STATUS.PENDING, amount: 12500 },
  {
    id: "INV078",
    title: "Magnam Aliquam",
    status: STATUS.UNPAID,
    amount: -9000,
  },
  { id: "INV079", title: "Minima Veniam", status: STATUS.PAID, amount: 7500 },
  {
    id: "INV080",
    title: "Laboriosam Nisi",
    status: STATUS.PENDING,
    amount: 100,
  },
  {
    id: "INV081",
    title: "Voluptate Velit",
    status: STATUS.UNPAID,
    amount: 4950,
  },
  { id: "INV082", title: "Dolorem Eum", status: STATUS.PAID, amount: 2500 },
  {
    id: "INV083",
    title: "Vel Illum Qui",
    status: STATUS.PENDING,
    amount: 5000,
  },
  { id: "INV084", title: "Distinctio Et", status: STATUS.UNPAID, amount: 7500 },
  {
    id: "INV085",
    title: "Temporibus Autem",
    status: STATUS.PAID,
    amount: -3500,
  },
  {
    id: "INV086",
    title: "Aut Rerum Necessitatibus",
    status: STATUS.PENDING,
    amount: 750,
  },
  { id: "INV087", title: "Ea Voluptate", status: STATUS.UNPAID, amount: 6500 },
  { id: "INV088", title: "Qui Blanditiis", status: STATUS.PAID, amount: 4000 },
  {
    id: "INV089",
    title: "Et Harum Quidem",
    status: STATUS.PENDING,
    amount: 250,
  },
  {
    id: "INV090",
    title: "Laborum Et Dolorum",
    status: STATUS.UNPAID,
    amount: 400,
  },
];  */
