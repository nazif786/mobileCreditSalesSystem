import { db } from "../db/connection";
import * as schema from "@/drizzle/schema";
import SalesTable from "./SalesTable";

const page = async () => {
  const salesData = await db.select().from(schema.customerSales);
  // [#3c096c]
  console.log(salesData);
  return (
    <section className="mx-1">
      <div className="bg-gradient-to-r from-emerald-950 to-emerald-800 py-7 px-3 pl-7 font-semibold text-background text-xl rounded-md">
        Sales Information
      </div>
      <div>
        <SalesTable salesData={salesData} />
      </div>
    </section>
  );
};

export default page;
