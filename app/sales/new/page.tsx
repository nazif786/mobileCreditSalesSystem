"use client";
import { Button, Input } from "@nextui-org/react";
import { useRef } from "react";

const page = () => {
  const id = useRef<HTMLInputElement>(null);
  // const custData: SelectCustomer[] = await db.select().from(customers);
  const saleId = id.current?.value;

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
