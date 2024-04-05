"use client";
import { SelectSupplier } from "@/drizzle/schema";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Pagination,
  Selection,
  SortDescriptor,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { ChevronDownIcon } from "../components/ui/svg/ChevronDownIcon";
import { EditIcon } from "../components/ui/svg/EditIcon";
import { EyeIcon } from "../components/ui/svg/EyeIcon";
import { PlusIcon } from "../components/ui/svg/PlusIcon";
import { SearchIcon } from "../components/ui/svg/SearchIcon";
import { VerticalDotsIcon } from "../components/ui/svg/VerticalDotsIcon";
import { capitalize } from "../utils/capitalize";
import { supplierColumns } from "../utils/columns";
import useHeaderColumns from "./_components/useHeaderColumns";
import { useRenderCell } from "./_components/useRenderCell";

let INITIAL_VISIBLE_COLUMNS = supplierColumns.map((supplier) => supplier.key);

const SupplierTable = ({
  supplierData,
}: {
  supplierData: SelectSupplier[];
}) => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterValue, setFilterValue] = useState("");
  const [page, setPage] = useState(1);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({});
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS),
  );

  const headerColumns = useHeaderColumns(visibleColumns);
  const renderCell = useRenderCell();
  //   console.log(renderCell);
  const hasSearchFilter = Boolean(filterValue.trim().length);

  const pages = Math.ceil(supplierData.length / rowsPerPage);

  const filteredItems = useMemo(() => {
    let filteredSupplier = [...supplierData];

    if (hasSearchFilter) {
      filteredSupplier = filteredSupplier.filter(
        (
          supp, //// search the columns here
        ) => supp.compName.toLowerCase().includes(filterValue.toLowerCase()),
        //   ||
        //   emp.jobTitle.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }

    return filteredSupplier;
  }, [supplierData, filterValue]);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  type Supplier = (typeof supplierData)[0];
  const sortedItems = useMemo(() => {
    // ---- copied
    return [...items].sort((a: Supplier, b: Supplier) => {
      const first = a[sortDescriptor.column as keyof Supplier] as number;
      const second = b[sortDescriptor.column as keyof Supplier] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);
  console.log(items);

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
  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4 bg-slate-300 mt-7 p-5 rounded-md">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name or job title..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />

          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  style={{ zIndex: 1 }}
                  color="secondary"
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {supplierColumns.map((column) => (
                  <DropdownItem key={column.key} className="capitalize">
                    {capitalize(column.label)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>

            <Button color="primary" endContent={<PlusIcon />}>
              <Link href="/employees/new" className="text-white">
                Add New
              </Link>
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {supplierData.length} employees
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              defaultValue="10"
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="100">100</option>
              <option value="all">All</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    onSearchChange,
    // statusFilter,
    visibleColumns,
    onRowsPerPageChange,
    supplierData.length,
    hasSearchFilter,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-5 px-5 flex justify-between items-center bg-slate-300 rounded-md">
        <div className="hidden sm:flex w-[30%] justify-start gap-2">
          <Button
            className="bg-white px-7"
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
        </div>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            className="bg-white px-7"
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [items.length, page, pages]);

  return (
    <>
      <Table
        aria-label="Supplier table contents"
        color="secondary"
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
              //   allowsSorting={column.sortable}
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
            <TableRow key={item.compName}>
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

export default SupplierTable;
