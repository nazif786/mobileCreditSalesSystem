"use client";
import Spinner from "@/app/components/ui/Spinner";
import { EditIcon } from "@/app/components/ui/svg/EditIcon";
import { EyeIcon } from "@/app/components/ui/svg/EyeIcon";
import { capitalize } from "@/app/utils/capitalize";
import { SelectSales } from "@/drizzle/schema";
import { Tooltip } from "@nextui-org/react";
import Link from "next/link";
import { useCallback, useState } from "react";

type Sale = SelectSales;

export const useRenderCell = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const renderCell = useCallback((sale: Sale, columnKey: React.Key | Date) => {
    let cellValue = sale[columnKey as keyof Sale];
    // console.log(cellValue);
    switch (columnKey) {
      case "actions":
        return (
          <div className="relative flex items-center gap-3">
            <Tooltip content="Details" color="foreground">
              <Link
                href={`/suppliers/${sale.saleId}`}
                onClick={() => setIsSubmitting(true)}
              >
                <span className="text-lg text-secondary cursor-pointer active:opacity-50">
                  {isSubmitting ? <Spinner /> : <EyeIcon />}
                </span>
              </Link>
            </Tooltip>
            <Tooltip content="Edit user" color="foreground">
              <Link
                href={`/suppliers/${sale.saleId}/edit`}
                onClick={() => setIsSubmitting(true)}
              >
                <span className="text-lg text-primary cursor-pointer active:opacity-50">
                  {isSubmitting ? <Spinner /> : <EditIcon />}
                </span>
              </Link>
            </Tooltip>
          </div>
        );
      //   case "regDate":
      //     return (
      //       <span>
      //         {new Date(cellValue as string).toISOString().split("T")[0]}
      //       </span>
      //     );
      //   case "compName":
      //     return <span>{capitalize(cellValue?.toString() || " ")}</span>;

      default:
        return cellValue;
    }
  }, []);

  return renderCell;
};
