"use client";
import Spinner from "@/app/components/ui/Spinner";
import { EditIcon } from "@/app/components/ui/svg/EditIcon";
import { EyeIcon } from "@/app/components/ui/svg/EyeIcon";
import { capitalize } from "@/app/utils/capitalize";
import { SelectSupplier } from "@/drizzle/schema";
import { Tooltip } from "@nextui-org/react";
import Link from "next/link";
import { useCallback, useState } from "react";

type Supplier = SelectSupplier;

export const useRenderCell = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const renderCell = useCallback(
    (supplier: Supplier, columnKey: React.Key | Date) => {
      let cellValue = supplier[columnKey as keyof Supplier];
      // console.log(cellValue);
      switch (columnKey) {
        case "actions":
          return (
            <div className="relative flex items-center gap-3">
              <Tooltip content="Details" color="foreground">
                <Link
                  href={`/suppliers/${supplier.compId}`}
                  onClick={() => setIsSubmitting(true)}
                >
                  <span className="text-lg text-secondary cursor-pointer active:opacity-50">
                    {isSubmitting ? <Spinner /> : <EyeIcon />}
                  </span>
                </Link>
              </Tooltip>
              <Tooltip content="Edit user" color="foreground">
                <Link
                  href={`/suppliers/${supplier.compId}/edit`}
                  onClick={() => setIsSubmitting(true)}
                >
                  <span className="text-lg text-primary cursor-pointer active:opacity-50">
                    {isSubmitting ? <Spinner /> : <EditIcon />}
                  </span>
                </Link>
              </Tooltip>
            </div>
          );

        case "compName":
          return <span>{capitalize(cellValue?.toString() || " ")}</span>;

        default:
          return cellValue;
      }
    },
    [],
  );

  return renderCell;
};
