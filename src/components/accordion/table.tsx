import {
  AccordionItem,
  AccordionItemContext,
  AccordionItemProps,
  Accordion,
  AccordionContext,
  AccordionProps,
  AccordionTrigger,
} from "./accordion";
import { cn } from "@usekeyhole/utils";
import { Column } from "@tanstack/react-table";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import {
  FlatList,
  FlatListProps,
  Pressable,
  PressableProps,
  ScrollView,
  ScrollViewProps,
  View,
  ViewProps,
} from "react-native";
import {
  ChevronsUpDown,
  ChevronUp,
  Button,
  ButtonIcon,
  Text,
  TextProps,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationNext,
  PaginationNumber,
  PaginationPrevious,
  PaginationProps,
} from "@usekeyhole/nativewind";
import { cssInterop } from "nativewind";
import { Skeleton, SkeletonProps } from "@usekeyhole/ui";

// Used for creating a wrapper around tables (giving space around it) and for stacking actions on top in same container
export const TableContainer = React.forwardRef<View, ViewProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <View
        ref={ref}
        className={cn(
          "border-border-soft 0 flex w-full flex-1 flex-col gap-y-1 rounded-sm border bg-gray-50 p-1 dark:bg-gray-800",
          className
        )}
        {...props}
      >
        {children}
      </View>
    );
  }
);

// type RemoteScrollRef = {
//   remoteScrollTo: (offset: number) => void;
// };

export type TableContext = {
  elevated: boolean;
  // showFixedColumns: boolean;

  // bodyHeight: number;
  // setBodyHeight: React.Dispatch<React.SetStateAction<number>>;

  // bodyTotalHeight: number;
  // setBodyTotalHeight: React.Dispatch<React.SetStateAction<number>>;

  // fixedHead: React.ReactNode;
  // setFixedHead: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  // fixedCells: React.ReactNode[];
  // setFixedCells: React.Dispatch<React.SetStateAction<React.ReactNode[]>>;

  // fixedScrollRef: React.RefObject<RemoteScrollRef>;
  // bodyScrollRef?: React.RefObject<RemoteScrollRef>;
};

// Table Root
const TableContext = React.createContext<TableContext>({} as TableContext);

cssInterop(ScrollView, {
  className: {
    target: "style",
  },
  contentContainerClassName: {
    target: "contentContainerStyle",
  },
});

cssInterop(FlatList, {
  className: {
    target: "style",
  },
  contentContainerClassName: {
    target: "contentContainerStyle",
  },
  ListHeaderComponentClassName: {
    target: "ListHeaderComponentStyle",
  },
});

export type TableProps = ScrollViewProps & {
  elevated?: boolean;
  // showFixedColumns?: boolean;
  // showVerticalScrollIndicator?: boolean;
};

export const Table = React.forwardRef<ScrollView, TableProps>(
  (
    {
      children,
      className,
      contentContainerClassName,
      elevated,
      // showFixedColumns,
      // showVerticalScrollIndicator,
      ...props
    },
    ref
  ) => {
    // const fixedScrollRef = React.useRef<RemoteScrollRef>(null);
    // const bodyScrollRef = React.useRef<RemoteScrollRef>(null);

    // const [fixedCells, setFixedCells] = React.useState<React.ReactNode[]>([]);
    // const [fixedHead, setFixedHead] = React.useState<React.ReactNode>(null);
    // const [bodyHeight, setBodyHeight] = React.useState(0);
    // const [bodyTotalHeight, setBodyTotalHeight] = React.useState(0);
    // const [isTableHScrolled, setIsTableHScrolled] = React.useState(false);

    return (
      <TableContext.Provider
        value={{
          elevated: !!elevated,
          // showFixedColumns: !!showFixedColumns,

          // bodyHeight,
          // setBodyHeight,
          // bodyTotalHeight,
          // setBodyTotalHeight,

          // fixedHead,
          // setFixedHead,
          // fixedCells,
          // setFixedCells,

          // fixedScrollRef,
          // bodyScrollRef,
        }}
      >
        <View className="relative flex flex-row">
          <ScrollView
            ref={ref}
            horizontal
            className={cn(
              "rounded-sm  bg-gray-50 dark:bg-gray-800",
              !elevated && "border-border-soft border",
              className
            )}
            contentContainerClassName={cn(
              "flex flex-col min-w-full",
              elevated && "gap-y-1",
              contentContainerClassName
            )}
            // scrollEventThrottle={16}
            // onScroll={(e) => {
            //   setIsTableHScrolled(e.nativeEvent.contentOffset.x > 0);
            // }}
            bounces={false}
            {...props}
          >
            {children}
          </ScrollView>

          {/* {showFixedColumns && (
              <FixedCells
                ref={fixedScrollRef}
                fixedCells={fixedCells}
                isTableHScrolled={isTableHScrolled}
              />
            )} */}

          {/* {showVerticalScrollIndicator && bodyHeight < bodyTotalHeight && (
              <View className="bg-background border-border absolute bottom-0 right-0 mb-2 mr-6 flex flex-row items-center justify-center gap-x-2 rounded-lg border px-3 py-2">
                <Text className="text-foreground text-sm">Scroll</Text>
                <ChevronDown className="size-5" />
              </View>
            )} */}
        </View>
      </TableContext.Provider>
    );
  }
);

