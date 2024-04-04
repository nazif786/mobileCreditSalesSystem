import { ReactNode, useCallback } from "react";
import { SelectSupplier } from "@/drizzle/schema";
import { capitalize } from "@/app/utils/capitalize";
import { EditIcon } from "@/app/components/ui/svg/EditIcon";
import { EyeIcon } from "@/app/components/ui/svg/EyeIcon";
import { VerticalDotsIcon } from "@/app/components/ui/svg/VerticalDotsIcon";
import {
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

type Supplier = SelectSupplier;

interface RenderCellProps {
  supplier: Supplier;
  columnKey: React.Key | Date;
}

interface UseRenderCellProps {
  supplierData: SelectSupplier[];
}

export const useRenderCell = ({ supplierData }: UseRenderCellProps) => {
  const renderCell = useCallback(
    (props: RenderCellProps) => {
      const { supplier, columnKey } = props;
      const cellValue = supplier[columnKey as keyof Supplier];

      switch (columnKey) {
        case "actions":
          return (
            <div className="relative flex justify-end items-center gap-2">
              <Dropdown>
                <DropdownTrigger>
                  <Button isIconOnly size="sm" variant="light">
                    <VerticalDotsIcon className="text-blue-400" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="actions" color="primary">
                  <DropdownItem
                    href={`/suppliers/${supplier.compId}`}
                    endContent={<EyeIcon />}
                  >
                    View
                  </DropdownItem>
                  <DropdownItem
                    href={`/suppliers/${supplier.compId}/edit`}
                    endContent={<EditIcon />}
                  >
                    Edit
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          );

        case "comp_name":
          return <span>{capitalize(cellValue?.toString()!)}</span>;

        default:
          return cellValue;
      }
    },
    [supplierData],
  );

  return renderCell;
};
