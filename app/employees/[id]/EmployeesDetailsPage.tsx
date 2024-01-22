import { EditIcon } from "@/app/components/ui/svg/EditIcon";
import { SelectEmpoyee } from "@/drizzle/schema";
import { Button, Input, Textarea } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { columns } from "../columns";

const EmployeesDetailsPage = ({ employee }: { employee: SelectEmpoyee }) => {
  return (
    <>
      <div className="relative w-[100%]">
        <div className="md:absolute md:-mt-10 min-w-full p-5 md:bg-gradient-to-r from-violet-700 to-violet-800 md:shadow-slate-400  rounded-lg  md:shadow-md">
          <h1 className=" prose text-xl font-extrabold text-center md:text-zinc-50">
            Employee Information
          </h1>
        </div>
        <div className="md:pt-16 lg:flex pb-10">
          <div className="bg-zinc-100 lg:flex-grow-0 md:p-5 min-w-[14rem] text-center md:rounded-md md:shadow-lg my-5 py-2">
            <div className=" md:min-h-full lg:pt-24">
              <h3 className="text-xl font-thin text-zinc-800">
                {employee.fname} {employee.lname}
              </h3>
              <text className="text-zinc-500 text-wrap">{employee.mobile}</text>
            </div>
            <Link href={`/employees/${employee.id}/edit`}>
              <Button className="w-[100%]" color="secondary">
                <EditIcon fontSize={16} /> Edit
              </Button>
            </Link>
          </div>
          <div className="flex-grow md:p-5 space-y-5">
            <div className="md:flex md:space-x-2">
              <Input
                className="text-zinc-400 inline-table"
                isReadOnly
                endContent={true}
                size="sm"
                fullWidth={true}
                labelPlacement="outside-left"
                variant="faded"
                label={columns[1].label}
                value={employee.tazkiraId}
              />
              <Input
                className="text-zinc-400 inline-table"
                isReadOnly
                endContent={true}
                size="sm"
                fullWidth={true}
                labelPlacement="outside-left"
                variant="faded"
                label={columns[5].label}
                value={employee.jobTitle}
              />
            </div>
            <Input
              className="text-zinc-400  block"
              isReadOnly
              color="secondary"
              endContent={true}
              size="sm"
              fullWidth={true}
              labelPlacement="outside-left"
              variant="underlined"
              label={columns[7].label}
              value={employee.email!}
            />
            <Input
              className="text-zinc-400 block"
              isReadOnly
              color="secondary"
              endContent={true}
              size="sm"
              fullWidth={true}
              labelPlacement="outside-left"
              variant="underlined"
              label={columns[9].label}
              value={employee.regDate?.toString().split(" ")[0]}
            />
            <Input
              className="text-zinc-400 block"
              isReadOnly
              color="secondary"
              endContent={true}
              size="sm"
              fullWidth={true}
              labelPlacement="outside-left"
              variant="underlined"
              label={columns[10].label}
              value={employee?.status === 1 ? "current" : "former"}
            />
            <Textarea
              className="text-zinc-400 block"
              isReadOnly
              // color="default"
              endContent={true}
              size="sm"
              fullWidth={true}
              labelPlacement="outside-left"
              variant="faded"
              label={columns[8].label}
              value={employee.address!}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeesDetailsPage;
