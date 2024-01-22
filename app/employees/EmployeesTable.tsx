"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  SortDescriptor,
  Button,
  Input,
  Selection,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Link,
} from "@nextui-org/react";

import { empInsertSchema } from "@/app/db/validationSchema";
import { z } from "zod";
import { useCallback, useMemo, useState } from "react";
import { columns } from "./columns";
import { SearchIcon } from "../components/ui/svg/SearchIcon";
import { ChevronDownIcon } from "../components/ui/svg/ChevronDownIcon";
import { capitalize } from "../utils/capitalize";
import { PlusIcon } from "../components/ui/svg/PlusIcon";
// import Link from "next/link";
import { VerticalDotsIcon } from "../components/ui/svg/VerticalDotsIcon";

type empSchema = z.infer<typeof empInsertSchema>;

let INITIAL_VISIBLE_COLUMNS: any[] = [
  "id",
  "fname",
  "jobTitle",
  "mobile",
  "email",
  "regDate",
  "actions",
];
const li = new Set(INITIAL_VISIBLE_COLUMNS);

export default function EmployeesTable({ empData }: { empData: empSchema[] }) {
  type Employ = (typeof empData)[0];
  //// start here
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({});
  const [filterValue, setFilterValue] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS),
  );

  const hasSearchFilter = Boolean(filterValue);
  // const rowsPerPage = 10;
  const pages = Math.ceil(empData.length / rowsPerPage);
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // show columns drop down code
  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.key),
    );
  }, [visibleColumns]);

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Rendering cells

  const renderCell = useCallback(
    (employ: Employ, columnKey: React.Key | Date) => {
      const cellValue = employ[columnKey as keyof Employ];

      switch (columnKey) {
        case "actions":
          return (
            <div className="relative flex justify-end items-center gap-2">
              <Dropdown>
                <DropdownTrigger>
                  <Button isIconOnly size="sm" variant="light">
                    <VerticalDotsIcon className="text-default-300" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="actions">
                  <DropdownItem href={`/employees/${employ.id}`}>
                    View
                  </DropdownItem>
                  <DropdownItem href={`/employees/${employ.id}/edit`}>
                    Edit
                  </DropdownItem>
                  <DropdownItem href={`/employees/${employ.id}`}>
                    Delete
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          );
        case "regDate":
          return (
            <span>{new Date(cellValue!).toISOString().split("T")[0]}</span>
          );
        case "fname":
          return <span>{capitalize(cellValue?.toString()!)}</span>;
        case "jobTitle":
          return <span>{capitalize(cellValue?.toString()!)}</span>;
        default:
          return cellValue;
      }
    },
    [],
  );

  /////////////////////////////////////////////////////////////////

  // search
  const filteredItems = useMemo(() => {
    let filteredEmp = [...empData];

    if (hasSearchFilter) {
      filteredEmp = filteredEmp.filter(
        (
          emp, //// search the columns here
        ) =>
          emp.fname.toLowerCase().includes(filterValue.toLowerCase()) ||
          emp.jobTitle.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }

    return filteredEmp;
  }, [empData, filterValue]);
  ///////////////////////////////////////////////////////////////////////

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
  // ---------------------------- end of search code

  ////////////////// used by both search and paginations
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);
  /////////////////////////////////////

  // rows per page code
  const onRowsPerPageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      // let lent: number = empData.length;
      // console.log(lent);
      // if (e.target.value == "all") {
      //   setRowsPerPage(lent);
      // }
      setRowsPerPage(Number(e.target.value));

      setPage(1);
    },
    [],
  );

  //////////////////////////////////////////////////////////////////
  //  sorting cloumns contents. pass this as items to table body instead of Items
  const sortedItems = useMemo(() => {
    // ---- copied
    return [...items].sort((a: Employ, b: Employ) => {
      const first = a[sortDescriptor.column as keyof Employ] as number;
      const second = b[sortDescriptor.column as keyof Employ] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  ////////////////////////////////////////////////////////////////////
  // Paginationa
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

  ///////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////

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
                {columns.map((column) => (
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
            Total {empData.length} employees
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
    empData.length,
    hasSearchFilter,
  ]);

  ////////////////////////////////////////////////////////////////////////////////////////////////////
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
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <Table
      bottomContentPlacement="outside"
      aria-label="Example table with dynamic content"
      selectionMode="single"
      color="primary"
      bottomContent={bottomContent}
      topContent={topContent}
      topContentPlacement="outside"
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn key={column.key} allowsSorting={true}>
            {column.label}
          </TableColumn>
        )}
      </TableHeader>

      <TableBody
        items={sortedItems}
        emptyContent={"No employees data to display."}
      >
        {(item) => (
          <TableRow key={item.tazkiraId}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)} </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
