// useHeaderColumns.ts

import { useMemo } from "react";
import { supplierColumns } from "@/app/utils/columns";
import { Selection } from "@nextui-org/react";

export default function useHeaderColumns(visibleColumns: Selection) {
  return useMemo(() => {
    // if (visibleColumns === "all") return supplierColumns;

    return supplierColumns.filter((column) =>
      Array.from(visibleColumns).includes(column.key),
    );
  }, [visibleColumns]);
}
