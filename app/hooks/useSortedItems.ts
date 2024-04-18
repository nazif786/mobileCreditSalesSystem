import { useMemo } from "react";
// import { SelectSupplier } from "@/drizzle/schema";
import { SortDescriptor } from "@nextui-org/react";

// type Supplier = SelectSupplier;
type SortableItem = Record<string, any>; // Define a generic type for sortable items

export const useSortedItems = <T extends SortableItem>(
  items: T[],
  sortDescriptor: SortDescriptor,
) => {
  type SortedData = (typeof items)[0];
  return useMemo(() => {
    return [...items].sort((a: T, b: T) => {
      const first = a[sortDescriptor.column as keyof SortedData] as number;
      const second = b[sortDescriptor.column as keyof SortedData] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);
};
