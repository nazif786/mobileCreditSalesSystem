import { EditIcon } from "@/app/components/ui/svg/EditIcon";
import { SelectSupplier } from "@/drizzle/schema";
import { Button, Input, Textarea } from "@nextui-org/react";
import Link from "next/link";
import { supplierColumns } from "@/app/utils/columns";
// import DeleteEmployee from "./DeleteEmployee";
import { capitalize } from "@/app/utils/capitalize";
import DeleteSupplier from "./DeleteSupplier";
import { notFound } from "next/navigation";

const SupplierDetailsPage = ({ supplier }: { supplier: SelectSupplier }) => {
  if (!supplier) return notFound();
  return (
    <>
      <div className="relative w-[100%] pb-10">
        <div className="md:absolute md:-mt-10 min-w-full p-5 md:bg-gradient-to-r from-fuchsia-700 to-fuchsia-800 shadow-slate-400 rounded-lg  md:shadow-slate-400  md:shadow-md">
          <h1 className=" prose text-xl font-extrabold text-center md:text-zinc-50">
            Supplier Information
          </h1>
        </div>
        <div className="md:pt-16 lg:flex pb-10">
          <div className="bg-zinc-100 lg:flex-grow-0 md:p-5 min-w-[14rem] text-center md:rounded-md md:shadow-lg my-5 py-2">
            <div className=" md:min-h-full lg:pt-24">
              <h3 className="text-xl font-thin text-zinc-800">
                {capitalize(supplier.compName) || " "}
              </h3>
              <text className="text-zinc-500 text-wrap">
                {supplier.compMobile}
              </text>
            </div>
            <div className="grid gap-3">
              <Link href={`/suppliers/${supplier.compId}/edit`}>
                <Button className="w-[100%] md:bg-gradient-to-r from-fuchsia-700 to-fuchsia-800 md:text-zinc-50">
                  <EditIcon fontSize={16} /> Edit
                </Button>
              </Link>
              <DeleteSupplier
                supplierId={supplier.compId}
                supplierName={supplier.compName}
              />
            </div>
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
                variant="bordered"
                label={supplierColumns[0].label}
                value={String(supplier.compId)}
              />
              <Input
                className="text-zinc-400 inline-table focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                isReadOnly
                endContent={true}
                size="sm"
                fullWidth={true}
                labelPlacement="outside-left"
                variant="bordered"
                label={supplierColumns[1].label}
                value={supplier.compName}
              />
            </div>
            <Input
              className="text-zinc-400 block"
              isReadOnly
              color="secondary"
              endContent={true}
              size="sm"
              fullWidth={true}
              labelPlacement="outside-left"
              variant="underlined"
              label={supplierColumns[3].label}
              value={supplier.compEmail || " "}
            />

            <Textarea
              className="text-zinc-400 block"
              isReadOnly
              // color="default"
              endContent={true}
              size="sm"
              fullWidth={true}
              labelPlacement="outside-left"
              variant="bordered"
              label={supplierColumns[4].label}
              value={supplier.compAddress || " "}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SupplierDetailsPage;
