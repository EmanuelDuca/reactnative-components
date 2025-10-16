/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import {
  FileContent,
  Table,
  TableActionsBar,
  TableCell,
  TableCellText,
  TableContainer,
  TableFlatList,
  TableHead,
  TableHeader,
  TableHeadText,
  TableRow,
  TableRowProps,
  TableSkeleton,
  FileDescription,
  FileIcon,
  FileKey2,
  FileLabel,
  ProgressBar,
  toast,
  Upload,
  Button,
  ButtonText,
  AccordionContext,
  Text,
  AccordionContent,
  AccordionTrigger,
} from "@usekeyhole/nativewind";
import { File } from "@usekeyhole/web";
import {
  ColumnDef,
  ColumnFiltersState,
  Row,
  SortingState,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { PRODUCT_NAMES, ProductState } from "~/api/products";
import moment from "moment";
import { View, ViewProps } from "react-native";
import {
  PRODUCTS_QUERY_KEYS,
  ProductsAndProductsOnboardingsStateResponse,
  useProductMutation,
  useProductsOnboardingStepsQuery,
} from "~/hooks/api/products";
import {
  Badge,
  Heading,
  BadgeText,
  ShieldCheck,
  Vault,
} from "@usekeyhole/nativewind";
import { cn, IFile } from "@usekeyhole/utils";
import { TenantOnboardingProgressTable } from "./tenants-progress-table";
import { useLocalizationContext } from "../contexts/LocalizationContext";
import { router } from "expo-router";
import { uploadFileWithProgress } from "~/api/files";
import { Easing, useSharedValue, withTiming } from "react-native-reanimated";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  calculateAverageCompletionPercentage,
  getProductNameFromType,
} from "~/utils/helpers";
import { get } from "lodash";
import {
  AccordionTable,
  AccordionTableRow,
  AccordionTableRowContent,
  AccordionTableRowProps,
  AccordionTableRowToggle,
} from "@usekeyhole/nativewind";

export type ProductOnboardingsTableProps = ViewProps & {
  defaultFilters?: ColumnFiltersState;
  title?: string;
};

export function ProductOnboardingsTable({
  defaultFilters,
  title,
  className,
  ...props
}: ProductOnboardingsTableProps) {
  const { t } = useLocalizationContext();
  const pageSize = 10;
  const [sorting, setSorting] = React.useState<SortingState>([
    {
      id: "createDate",
      desc: true,
    },
  ]);

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    defaultFilters || [
      {
        id: "state",
        value: [
          "Onboarding",
          "AwaitingRentalContract",
          "AwaitingFinancialReview",
          "AwaitingTenantTransfer",
          "AwaitingGuarantee",
        ],
      },
    ]
  );

  const productsQuery = useProductsOnboardingStepsQuery({
    pageSize,
    orderBy: sorting[0]?.id,
    order: sorting[0]?.desc ? "desc" : "asc",
    states: getFilter(columnFilters, "state"),
  });

  const defaultData = React.useMemo(() => [], []);

  const table = useReactTable({
    columns,
    data: productsQuery.data?.results || defaultData,
    state: {
      sorting,
      columnFilters,
    },
    manualPagination: true,
    manualSorting: true,
    onSortingChange: setSorting,
    manualFiltering: true,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
  });

  const isFetching = productsQuery.isFetching;
  const tableRows = table.getRowModel().rows;

  const noResultsLabel = t("guarantee_empty_title");

  return (
    <View className={cn("flex flex-col gap-6", className)} {...props}>
      <Heading size={"3xl"}>
        {title || `${t("label_tenants")} ${t("label_onboarding")}`}
      </Heading>

      <TableContainer>
        <Table>
          <AccordionTable multiple={false}>
            <TableFlatList<(typeof tableRows)[number]>
              data={isFetching ? Array(pageSize) : tableRows}
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
              renderItem={({ item, index }) =>
                isFetching ? (
                  <ProductOnboardingsTableSkeletonRow />
                ) : (
                  <ProductTableRow
                    isLastRow={index === pageSize - 1}
                    value={item.id}
                    row={item}
                  />
                )
              }
              ListEmptyComponent={() => (
                <TableRow isLastRow>
                  <TableCell className="flex-1 justify-center">
                    <TableCellText className="text-center">
                      {noResultsLabel}
                    </TableCellText>
                  </TableCell>
                </TableRow>
              )}
            />
          </AccordionTable>
        </Table>
        <TableActionsBar className="justify-center">
          <Button
            variant={"link"}
            onPress={() => {
              router.push({
                pathname: `/leases`,
                params: {
                  state: getFilter(columnFilters, "state").join(","),
                },
              });
            }}
          >
            <ButtonText>
              {`${t("label_view_all")} ${t("label_leases").toLocaleLowerCase()}`}
            </ButtonText>
          </Button>
        </TableActionsBar>
      </TableContainer>
    </View>
  );
}

