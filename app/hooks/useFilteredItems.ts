// import { SelectSupplier } from "@/drizzle/schema";
import { useMemo } from "react";

type Datatype = Record<string, any>; // Define a generic type for sortable items

export const useFilteredItems = <T extends Datatype>(
  data: T[],
  filterValue: string,
  propertyNames: (keyof T)[], // Array of property names of type T to filter on
) => {
  return useMemo(() => {
    if (!filterValue.trim()) return data;
    return data.filter((item) => {
      if (typeof item === "object" && item !== null) {
        return propertyNames.some((propertyName) =>
          String(item[propertyName])
            .toLowerCase()
            .includes(filterValue.toLowerCase()),
        );
      }
      return false;
    });
  }, [data, filterValue, propertyNames]);
};

export const useItems = (
  filteredItems: Datatype[],
  page: number,
  rowsPerPage: number,
) => {
  return useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);
};

// export const useSearchChange = (
//   setFilterValue: Dispatch<SetStateAction<string>>,
//   setPage: Dispatch<SetStateAction<number>>,
//   value?: string,
// ) => {
//   return useCallback(() => {
//     if (value) {
//       setFilterValue(value);
//       setPage(1);
//     } else {
//       setFilterValue("");
//     }
//   }, []);
// };
