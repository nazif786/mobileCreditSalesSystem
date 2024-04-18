"use client";
import { SelectSales } from "@/drizzle/schema";
import { useMemo, useState } from "react";
import {
  Selection,
  SortDescriptor,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { salesColumns } from "./salesColumns";
import { useRenderCell } from "./hooks/useRenderCell";
import { useFilteredItems, useItems } from "../hooks/useFilteredItems";
import { useSortedItems } from "../hooks/useSortedItems";
import usePage, { useRowsPerPage } from "../hooks/usePage";
import { useSearchChange } from "../hooks/useSearchChange";
import { useTopContent } from "../hooks/useTopContent";
import { useBottomContent } from "../hooks/useBottomContent";

let INITIAL_VISIBLE_COLUMNS: any[] = [
  "saleId",
  "custId",
  "compId",
  "transTypeId",
  "saleDate",
  "amount",
  "payment",
  "balance",
];

const SalesTable = ({ salesData }: { salesData: SelectSales[] }) => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterValue, setFilterValue] = useState("");
  const [page, setPage] = useState(1);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({});
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS),
  );
  const pages = Math.ceil(salesColumns.length / rowsPerPage);
  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return salesColumns;

    return salesColumns.filter((column) =>
      Array.from(visibleColumns).includes(column.key),
    );
  }, [visibleColumns]);

  const filterColumns: (keyof SelectSales)[] = ["saleId"]; // Specify the columns you want to filter on

  // Hooks
  const renderCell = useRenderCell();
  const filteredItems = useFilteredItems(salesData, filterValue, filterColumns);
  const items: any[] = useItems(filteredItems, page, rowsPerPage);
  const sortedItems = useSortedItems(items, sortDescriptor);
  const { onRowsPerPageChange } = useRowsPerPage(setRowsPerPage, setPage);
  const { onNextPage, onPreviousPage } = usePage(page, setPage, pages);
  const { onSearchChange, onClear } = useSearchChange(setFilterValue, setPage);
  const data = salesData;
  // prettier-ignore
  const topContent = useTopContent({filterValue, onClear, onSearchChange, onRowsPerPageChange, data});
  // prettier-ignore
  const bottomContent = useBottomContent({page, setPage, pages, onNextPage,onPreviousPage});

  return (
    <>
      <Table
        aria-label="Sales table with dynamic content"
        selectionMode="single"
        color="primary"
        topContent={topContent}
        topContentPlacement="outside"
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        onSortChange={setSortDescriptor}
        radius="none"
        isCompact
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>

        <TableBody
          items={sortedItems}
          emptyContent={"No employees data to display."}
        >
          {(item) => (
            <TableRow key={item.saleId}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)} </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default SalesTable;
