import { db } from "@/app/db/connection";
import { employees } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import React from "react";
import EmpForm from "../../_components/EmpForm";

const EditEmployeePage = async ({ params }: { params: { id: string } }) => {
  const employeeData = await db
    .select()
    .from(employees)
    .where(eq(employees.id, parseInt(params.id)));
  if (!employeeData) notFound();
  return (
    <>
      <div className="mb-12 ml-5 text-center">
        <h2 className="prose md:prose-lg lg:prose-2xl font-sans font-bold  text-zinc-500">
          Edit Employee Information
        </h2>
        <EmpForm employeeData={employeeData[0]} />
      </div>
    </>
  );
};

export default EditEmployeePage;