// type FixedCellsProps = {
//   fixedCells: React.ReactNode[];
//   isTableHScrolled: boolean;
// };

// const FixedCells = React.forwardRef<RemoteScrollRef, FixedCellsProps>(
//   ({ fixedCells, isTableHScrolled }, ref) => {
//     const listRef = React.useRef<FlatList>(null);

//     const ctx = React.useContext(TableContext);

//     const isHidden = fixedCells.length === 0 || !isTableHScrolled;

//     React.useImperativeHandle(
//       ref,
//       () => ({
//         remoteScrollTo: (offset: number) => {
//           listRef.current?.scrollToOffset?.({ offset, animated: false });
//         },
//       }),
//       [],
//     );

//     return (
//       <FlatList
//         ref={listRef}
//         data={fixedCells}
//         ListHeaderComponent={() => (
//           <TableHeader className="border-border min-w-0 rounded-tl-sm border">
//             {ctx.fixedHead}
//           </TableHeader>
//         )}
//         ListHeaderComponentClassName="bg-neutral-50 dark:bg-neutral-800"
//         stickyHeaderIndices={[0]}
//         renderItem={({ item, index }) => (
//           <TableRow
//             className="border-border min-w-0 border-l border-r"
//             isLastRow={index === fixedCells.length - 1}
//           >
//             {item}
//           </TableRow>
//         )}
//         className={cn(
//           'bototm-0 absolute left-0 z-20 transition-opacity duration-500',
//           isHidden ? 'opacity-0' : 'opacity-100',
//         )}
//         style={{
//           maxHeight: ctx.bodyHeight,
//         }}
//         contentContainerStyle={{
//           height: ctx.bodyTotalHeight,
//         }}
//         scrollEnabled={false}
//       />
//     );
//   },
// );

// Table Header
const tableHeaderVariants = cva(
  "border-b-border-soft flex w-full flex-row border-b",
  {
    variants: {
      variant: {
        white: "bg-background",
        grey: " bg-gray-50 dark:bg-gray-800",
      },
      elevated: {
        true: "border-border-soft rounded-sm border",
        false: "rounded-none",
      },
    },
    defaultVariants: {
      variant: "grey",
    },
  }
);

export type TableHeaderProps = ViewProps &
  VariantProps<typeof tableHeaderVariants>;

export const TableHeader = React.forwardRef<View, TableHeaderProps>(
  ({ children, className, variant, elevated, ...props }, ref) => {
    const ctx = React.useContext(TableContext);
    return (
      <View
        ref={ref}
        className={cn(
          tableHeaderVariants({ variant, elevated: elevated ?? ctx.elevated }),
          className
        )}
        {...props}
      >
        {children}
      </View>
    );
  }
);

