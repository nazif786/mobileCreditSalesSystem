import { db } from "../db/connection";
import * as schema from "@/drizzle/schema";
import EmployeesTable from "./EmployeesTable";

const Employees = async () => {
  const empData: any[] = await db.select().from(schema.employees);
  return (
    <>
      <div className="bg-gradient-to-r from-fuchsia-700 to-fuchsia-800 px-3 pl-7 py-7 text-bold text-background">
        <h1>Employees</h1>
      </div>
      {/* eslint: ignore error */}
      <EmployeesTable empData={empData} />
      {/* <Dummy /> */}
    </>
  );
};

export default Employees;
