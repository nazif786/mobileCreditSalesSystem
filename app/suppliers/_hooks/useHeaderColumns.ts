// useHeaderColumns.ts

import { useMemo } from "react";
import { supplierColumns } from "@/app/utils/columns";
import { Selection } from "@nextui-org/react";

export default function useHeaderColumns(visibleColumns: Selection) {
  return useMemo(() => {
    return supplierColumns.filter((column) =>
      Array.from(visibleColumns).includes(column.label),
    );
  }, [visibleColumns]);
}