function ProductTableRow({
  row,
  ...props
}: AccordionTableRowProps & {
  row: Row<ProductsAndProductsOnboardingsStateResponse["results"][number]>;
}) {
  const accordianContext = React.useContext(AccordionContext);
  const RowContent = row
    .getVisibleCells()
    .map((cell) => (
      <React.Fragment key={cell.id}>
        {flexRender(cell.column.columnDef.cell, cell.getContext())}
      </React.Fragment>
    ));
  const isAwaitingRentalContract =
    row.original.state === "AwaitingRentalContract";
  const DISABLE_RENTAL_CONTRACT = true; // TODO: remove this when we have backend support
  const status =
    isAwaitingRentalContract && !DISABLE_RENTAL_CONTRACT ? "error" : undefined;
  return (
    <AccordionTableRow
      //onPress={() => accordianContext.toggle(row.id)} // TODO FIX  tableRowVariants pressable param
      value={props.value}
      status={status}
      className={cn("hover:bg-white dark:hover:bg-accent", props.className)}
    >
      <AccordionTrigger iconClassName="hidden">
        <TableRow
          className={cn("flex flex-col", props.className)}
          status={status}
        >
          <AccordionTableRowContent>{RowContent}</AccordionTableRowContent>
        </TableRow>
      </AccordionTrigger>

      {accordianContext.expanded.includes(row.id) && (
        <AccordionContent className="gap-4 p-4">
          {isAwaitingRentalContract && !DISABLE_RENTAL_CONTRACT && (
            <UploadRentalContract product={row.original} />
          )}
          <TenantOnboardingProgressTable product={row.original} />
        </AccordionContent>
      )}
    </AccordionTableRow>
  );
}

const columns: ColumnDef<
  ProductsAndProductsOnboardingsStateResponse["results"][number]
