import React from "react";
import SupplierTable from "./SupplierTable";
import { db } from "../db/connection";
import * as schema from "@/drizzle/schema";
import { SelectSupplier } from "@/drizzle/schema";

const page = async () => {
  const supplierData: SelectSupplier[] = await db.select().from(schema.company);

  return (
    <>
      <div className="bg-cyan-900 text-zinc-50 py-10 px-3">Suppliers page</div>
      <SupplierTable supplierData={supplierData} />
    </>
  );
};

export default page;
