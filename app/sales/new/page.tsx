"use client";
// import { db } from "@/app/db/connection";
import { db } from "../../db/connection";

import { customers, SelectCustomer } from "@/drizzle/schema";
import { Button, Input } from "@nextui-org/react";
import { eq, or } from "drizzle-orm";
import { FormEvent, useRef, useState } from "react";

const page = () => {
  const [customerID, setCustomerID] = useState<string | undefined>(undefined);

  const idRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const getId = (e: FormEvent) => {
    e.preventDefault();
    const customerIDValue = idRef.current?.value;
    setCustomerID(customerIDValue);

    // Clear the input field after submission
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  console.log(customerID);

  return (
    <div className="m-auto mt-12 flex max-w-2xl flex-col gap-3 px-3">
      <div className="font-semibold text-green-800" color="success">
        Select Customer Sale
      </div>
      <form onSubmit={getId} ref={formRef}>
        <Input
          ref={idRef}
          placeholder="enter customer name or id"
          required
          color="success"
          type="text"
          className="font-semibold"
        />
        <Button type="submit" color="success" className="float-right mt-3">
          Search Customer
        </Button>
      </form>
      <div></div>
    </div>
  );
};
export default page;