>[] = [
  {
    accessorKey: "productType",
    enableSorting: true,
    header: ({ column }) => {
      const { t } = useLocalizationContext();
      return (
        <TableHead column={column} className="w-[150px]">
          <TableHeadText>{t("label_type")}</TableHeadText>
        </TableHead>
      );
    },
    cell: ({ row }) => {
      const { t } = useLocalizationContext();

      const type = row.original.productType;
      const productName = getProductNameFromType(type);

      const productDescription =
        (type === "DepositNorwayFixed" && `${t("label_fixed_duration")}`) ||
        (type === "DepositNorwayOpen" && `${t("label_open_ended")}`) ||
        "";

      const icon =
        (productName === "Guarantee" && (
          <ShieldCheck className="stroke-foreground" />
        )) ||
        (productName === "Secure" && <Vault className="stroke-foreground" />) ||
        undefined;

      return (
        <TableCell className="w-[150px] items-center">
          <View className="mr-2 h-6 w-6">{icon}</View>
          <View>
            <TableCellText>{productName}</TableCellText>
            <TableCellText variant="label" className="mt-[-2px]">
              {productDescription}
            </TableCellText>
          </View>
        </TableCell>
      );
    },
  },
  {
    id: "address",
    accessorKey: "address",
    enableSorting: true,
    header: ({ column }) => {
      const { t } = useLocalizationContext();
      return (
        <TableHead column={column} className="min-w-96 flex-1">
          <TableHeadText>{t("label_address")}</TableHeadText>
        </TableHead>
      );
    },
    cell: ({ row, column }) => {
      const { t } = useLocalizationContext();
      return (
        <TableCell className="min-w-96 flex-1">
          <TableCellText className="font-bold">
            {row.getValue(column.id)}
          </TableCellText>
          {row.original.tenants.length > 1 && (
            <Badge className="ml-2" size={"small"} variant={"secondary"}>
              <BadgeText className="text-xs">
                {`${row.original.tenants.length} ${t("label_tenants").toLocaleLowerCase()}`}
              </BadgeText>
            </Badge>
          )}
        </TableCell>
      );
    },
  },
  // {
  //   id: 'progress',
  //   accessorKey: 'progress',
  //   enableSorting: false,
  //   header: ({ column }) => {
  //     const { t } = useLocalizationContext();
  //     return (
  //       <TableHead column={column} className="max-w-52 justify-end">
  //         <TableHeadText>{t('label_progress')}</TableHeadText>
  //       </TableHead>
  //     );
  //   },
  //   cell: ({ row }) => {
  //     // const procentage = calculateAverageCompletionPercentage(
  //     //   row.original.tenants.map((tenant) => tenant.onboardingSteps),
  //     // );
  //     // const progress = useSharedValue(procentage / 100);

  //     return (
  //       <TableCell className="max-w-52 flex-1">
  //         <View className="w-full px-2">
  //           {/* <ProgressBar progress={progress} color={'primary'} /> */}
  //         </View>
  //         {/* <Text>{`${procentage}%`}</Text> */}
  //       </TableCell>
  //     );
  //   },
  // },
  {
    id: "createDate",
    accessorKey: "createDate",
    enableSorting: true,
    header: ({ column }) => {
      const { t } = useLocalizationContext();
      return (
        <TableHead column={column} className="max-w-32 justify-end">
          <TableHeadText>{t("label_invited")}</TableHeadText>
        </TableHead>
      );
    },
    cell: ({ row }) => {
      return (
        <TableCell className="max-w-32 flex-1 justify-end">
          <TableCellText>
            {moment.utc(row.original.createDate).format("DD.MM.YY")}
          </TableCellText>
        </TableCell>
      );
    },
  },
  {
    id: "toggle-page",
    header: () => <TableHead className="w-[100px]" />,
    cell: ({ row }) => {
      const { t } = useLocalizationContext();
      return (
        <TableCell className="w-[100px] justify-center">
          <Button
            variant="link"
            onPress={() => {
              router.push(
                `/properties/${row.original.complexId}/rental/${row.original.rentalId}/${row.original.id}`
              );
            }}
          >
            <ButtonText>
              {t("label_view")} {t("label_lease").toLocaleLowerCase()}
            </ButtonText>
          </Button>
        </TableCell>
      );
    },
  },
  {
    id: "toggle-accordion",
    header: () => <TableHead className="w-[60px]" />,
    cell: () => {
      return (
        <TableCell className="w-[60px] justify-center">
          <AccordionTableRowToggle />
        </TableCell>
      );
    },
  },
];

const getFilter = (columnFilters: ColumnFiltersState, filterId: string) => {
  const filters = columnFilters.filter((filter) => filter.id === filterId)[0]
    ?.value as ProductState[];
  return filters;
};

const ProductOnboardingsTableSkeletonRow = React.memo(
  (props: TableRowProps) => {
    return (
      <TableRow {...props}>
        {/* type */}
        <TableCell className="w-[150px]">
          <TableSkeleton
            style={{
              width: `${Math.floor(Math.random() * 30) + 70}%`,
            }}
          />
        </TableCell>
        {/* address  */}
        <TableCell className="min-w-[300px] flex-1">
          <TableSkeleton
            style={{
              width: `${Math.floor(Math.random() * 30) + 70}%`,
            }}
          />
        </TableCell>
        {/* <TableCell className="flex-1 justify-end">
          <TableSkeleton
            style={{
              justifyContent: 'flex-end',
              width: 200,
            }}
            />
        </TableCell> */}
        {/* invited */}
        <TableCell>
          <TableSkeleton
            style={{
              width: 80,
            }}
          />
        </TableCell>
        <TableCell>
          <TableSkeleton
            style={{
              width: 50,
            }}
          />
        </TableCell>
        <TableCell className="min-w-9 justify-end">
          <TableSkeleton
            style={{
              width: 30,
            }}
          />
        </TableCell>
      </TableRow>
    );
  }
);

