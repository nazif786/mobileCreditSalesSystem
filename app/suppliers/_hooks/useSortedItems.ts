import { useMemo } from "react";
import { SelectSupplier } from "@/drizzle/schema";
import { SortDescriptor } from "@nextui-org/react";

type Supplier = SelectSupplier;

export const useSortedItems = (
  items: SelectSupplier[],
  sortDescriptor: SortDescriptor,
) => {
  return useMemo(() => {
    return [...items].sort((a: Supplier, b: Supplier) => {
      const first = a[sortDescriptor.column as keyof Supplier] as number;
      const second = b[sortDescriptor.column as keyof Supplier] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);
};
