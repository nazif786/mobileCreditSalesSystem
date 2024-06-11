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

  // console.log(employee);
  if (!employee) notFound();
  return (
    <>
      <h1 className="prose mb-7 text-center text-zinc-600">
        Employees Details Page
      </h1>
      <div className="min-h-full rounded-lg bg-white p-1 shadow-md md:mx-auto md:w-[85%] md:p-5 lg:w-[65%]">
        <EmployeesDetailsPage employee={employee[0]} />
      </div>
    </>
  );
};

export default page;
