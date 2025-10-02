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
          maxVisiblePages={3}
        />
        <TablePageSizeSelectorV2
          className={cn(totalPages === -1 && "opacity-0")}
          value={10}
          onChange={() => {}}
          rowsPerPageText={"Rows per page:"}
        />
      </TableFooter>
    </View>
  );
}
