import { db } from "@/app/db/connection";
import { customers } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import CustomerDetails from "./CustomerDetails";

const page = async ({ params }: { params: { id: string } }) => {
  const customer = await db
    .select()
    .from(customers)
    .where(eq(customers.custId, parseInt(params.id)));
  if (!customer) notFound();

  return (
    <>
      <h1 className="prose mb-7 text-zinc-600 text-center">Customer Details</h1>
      <div className="bg-white min-h-full rounded-lg shadow-md p-1 md:mx-auto md:p-5 md:w-[85%] lg:w-[65%]">
        <CustomerDetails customer={customer[0]} />
      </div>
    </>
  );
};
41;
export default page;
