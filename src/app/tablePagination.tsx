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
  Badge,
  BadgeText,
  Star,
} from "@usekeyhole/nativewind";
import { cn } from "@usekeyhole/utils";
import { TablePageSizeSelectorV2 } from "@usekeyhole/web";
import { View } from "react-native";
import { TableFooter, TablePagination } from "~/components/table/table";

export default function Page() {
  return <Content />;
}

function Content() {
  const totalPages = 40;

  return (
    <View className="w-full h-full p-4">
      <TableFooter>
        <TablePagination
          className={cn(totalPages === -1 && "opacity-0")}
          totalPages={40}
          currentPage={5}
          onPageChange={() => {}}
          previousText={"Previous"}
          nextText={"Next"}
        />
        <TablePageSizeSelectorV2
          className={cn(totalPages === -1 && "opacity-0")}
          value={10}
          onChange={() => {}}
          rowsPerPageText={"Rows per page:"}
        />
      </TableFooter>
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
    </View>
  );
}
