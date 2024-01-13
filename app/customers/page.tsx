import { Button, Link } from "@nextui-org/react";
import { db } from "../db/connection";
import { customers } from "@/drizzle/schema";
import CustomersTable from "./components/CustomersTable";

const Customers = async () => {
  const custData: any[] = await db.select().from(customers);
  return (
    <>
      <div>Customers</div>
      <Button>
        <Link href="/customers/new">Register new customer </Link>
      </Button>

      <br />
      <hr />
      <CustomersTable custData={custData} />
    </>
  );
};

export default Customers;
