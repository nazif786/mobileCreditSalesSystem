"use client";
import { PlusIcon } from "@/app/components/ui/svg/PlusIcon";
import { SearchIcon } from "@/app/components/ui/svg/SearchIcon";
import { SelectSupplier } from "@/drizzle/schema";
import { Button, Input, Spinner } from "@nextui-org/react";
import Link from "next/link";
import { useMemo, useState } from "react";

export const useTopContent = ({
  filterValue,
  onClear,
  onSearchChange,
  onRowsPerPageChange,
  supplierData,
}: {
  filterValue: string;
  onClear: () => void;
  onSearchChange: (value?: string) => void;
  onRowsPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  supplierData: SelectSupplier[];
}) => {
  const [loading, setLoading] = useState(false); // State to track loading state
  return useMemo(() => {
    return (
      <div className="flex flex-col gap-3 bg-slate-300 mt-0 p-5 rounded-md">
        <div className="flex justify-between gap-3 items-end">
          <Input
            name="search"
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder=" Search by supplier name or ID..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={onClear}
            onValueChange={onSearchChange}
          />

          <div className="flex gap-3">
            <Button
              color="primary"
              onClick={() => setLoading(true)}
              endContent={
                loading ? <Spinner color="warning" size="sm" /> : <PlusIcon />
              }
              startContent={loading && <Spinner color="danger" />}
              href="/suppliers/new"
              as={Link}
              // isLoading={loading}
            >
              Add New
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {supplierData.length} Suppliers
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
              <option value={supplierData.length}>All</option>
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
    supplierData.length,
  ]);
};
