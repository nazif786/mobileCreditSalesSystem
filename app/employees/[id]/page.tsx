import { db } from "@/app/db/connection";
import { employees } from "@/drizzle/schema";
import React from "react";
import { eq } from "drizzle-orm";
import EmployeesDetailsPage from "./EmployeesDetailsPage";
import { notFound } from "next/navigation";

const page = async ({ params }: { params: { id: string } }) => {
  const employee = await db
    .select()
    .from(employees)
    .where(eq(employees.id, parseInt(params.id)));

  if (!employee) notFound();
  return (
    <>
      <h1 className="prose mb-7 text-zinc-600 text-center">
        Emplyees Details Page
      </h1>
      <div className="bg-white min-h-full rounded-lg shadow-md p-1 md:mx-auto md:p-5 md:w-[85%] lg:w-[65%]">
        <EmployeesDetailsPage employee={employee[0]} />
      </div>
    </>
  );
};

export default page;
