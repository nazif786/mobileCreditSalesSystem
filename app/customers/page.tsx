import { Button, Link } from "@nextui-org/react";
import { db } from "../db/connection";
import { customers } from "@/drizzle/schema";
import CustomersTable from "./_components/CustomersTable";

const Customers = async () => {
  const custData: any[] = await db.select().from(customers);
  return (
    <>
      <h1 className="md:bg-gradient-to-r from-violet-700 to-violet-800 px-3 py-7 pl-7 font-bold rounded-md text-background">
        Customers
      </h1>
      <div className=" className=" text-sm>
        <CustomersTable custData={custData} />
      </div>
    </>
  );
};

export default Customers;
