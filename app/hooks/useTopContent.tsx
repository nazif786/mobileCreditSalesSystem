"use client";
import { PlusIcon } from "@/app/components/ui/svg/PlusIcon";
import { SearchIcon } from "@/app/components/ui/svg/SearchIcon";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Selection,
  Spinner,
} from "@nextui-org/react";
import Link from "next/link";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { ChevronDownIcon } from "../components/ui/svg/ChevronDownIcon";
import { capitalize } from "../utils/capitalize";

type dataType = Record<string, any>;

export const useTopContent = <T extends dataType>({
  filterValue,
  onClear,
  onSearchChange,
  onRowsPerPageChange,
  data,
  addNewButtonUrl,
  visibleColumns,
  setVisibleColumns,
  columns,
}: {
  filterValue: string;
  onClear: () => void;
  onSearchChange: (value?: string) => void;
  onRowsPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  data: T[];
  addNewButtonUrl: string;
  visibleColumns: Selection;
  setVisibleColumns: Dispatch<SetStateAction<Selection>>;
  columns: any[];
}) => {
  const [loading, setLoading] = useState(false); // State to track loading state
  const datalength = data.length;
  return useMemo(() => {
    return (
      <div className="flex flex-col gap-3 bg-slate-300 mt-0 p-5 rounded-md">
        <div className="flex justify-between gap-3 items-end">
          <Input
            name="search"
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder=" Search..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={onClear}
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
              color="primary"
              onClick={() => setLoading(true)}
              endContent={
                loading ? <Spinner color="warning" size="sm" /> : <PlusIcon />
              }
              startContent={loading && <Spinner color="danger" />}
              href={addNewButtonUrl}
              as={Link}
              // isLoading={loading}
            >
              Add New
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {datalength} Rows
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
              <option value={datalength}>All</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    onClear,
    onSearchChange,
    onRowsPerPageChange,
    datalength,
    visibleColumns,
    setVisibleColumns,
  ]);
};
