import { db } from "../db/connection";
import * as schema from "@/drizzle/schema";
import EmployeesTable from "./EmployeesTable";
import delay from "delay";

const Employees = async () => {
  const empData: any[] = await db.select().from(schema.employees);
  await delay(2000);
  return (
    <>
      <div className=" mb-5 text-center text-2xl">
        <h1>Employees</h1>
      </div>
      {/* eslint: ignore error */}
      <EmployeesTable empData={empData} />
      {/* <Dummy /> */}
    </>
  );
};

export default Employees;
