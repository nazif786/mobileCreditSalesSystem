import React, { Dispatch, useCallback, useMemo, useState } from "react";
import { custSchema } from "./CustomersTable";
import { Input } from "@nextui-org/react";
import { SearchIcon } from "@/app/components/ui/svg/SearchIcon";

interface Props {
  custData: custSchema[];
  setPage: Dispatch<React.SetStateAction<number>>;
}
const TopContent = ({ custData, setPage }: Props) => {
  const [filterValue, setFilterValue] = useState("");

  // SEARCH
  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = useMemo(() => {
    let filteredCustoter = [...custData];

    if (hasSearchFilter) {
      filteredCustoter = filteredCustoter.filter(
        (
          emp, //// search the columns here
        ) =>
          emp.custFname.toLowerCase().includes(filterValue.toLowerCase()) ||
          emp?.custLname!.toLowerCase().includes(filterValue.toLowerCase()) ||
          emp.custUId.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }

    return filteredCustoter;
  }, [custData, filterValue]);

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);
  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);
  return (
    <>
      <div className="flex flex-col gap-4 bg-slate-300 mt-7 p-5 rounded-md">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name or job title..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
        </div>
      </div>
    </>
  );
};

export default TopContent;