// Use as `ItemSeparatorComponent` in `FlatList` to add space between rows
export const TableRowsSeparator = React.forwardRef<View, ViewProps>(
  (props, ref) => {
    return <View ref={ref} style={{ height: 4 }} {...props} />;
  }
);

export function TableFlatList<T>({ children, ...props }: FlatListProps<T>) {
  const ctx = React.useContext(TableContext);

  // const listRef = React.useRef<FlatList>(null);

  // const isRemoteScrolling = React.useRef(false);

  // React.useImperativeHandle(
  //   ctx.bodyScrollRef,
  //   () => ({
  //     remoteScrollTo: (offset: number) => {
  //       isRemoteScrolling.current = true;
  //       listRef.current?.scrollToOffset({
  //         offset,
  //         animated: false,
  //       });
  //       isRemoteScrolling.current = false;
  //     },
  //   }),
  //   [],
  // );

  return (
    <FlatList
      // ref={listRef}
      stickyHeaderIndices={[0]}
      // @ts-ignore
      ListHeaderComponentClassName={cn("bg-gray-50 dark:bg-gray-800", {
        "mb-1": ctx.elevated,
      })}
      ItemSeparatorComponent={ctx.elevated ? TableRowsSeparator : undefined}
      // adding a debounce here because when accordions open,
      // the content size will change a lot in a small amount of time
      // which will cause it to be very laggy
      // onContentSizeChange={debounce((_, height) => {
      //   ctx.setBodyTotalHeight(height);
      // }, 1000)}
      // onScroll={(e) => {
      //   const offset = e.nativeEvent.contentOffset.y;
      //   ctx.fixedScrollRef.current?.remoteScrollTo(offset);
      // }}
      // onLayout={(e) => {
      //   ctx.setBodyHeight(e.nativeEvent.layout.height);
      //   ctx.fixedScrollRef.current?.remoteScrollTo(0);
      // }}
      bounces={false}
      {...props}
    />
  );
}

// Table Row
const tableRowVariants = cva("flex min-w-full flex-row", {
  variants: {
    variant: {
      white: "bg-background",
      grey: "bg-accent",
    },
    elevated: {
      true: "border-border-soft relative overflow-hidden rounded-sm border",
      false: "rounded-none",
    },
    pressable: {
      true: "hover:bg-accent",
      false: "",
    },
    isLastRow: {
      true: "border-b-0",
      false: "border-b-border-soft border-b",
    },
  },
  defaultVariants: {
    variant: "white",
    isLastRow: false,
  },
});

export type TableRowProps = PressableProps &
  VariantProps<typeof tableRowVariants> & {
    status?: "error" | "waiting";
    onPress?: () => void;
  };

export const TableRow = React.forwardRef<View, TableRowProps>(
  (
    {
      children,
      className,
      variant,
      isLastRow,
      elevated,
      status,
      disabled,
      ...props
    },
    ref
  ) => {
    const ctx = React.useContext(TableContext);

    return (
      <Pressable
        ref={ref}
        className={cn(
          tableRowVariants({
            variant,
            isLastRow,
            elevated: elevated || ctx.elevated,
            pressable: !!props.onPress,
          }),
          className
        )}
        disabled={disabled || !props.onPress}
        {...props}
      >
        <>
          <TableRowStatusIndicator status={status} />
          {children}
        </>
      </Pressable>
    );
  }
);

// Colored vertical line on the left of a row
const TableRowStatusIndicator: React.FC<{ status?: string }> = ({ status }) => {
  if (!status) return null;
  return (
    <View
      className={cn(
        // borders are added so that the line overlaps the bottom border of the row on non-elevated tables.
        "absolute left-0 top-0 z-10 box-content h-full w-[3px] border-b border-t",
        {
          "bg-destructive/70 border-destructive/70": status === "error",
          "bg-muted border-muted": status === "waiting",
        }
      )}
    />
  );
};

// Table Head
export type TableHeadProps = ViewProps & {
  column?: Column<any, any>;
  fixed?: boolean;
};

