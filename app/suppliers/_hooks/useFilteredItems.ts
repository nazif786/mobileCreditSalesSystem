// import { useMemo } from "react";
// import { SelectSupplier } from "@/drizzle/schema";

import { SelectSupplier } from "@/drizzle/schema";
import { useMemo } from "react";

export const useFilteredItems = (
  supplierData: SelectSupplier[],
  filterValue: string,
) => {
  return useMemo(() => {
    if (!filterValue.trim()) return supplierData;
    return supplierData.filter((supp) =>
      supp.compName.toLowerCase().includes(filterValue.toLowerCase()),
    );
  }, [supplierData, filterValue]);
};

export const useItems = (
  filteredItems: SelectSupplier[],
  page: number,
  rowsPerPage: number,
) => {
  return useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);
};
