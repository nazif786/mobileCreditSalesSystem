"use client";
import { SelectSupplier } from "@/drizzle/schema";
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
import { useState } from "react";
import { supplierColumns } from "../utils/columns";
import { useBottomContent } from "./_hooks/useBottomContent";
import { useFilteredItems, useItems } from "../hooks/useFilteredItems";
import useHeaderColumns from "./_hooks/useHeaderColumns";
import usePage, { useRowsPerPage } from "../hooks/usePage";
import { useRenderCell } from "./_hooks/useRenderCell";
import { useSearchChange } from "../hooks/useSearchChange";
import { useSortedItems } from "../hooks/useSortedItems";
import { useTopContent } from "./_hooks/useTopContent";

// prettier-ignore
let INITIAL_VISIBLE_COLUMNS: any[] = ["compId", "compName", "compMobile", "compEmail", "actions"];
// prettier-ignore
const SupplierTable = ({ supplierData}: { supplierData: SelectSupplier[];}) => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterValue, setFilterValue] = useState("");
  const [page, setPage] = useState(1);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({});
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS),
  ); 
  const filterColumns: (keyof SelectSupplier)[] = ['compName']; // Specify the columns you want to filter on
  const pages = Math.ceil(supplierData.length / rowsPerPage);
  //HOOKS
  const headerColumns = useHeaderColumns(visibleColumns);
  const renderCell = useRenderCell();
  const filteredItems = useFilteredItems(supplierData, filterValue, filterColumns);
  const items:any[] = useItems(filteredItems, page, rowsPerPage);
  const sortedItems = useSortedItems(items, sortDescriptor);
  const {onRowsPerPageChange} = useRowsPerPage(setRowsPerPage, setPage) 
  const {onNextPage, onPreviousPage} = usePage(page, setPage, pages)
  const { onSearchChange, onClear } = useSearchChange(setFilterValue, setPage);
  // prettier-ignore
  const topContent = useTopContent({filterValue, onClear, onSearchChange, onRowsPerPageChange, supplierData});
  // prettier-ignore
  const bottomContent = useBottomContent({page, setPage, pages, onNextPage,onPreviousPage});
  return (
    <>
      <Table
        aria-label="Supplier table contents"
        color="primary"
        selectionMode="single"
        topContent={topContent}
        topContentPlacement="outside"
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {supplierColumns.map((column) => (
            <TableColumn
              key={column.key}
              //   align={column.key === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.label}
            </TableColumn>
          ))}
        </TableHeader>

        <TableBody
          items={sortedItems}
          emptyContent={"No employees data to display."}
        >
          {(item) => (
            // <Suspense>
            <TableRow key={item.compId}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)} </TableCell>
              )}
            </TableRow>
            // </Suspense>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default SupplierTable;
