import { db } from "../db/connection";
import {
  customerSales,
  customers,
  transactionType,
  company,
  users,
} from "@/drizzle/schema";
import SalesTable from "./SalesTable";
import { sql, eq, or, desc, Query } from "drizzle-orm";

const page = async () => {
  const salesData: any[] = await db
    .select({
      saleId: customerSales.saleId,
      recieptNo: customerSales.recieptNo,
      // custId: customers.custUId,
      // name: customers.custFname,
      custId: sql<string>`CONCAT(customers.cust_fname, " ", customers.cust_lname)`,
      // fullName: Query.CONCAT,
      compId: company.compName,
      userId: users.userName,
      transTypeId: transactionType.typeName,
      amount: customerSales.amount,
      payment: customerSales.payment,
      balance: customerSales.balance,
      saleDate: customerSales.saleDate,
      remarks: customerSales.remarks,
    })
    .from(customerSales)
    .innerJoin(customers, eq(customerSales.custId, customers.custId))
    .innerJoin(company, eq(customerSales.compId, company.compId))
    .innerJoin(
      transactionType,
      eq(customerSales.transTypeId, transactionType.typeId),
    )
    .innerJoin(users, eq(customerSales.userId, users.userId))
    .orderBy(desc(customerSales.saleId));
  // db
  //   .select()
  //   .from(schema.customerSales);
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