export const TableHead = React.forwardRef<View, TableHeadProps>(
  ({ children, className, column, fixed, ...props }, ref) => {
    // const ctx = React.useContext(TableContext);

    // const prevChildrenRef = React.useRef<React.ReactNode>();
    // const prevPropsRef = React.useRef<TableHeadProps>();
    // const contentRef = React.useRef<React.ReactElement | null>(null);

    // const propsToCompare = { className, column, fixed, ...props };

    const sorted = column?.getIsSorted();
    const sortable = column?.getCanSort();

    const SortIcon = React.useMemo(() => {
      if (!sortable) return null;

      const Icon = !sorted ? ChevronsUpDown : ChevronUp;

      return (
        <Icon
          className={cn(
            "stroke-foreground ml-2 size-4 shrink-0 transform transition-transform duration-300",
            {
              "rotate-180": sorted === "desc",
            }
          )}
        />
      );
    }, [sortable, sorted]);

    // if (
    //   !contentRef.current ||
    //   JSON.stringify(prevPropsRef.current) !== JSON.stringify(propsToCompare) ||
    //   hasChildrenChanged(prevChildrenRef.current, children)
    // ) {
    //   contentRef.current = (
    //     <Pressable
    //       ref={ref}
    //       className={cn('flex h-10 flex-row items-center px-4 py-1', className)}
    //       onPress={() => column?.toggleSorting()}
    //       disabled={!column?.getCanSort()}
    //       {...props}
    //     >
    //       {children}
    //       {sortable && SortIcon}
    //     </Pressable>
    //   );
    //   prevPropsRef.current = propsToCompare;
    //   prevChildrenRef.current = children;
    // }

    // React.useEffect(() => {
    //   if (!fixed) return;

    //   ctx.setFixedHead(contentRef.current);

    //   return () => {
    //     ctx.setFixedHead(null);
    //   };
    // }, [fixed, contentRef.current]);

    return (
      <Pressable
        ref={ref}
        className={cn("flex h-10 flex-row items-center px-4 py-1", className)}
        onPress={() => column?.toggleSorting()}
        disabled={!column?.getCanSort()}
        {...props}
      >
        {children}
        {sortable && SortIcon}
      </Pressable>
    );
  }
);

// Table Cell
export type TableCellProps = ViewProps & {
  fixedKey?: string | number; // key to identify fixed cells, e.g. row.id
};

// function shallowEqual(obj1: any, obj2: any): boolean {
//   if (obj1 === obj2) return true;
//   if (
//     typeof obj1 !== 'object' ||
//     obj1 === null ||
//     typeof obj2 !== 'object' ||
//     obj2 === null
//   ) {
//     return false;
//   }
//   const keys1 = Object.keys(obj1);
//   const keys2 = Object.keys(obj2);
//   if (keys1.length !== keys2.length) return false;
//   for (let key of keys1) {
//     if (!obj2.hasOwnProperty(key) || obj1[key] !== obj2[key]) {
//       return false;
//     }
//   }
//   return true;
// }

// function hasChildrenChanged(
//   prevChildren: React.ReactNode,
//   nextChildren: React.ReactNode,
// ): boolean {
//   if (prevChildren === nextChildren) return false;

//   const prevChildrenArray = React.Children.toArray(prevChildren);
//   const nextChildrenArray = React.Children.toArray(nextChildren);

//   if (prevChildrenArray.length !== nextChildrenArray.length) return true;

//   return prevChildrenArray.some((prevChild, index) => {
//     const nextChild = nextChildrenArray[index];
//     if (React.isValidElement(prevChild) && React.isValidElement(nextChild)) {
//       return (
//         prevChild.type !== nextChild.type ||
//         prevChild.key !== nextChild.key ||
//         !shallowEqual(prevChild.props, nextChild.props)
//       );
//     }
//     return prevChild !== nextChild;
//   });
// }

