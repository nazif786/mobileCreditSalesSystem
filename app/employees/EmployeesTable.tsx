"use client";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Link,
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

import { empInsertSchema } from "@/app/db/validationSchema";
import { useCallback, useMemo, useState } from "react";
import { z } from "zod";
import { ChevronDownIcon } from "../components/ui/svg/ChevronDownIcon";
import { EditIcon } from "../components/ui/svg/EditIcon";
import { EyeIcon } from "../components/ui/svg/EyeIcon";
import { PlusIcon } from "../components/ui/svg/PlusIcon";
import { SearchIcon } from "../components/ui/svg/SearchIcon";
import { VerticalDotsIcon } from "../components/ui/svg/VerticalDotsIcon";
import { capitalize } from "../utils/capitalize";
import { columns } from "./columns";

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
  // const router = useRouter();
  // const [err, setErr] = useState(false);

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
      // console.log("cell values are ", cellValue);
      switch (columnKey) {
        case "actions":
          return (
            <div className="relative flex justify-end items-center gap-2">
              <Dropdown>
                <DropdownTrigger>
                  <Button isIconOnly size="sm" variant="light">
                    <VerticalDotsIcon className="text-fuchsia-800" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="actions" className="text-fuchsia-800">
                  <DropdownItem
                    href={`/employees/${employ.id}`}
                    endContent={<EyeIcon />}
                  >
                    View
                  </DropdownItem>
                  <DropdownItem
                    href={`/employees/${employ.id}/edit`}
                    endContent={<EditIcon />}
                  >
                    Edit
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          );
        case "regDate":
          return (
            <span>
              {new Date(cellValue as string).toISOString().split("T")[0]}
            </span>
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
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    [],
  );

  //////////////////////////////////////////////////////////////////
  //  sorting columns contents. pass this as items to table body instead of Items
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

  ///////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4 bg-slate-300 mt-7 p-5 rounded-none">
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

            <Button
              className="bg-fuchsia-800"
              endContent={<PlusIcon className="text-background" />}
            >
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
              <option value="50">50</option>
              <option value="100">100</option>
              <option value={empData.length}>All</option>
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
      <div className="p-5 flex justify-between items-center bg-slate-300 rounded-none">
        <div className="hidden sm:flex w-[30%] justify-start gap-2">
          <Button
            className="bg-fuchsia-800 text-background px-7"
            isDisabled={page === 1}
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
          color="secondary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            className="bg-fuchsia-800 text-background px-7"
            isDisabled={page === pages}
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
      aria-label="Employee table with dynamic content"
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
