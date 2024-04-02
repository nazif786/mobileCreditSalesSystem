import { db } from "@/app/db/connection";
import { company, employees } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import React from "react";
import SupplierForm from "../../_components/SupplierForm";

const EditEmployeePage = async ({ params }: { params: { id: string } }) => {
  const supplierData = await db
    .select()
    .from(company)
    .where(eq(company.compId, parseInt(params.id)));
  if (!supplierData) notFound();
  return (
    <>
      <div className="mb-12 ml-5 text-center">
        <h2 className="prose md:prose-lg lg:prose-2xl font-sans font-bold  text-zinc-500">
          Edit Employee Information
        </h2>
        <SupplierForm supplierData={supplierData[0]} />
      </div>
    </>
  );
};

export default EditEmployeePage;