export const TableCell = React.forwardRef<View, TableCellProps>(
  ({ children, className, fixedKey, ...props }, ref) => {
    // const ctx = React.useContext(TableContext);

    // const prevChildrenRef = React.useRef<React.ReactNode>();
    // const prevPropsRef = React.useRef<TableCellProps>();
    // const contentRef = React.useRef<React.ReactElement | null>(null);

    // const propsToCompare = { className, fixedKey, ...props };

    // if (
    //   !contentRef.current ||
    //   JSON.stringify(prevPropsRef.current) !== JSON.stringify(propsToCompare) ||
    //   hasChildrenChanged(prevChildrenRef.current, children)
    // ) {
    //   contentRef.current = (
    //     <View
    //       ref={ref}
    //       className={cn('flex h-12 flex-row items-center px-4 py-2', className)}
    //       {...props}
    //     >
    //       {children}
    //     </View>
    //   );
    //   prevPropsRef.current = propsToCompare;
    //   prevChildrenRef.current = children;
    // }

    // React.useEffect(() => {
    //   if (fixedKey == undefined) return;

    //   const cellKey = 'cell-' + fixedKey;

    //   const ContentCopy = React.cloneElement(contentRef.current!, {
    //     key: cellKey,
    //   });

    //   ctx.setFixedCells((prev) => {
    //     const currentIdx = prev.findIndex(
    //       (c) => (c as React.ReactElement)?.key === cellKey,
    //     );

    //     if (currentIdx === -1) {
    //       return [...prev, ContentCopy];
    //     } else {
    //       const copy = [...prev];
    //       copy[currentIdx] = ContentCopy;
    //       return copy;
    //     }
    //   });

    //   return () => {
    //     ctx.setFixedCells((prev) =>
    //       prev.filter((c) => (c as React.ReactElement)?.key !== cellKey),
    //     );
    //   };
    // }, [fixedKey, contentRef.current]);

    return (
      <View
        ref={ref}
        className={cn("flex h-12 flex-row items-center px-4 py-2", className)}
        {...props}
      >
        {children}
      </View>
    );
  }
);

// Table Cell Text
export type TableHeadTextProps = TextProps;

export const TableHeadText = React.forwardRef<
  React.ElementRef<typeof Text>,
  TableHeadTextProps
>(({ children, className, ...props }, ref) => {
  return (
    <Text
      ref={ref}
      className={cn("text-foreground font-semibold", className)}
      {...props}
    >
      {children}
    </Text>
  );
});

const tableCellTextVariants = cva("truncate text-sm", {
  variants: {
    variant: {
      normal: "text-foreground font-normal",
      label: "text-muted-foreground font-normal",
    },
  },
  defaultVariants: {
    variant: "normal",
  },
});

// Table Cell Text
export type TableCellTextProps = TextProps &
  VariantProps<typeof tableCellTextVariants>;

export const TableCellText = React.forwardRef<
  React.ElementRef<typeof Text>,
  TableCellTextProps
>(({ children, className, variant, ...props }, ref) => {
  // Tooltip disabled for now
  // if (disableTooltip) {
  //   return Content;
  // }

  // return (
  //   <TooltipRoot delayDuration={300} skipDelayDuration={100}>
  //     <TooltipTrigger>{Content}</TooltipTrigger>
  //     <TooltipContent>
  //       <Text className={classes} {...props}>
  //         {children}
  //       </Text>
  //     </TooltipContent>
  //   </TooltipRoot>
  // );
  return (
    <Text
      ref={ref}
      className={cn(tableCellTextVariants({ variant }), className)}
      {...props}
    >
      {children}
    </Text>
  );
});

// Table Actions Bar
const tableActionsBarVariants = cva(
  "border-border-soft flex w-full flex-row justify-between rounded-sm border px-4 py-3",
  {
    variants: {
      variant: {
        white: "bg-background",
        grey: "bg-accent",
      },
    },
    defaultVariants: {
      variant: "white",
    },
  }
);

export type TableActionsBarProps = ViewProps &
  VariantProps<typeof tableActionsBarVariants>;

export const TableActionsBar = React.forwardRef<View, TableActionsBarProps>(
  ({ children, className, variant, ...props }, ref) => {
    return (
      <View
        ref={ref}
        className={cn(tableActionsBarVariants({ variant }), className)}
        {...props}
      >
        {children}
      </View>
    );
  }
);

