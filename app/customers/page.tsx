import { Button, Link } from "@nextui-org/react";
import { db } from "../db/connection";
import { customers } from "@/drizzle/schema";
import CustomersTable from "./components/CustomersTable";
import delay from "delay";

const Customers = async () => {
  const custData: any[] = await db.select().from(customers);
  await delay(2000);
  return (
    <>
      <h1 className="text-center">Customers</h1>
      <div className=" className=" text-sm>
        <CustomersTable custData={custData} />
      </div>
    </>
  );
};

export default Customers;