ProductOnboardingsTableSkeletonRow.displayName =
  "ProductOnboardingsTableSkeletonRow";

export const UploadRentalContract = ({
  product,
}: {
  product: ProductsAndProductsOnboardingsStateResponse["results"][number];
}) => {
  const queryClient = useQueryClient();
  const { t, getErrorV2 } = useLocalizationContext();

  const uploadDocumentPlaceholder = {
    title: `${t("label_upload")} ${t("label_rental_agreement").toLocaleLowerCase()}`,
    uploading: `${t("label_uploading_document")}... `,
    description: t("label_drag_and_drop_here"),
  };

  const [isRentalContractUploading, setRentalContractUploading] =
    React.useState(false);
  const progress = useSharedValue(0);
  const animateProgress = (to: number) => {
    progress.value = withTiming(to, {
      duration: 300,
      easing: Easing.out(Easing.ease),
    });
  };
  const { mutateAsync: productPatchMutation } = useProductMutation(
    product?.productType
  );

  const { mutateAsync: rentalContractUpload, status: mutationStatus } =
    useMutation({
      mutationFn: async (files: any) => {
        const formData = new FormData();
        files.forEach((file: any, i: number) => {
          formData.append("file" + i, file.webFile, file.name);
        });
        switch (product?.productType) {
          case "KeyholeSecure": {
            return await uploadFileWithProgress(
              `${process.env.EXPO_PUBLIC_API_URL}/portal/files/rental-contract`,
              formData,
              animateProgress
            );
          }
          default:
            formData.append("tenantGroupId", product.id);
            return await uploadFileWithProgress(
              `${process.env.EXPO_PUBLIC_API_URL}/public/files/upload-rental-contract`,
              formData,
              animateProgress
            );
        }
      },
      onMutate: () => setRentalContractUploading(true),
      onSuccess: async (data: { contractFileId: string }) => {
        if (product && "productType" in product) {
          await productPatchMutation({
            rentalContractId: data.contractFileId,
            id: product.id,
          });
        }

        return await queryClient.invalidateQueries({
          queryKey: PRODUCTS_QUERY_KEYS.all,
        });
      },
      onSettled: () => {
        setRentalContractUploading(false);
        progress.value = 0;
      },
      onError: (error) => {
        toast.add({
          type: "error",
          title: t("label_an_error_happend"),
          description: getErrorV2(error),
        });
      },
    });

  const onFilesAdded = React.useCallback(
    async (files: IFile<undefined>[]) => {
      await rentalContractUpload(files);
    },
    [rentalContractUpload]
  );

  const variant = React.useMemo(() => {
    if (mutationStatus === "error") {
      return "failed";
    }

    if (isRentalContractUploading || mutationStatus === "pending") {
      return "uploading";
    }

    return "destructive";
  }, [mutationStatus, isRentalContractUploading]);

  return (
    <File
      noDragEventsBubbling={true}
      variant={variant}
      noClickEventsBubbling={true}
      onFilesAdded={onFilesAdded}
      className="hover:bg-white"
    >
      <FileIcon>{<FileKey2 />}</FileIcon>
      <FileContent>
        <FileLabel className={variant === "failed" ? "text-destructive" : ""}>
          {variant === "uploading"
            ? uploadDocumentPlaceholder.uploading
            : uploadDocumentPlaceholder.title}
        </FileLabel>
        {variant === "uploading" ? (
          <View className="h-5 flex-row items-end">
            <FileDescription className="mr-4">0%</FileDescription>
            <View className="flex-1 self-center">
              <ProgressBar progress={progress} color={"success"} />
            </View>
            <FileDescription className="ml-4">100%</FileDescription>
          </View>
        ) : (
          <FileDescription>
            {uploadDocumentPlaceholder.description}
          </FileDescription>
        )}
      </FileContent>
      <FileIcon>
        <Upload />
      </FileIcon>
    </File>
  );
};
