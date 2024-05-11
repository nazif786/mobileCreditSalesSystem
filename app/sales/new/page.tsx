"use client";
// import { db } from "@/app/db/connection";
import { db } from "../../db/connection";

import { customers, SelectCustomer } from "@/drizzle/schema";
import { Button, Input } from "@nextui-org/react";
import { eq, or } from "drizzle-orm";
import { notFound } from "next/navigation";
import { useRef } from "react";

const page = () => {
  const id = useRef<HTMLInputElement>(null);
  const custId = id.current?.value;
  // if (!custId) return notFound();
  // const custData: SelectCustomer[] = await db
  //   .select()
  //   .from(customers)
  //   .where(
  //     or(
  //       eq(customers.custUId, custId),
  //       eq(customers.custFname, custId),
  //       eq(customers.custLname, custId),
  //     ),
  //   );
  // console.log(custData);
  return (
    <>
      <form>
        <Input ref={id} required />
        <Button type="submit">Search Customer </Button>
      </form>
      <div>select Customer Sale</div>
    </>
  );
};
export default page;
