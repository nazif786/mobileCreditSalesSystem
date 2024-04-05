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
  usePagination,
} from "@nextui-org/react";
import { useCallback, useMemo, useState } from "react";
import { supplierColumns } from "../utils/columns";
import { useBottomContent } from "./_hooks/useBottomContent";
import { useFilteredItems, useItems } from "./_hooks/useFilteredItems";
import useHeaderColumns from "./_hooks/useHeaderColumns";
import { useRenderCell } from "./_hooks/useRenderCell";
import { useSortedItems } from "./_hooks/useSortedItems";
import { useTopContent } from "./_hooks/useTopContent";

// prettier-ignore
let INITIAL_VISIBLE_COLUMNS: any[] = ["compId", "compName", "compMobile", "compEmail", "actions"];
// prettier-ignore
const SupplierTable = ({ supplierData}: { supplierData: SelectSupplier[];}) => {
  // 
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterValue, setFilterValue] = useState("");
  const [page, setPage] = useState(1);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({});
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS),
  );

  // Variable and Types
  const hasSearchFilter = Boolean(filterValue.trim().length);
  const pages = Math.ceil(supplierData.length / rowsPerPage);

  //HOOKS
  const headerColumns = useHeaderColumns(visibleColumns);
  const renderCell = useRenderCell();
  // const filteredItems = useFilteredItems(supplierData, filterValue,hasSearchFilter);
  const filteredItems = useFilteredItems(supplierData, filterValue);
  const items = useItems(filteredItems, page, rowsPerPage);

  const sortedItems = useSortedItems(items, sortDescriptor);



  // sorted till here
  const onRowsPerPageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    [],
  );

  // Pagination
  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);
  /////////////////////////////////////////////////////
  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);
  // end of Pagination
  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);
  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

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
