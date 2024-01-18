"use client";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Link,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ChevronDownIcon } from "../components/ui/svg/ChevronDownIcon";
import { PlusIcon } from "../components/ui/svg/PlusIcon";
import { SearchIcon } from "../components/ui/svg/SearchIcon";
import { capitalize } from "../utils/capitalize";
import { columns } from "./data";

const loading = () => {
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <>
      <div className=" mb-5 text-center text-2xl">
        <h1>Employees</h1>
      </div>

      <div className="flex flex-col gap-4 bg-slate-300 mt-12 p-5 rounded-md mb-5 ">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name or job title..."
          />

          <div className="flex gap-3 ">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  style={{ zIndex: 1 }}
                  color="secondary"
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                {columns.map((column) => (
                  <DropdownItem></DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>

            <Button color="primary" endContent={<PlusIcon />}>
              <Link href="/employees/new" className="text-white">
                Add New
              </Link>
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small"></span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="100">100</option>
              <option value="all">All</option>
            </select>
          </label>
        </div>
      </div>

      <Table>
        <TableHeader>
          {items.map((item) => (
            <TableColumn>
              <Skeleton />
            </TableColumn>
          ))}
        </TableHeader>

        <TableBody aria-label="Example table with dynamic content">
          {items.map((item) => (
            <TableRow>
              <TableCell>
                <Skeleton />
              </TableCell>
              <TableCell>
                <Skeleton />
              </TableCell>
              <TableCell>
                <Skeleton />
              </TableCell>
              <TableCell>
                <Skeleton />
              </TableCell>
              <TableCell>
                <Skeleton />
              </TableCell>
              <TableCell>
                <Skeleton />
              </TableCell>
              <TableCell>
                <Skeleton />
              </TableCell>
              <TableCell>
                <Skeleton />
              </TableCell>
              <TableCell>
                <Skeleton />
              </TableCell>
              <TableCell>
                <Skeleton />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default loading;
