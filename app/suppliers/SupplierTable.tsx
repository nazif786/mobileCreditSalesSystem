"use client";
import { SelectSupplier } from "@/drizzle/schema";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Selection,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useCallback, useState } from "react";
import { EditIcon } from "../components/ui/svg/EditIcon";
import { EyeIcon } from "../components/ui/svg/EyeIcon";
import { VerticalDotsIcon } from "../components/ui/svg/VerticalDotsIcon";
import { capitalize } from "../utils/capitalize";
import { supplierColumns } from "../utils/columns";
import useHeaderColumns from "./_components/useHeaderColumns";
import { useRenderCell } from "./_components/useRenderCell";

let INITIAL_VISIBLE_COLUMNS = supplierColumns.map((supplier) => supplier.label);

// type supplierSchema = z.infer<typeof supplierInsertSchema>;
const SupplierTable = ({
  supplierData,
}: {
  supplierData: SelectSupplier[];
}) => {
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS),
  );

  const headerColumns = useHeaderColumns(visibleColumns);
  const renderCell = useRenderCell({ supplierData });
  //   type Supplier = (typeof supplierData)[0];

  //   const renderCell = useCallback(
  //     (supplier: Supplier, columnKey: React.Key | Date) => {
  //       const cellValue = supplier[columnKey as keyof Supplier];

  //       switch (columnKey) {
  //         case "actions":
  //           return (
  //             <div className="relative flex justify-end items-center gap-2">
  //               <Dropdown>
  //                 <DropdownTrigger>
  //                   <Button isIconOnly size="sm" variant="light">
  //                     <VerticalDotsIcon className="text-blue-400" />
  //                   </Button>
  //                 </DropdownTrigger>
  //                 <DropdownMenu aria-label="actions" color="primary">
  //                   <DropdownItem
  //                     href={`/suppliers/${supplier.compId}`}
  //                     endContent={<EyeIcon />}
  //                   >
  //                     View
  //                   </DropdownItem>
  //                   <DropdownItem
  //                     href={`/suppliers/${supplier.compId}/edit`}
  //                     endContent={<EditIcon />}
  //                   >
  //                     Edit
  //                   </DropdownItem>
  //                 </DropdownMenu>
  //               </Dropdown>
  //             </div>
  //           );

  //         case "comp_name":
  //           return <span>{capitalize(cellValue?.toString()!)}</span>;

  //         default:
  //           return cellValue;
  //       }
  //     },
  //     [],
  //   );

  return (
    <>
      <Table aria-label="Supplier table contents" color="primary">
        <TableHeader columns={headerColumns}>
          {supplierColumns.map((column) => (
            <TableColumn
              key={column.key}
              align={column.key === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.label}
            </TableColumn>
          ))}
        </TableHeader>

        <TableBody>
          <TableRow>
            <TableCell>Nazif</TableCell>
            <TableCell>Nazif</TableCell>
            <TableCell>Nazif</TableCell>
            <TableCell>Nazif</TableCell>
            <TableCell>Nazif</TableCell>
            <TableCell>Nazif</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};

export default SupplierTable;
