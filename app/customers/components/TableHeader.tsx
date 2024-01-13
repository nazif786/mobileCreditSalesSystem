// TableHeaderComponent.tsx
import { TableColumn, TableColumnProps } from "@nextui-org/react";
import { columns } from "../utils/columns";

// type Col = {
//   key: string;
//   label: string;
// };

type Column = (typeof columns)[number];

const TableHeaderComponent = ({ column }: { column: Column }) => {
  return <TableColumn key={column.key}>{column.label}</TableColumn>;
};

export default TableHeaderComponent;
