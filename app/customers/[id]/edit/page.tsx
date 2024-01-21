import React from "react";
import CustomerForm from "../../_components/CustomerForm";
import { db } from "@/app/db/connection";
import { customers } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

const EditCustomerPage = async ({ params }: Props) => {
  const customer = await db
    .select()
    .from(customers)
    .where(eq(customers.custId, parseInt(params.id)));
  // console.log(customer);

  if (!customer) notFound();

  return (
    <section>
      <div>Edit Customer Detils</div>
      <CustomerForm customer={customer[0]} />
    </section>
  );
};

export default EditCustomerPage;