export type TableFooterProps = ViewProps;

export const TableFooter = React.forwardRef<View, TableFooterProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <View
        ref={ref}
        className={cn("mt-6 flex w-full flex-row justify-between", className)}
        {...props}
      >
        {children}
      </View>
    );
  }
);

// Accordion Extension Components
export type AccordionTableProps = Omit<TableProps, "elevated"> &
  AccordionProps & {
    fixedColumn?: never;
  };

export const AccordionTable: React.FC<AccordionTableProps> = ({
  children,
  multiple,
  ...props
}) => {
  return (
    <Accordion multiple={multiple}>
      <Table
        {...props}
        elevated
        // showFixedColumns={false}
      >
        {children}
      </Table>
    </Accordion>
  );
};

export type AccordionTableRowProps = TableRowProps & AccordionItemProps;

export const AccordionTableRow: React.FC<AccordionTableRowProps> = ({
  children,
  value,
  className,
  ...props
}) => {
  return (
    <AccordionItem value={value} className="gap-0 bg-red-600">
      <AccordionTrigger iconClassName="hidden">
        <TableRow className={cn("flex flex-col", className)} {...props}>
          {children}
        </TableRow>
      </AccordionTrigger>
    </AccordionItem>
  );
};

export const AccordionTableRowContent: React.FC<ViewProps> = ({
  children,
  className,
  ...props
}) => {
  const item = React.useContext(AccordionItemContext);

  return (
    <View
      className={cn(
        "flex flex-1 flex-row",
        {
          "border-border-soft border-b": item.isExpanded,
        },
        className
      )}
      {...props}
    >
      {children}
    </View>
  );
};

export const AccordionTableRowToggle: React.FC = () => {
  const accordion = React.useContext(AccordionContext);
  const item = React.useContext(AccordionItemContext);

  return (
    <Button
      // @ts-ignore - idk why this isn't on the type
      tabIndex={-1}
      size="icon-sm"
      onPress={() => {
        accordion.toggle(item.value);
      }}
    >
      <ButtonIcon
        className={cn("transform transition-transform duration-300", {
          "rotate-180": !item.isExpanded,
        })}
      >
        <ChevronUp />
      </ButtonIcon>
    </Button>
  );
};

// Pagination
export type TablePaginationProps = PaginationProps & {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  previousText: string;
  nextText: string;
};

export const TablePagination: React.FC<TablePaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  previousText,
  nextText,
  ...props
}) => {
  const pageNumbers = React.useMemo(() => {
    // If there are 7 or fewer pages, show all pages
    if (totalPages <= 7) {
      return [...Array(totalPages < 0 ? 0 : totalPages)].map((_, i) => i + 1);
    }

    // If current page is in the first 4 pages, show pages 1 to 5 + last page
    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, "...", totalPages];
    }

    // If current page is in the last 4 pages, show first page + last 5 pages
    if (currentPage >= totalPages - 3) {
      return [
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    // Show first page, ellipsis, middle pages, ellipsis, and last page
    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  }, [currentPage, totalPages]);

  return (
    <Pagination {...props}>
      <PaginationContent>
        <PaginationPrevious
          previousText={previousText}
          onPress={() => onPageChange?.(currentPage - 1)}
          disabled={currentPage === 1}
        />

        {pageNumbers.map((page, i) => {
          if (typeof page === "string") {
            return <PaginationEllipsis key={"ellipsis" + i} />;
          }

          return (
            <PaginationNumber
              key={page}
              onPress={() => onPageChange?.(page)}
              active={page === currentPage}
            >
              {page}
            </PaginationNumber>
          );
        })}

        <PaginationNext
          nextText={nextText}
          onPress={() => onPageChange?.(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
      </PaginationContent>
    </Pagination>
  );
};

export const TableSkeleton = ({
  className: classNameProp,
  style,
  ...props
}: SkeletonProps) => {
  return (
    <Skeleton
      mode="pulse"
      style={[
        {
          height: 4,
          borderRadius: 8,
        },
        style,
      ]}
      {...props}
    />
  );
};
