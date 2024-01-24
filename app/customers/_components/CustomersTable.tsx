"use client";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Link,
  Selection,
  Pagination,
  SortDescriptor,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useCallback, useMemo, useState } from "react";
import { ChevronDownIcon } from "@/app/components/ui/svg/ChevronDownIcon";
import { PlusIcon } from "@/app/components/ui/svg/PlusIcon";
import { SearchIcon } from "@/app/components/ui/svg/SearchIcon";
import { VerticalDotsIcon } from "@/app/components/ui/svg/VerticalDotsIcon";
import { custInsertSchema } from "@/app/db/validationSchema";
import { z } from "zod";
import { columns } from "../utils/columns";
import { capitalize } from "@/app/utils/capitalize";
// import Link from "next/link";

let INITIAL_VISIBLE_COLUMNS: string[] = [
  // "custId",
  "custUId",
  "custComi",
  "custFname",
  "custMobile",
  "custEmail",
  "custRegDate",
  "actions",
];

export type custSchema = z.infer<typeof custInsertSchema>;

const li = new Set(INITIAL_VISIBLE_COLUMNS);

const CustomersTable = ({ custData }: { custData: custSchema[] }) => {
  type Customer = (typeof custData)[0];

  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({});
  const [filterValue, setFilterValue] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [visibleColumns, setVisibleColumns] = useState<Selection>(li);

  const hasSearchFilter = Boolean(filterValue);
  // const rowsPerPage = 10;
  const pages = Math.ceil(custData.length / rowsPerPage);
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
    (customer: Customer, columnKey: React.Key | Date) => {
      const cellValue = customer[columnKey as keyof Customer];

      switch (columnKey) {
        case "actions":
          return (
            <div className="relative flex justify-end items-center gap-2">
              <Dropdown>
                <DropdownTrigger>
                  <Button isIconOnly size="sm" variant="light">
                    <VerticalDotsIcon className="text-primary-300 " />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="actions">
                  <DropdownItem href={`/customers/${customer.custId}`}>
                    View
                  </DropdownItem>
                  <DropdownItem href={`/customers/${customer.custId}/edit`}>
                    Edit
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          );
        case "custRegDate":
          return (
            <span>{new Date(cellValue!).toISOString().split("T")[0]}</span>
          );
        case "custFname":
          return <span>{capitalize(cellValue?.toString()!)}</span>;
        case "custLname":
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
    let filteredEmp = [...custData];

    if (hasSearchFilter) {
      filteredEmp = filteredEmp.filter(
        (
          cust, //// search the columns here
        ) =>
          cust.custFname.toLowerCase().includes(filterValue.toLowerCase()) ||
          cust.custLname!.toLowerCase().includes(filterValue.toLowerCase()) ||
          cust.custUId.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }

    return filteredEmp;
  }, [custData, filterValue]);
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
      let lent: number = custData.length;
      console.log(lent);
      if (e.target.value == "all") {
        setRowsPerPage(lent);
      }
      setRowsPerPage(Number(e.target.value));

      setPage(1);
    },
    [],
  );

  //////////////////////////////////////////////////////////////////
  //  sorting cloumns contents. pass this as items to table body instead of Items
  const sortedItems = useMemo(() => {
    // ---- copied
    return [...items].sort((a: Customer, b: Customer) => {
      const first = a[sortDescriptor.column as keyof Customer] as number;
      const second = b[sortDescriptor.column as keyof Customer] as number;
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
              <Link href="/customers/new" className="text-white">
                Add New
              </Link>
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {custData.length} employees
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              defaultValue="5"
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="100">100</option>
              {/* <option value="all">All</option> */}
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
    custData.length,
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
          <TableRow key={item.custId}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)} </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default CustomersTable;
