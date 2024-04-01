import { db } from "@/app/db/connection";
import { company } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import SupplierDetailsPage from "./SupplierDetailsPage";
import { notFound } from "next/navigation";

const page = async ({ params }: { params: { id: string } }) => {
  const supplier = await db
    .select()
    .from(company)
    .where(eq(company.compId, parseInt(params.id)));

  // console.log("supplier data", supplier);

  if (!supplier) notFound();
  return (
    <>
      <h1 className="prose mb-7 text-zinc-600 text-center">
        Supplier Details Page
      </h1>
      <div className="bg-white min-h-full rounded-lg shadow-md p-1 md:mx-auto md:p-5 md:w-[85%] lg:w-[65%]">
        <SupplierDetailsPage supplier={supplier[0]} />
      </div>
    </>
  );
};

export default page;
