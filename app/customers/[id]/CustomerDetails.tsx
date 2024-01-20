import { custInsertSchema } from "@/app/db/validationSchema";
import { SelectCustomer } from "@/drizzle/schema";
import React from "react";

const CustomerDetails = ({ customer }: { customer: SelectCustomer }) => {
  return (
    <div className="relative w-[100%]">
      <div className="md:absolute md:-mt-10 min-w-full p-5 md:bg-gradient-to-r from-violet-700 to-violet-800 md:shadow-slate-400  rounded-lg  md:shadow-md">
        <h1 className=" prose text-xl font-extrabold text-center md:text-zinc-50">
          Customer Information
        </h1>
      </div>
      <div className="relative md:pt-16 md:flex pb-10">
        <div className="bg-red-50 md:flex-grow-0 md:p-10 text-center justify-center">
          <h3 className="text-xl font-thin text-zinc-800">
            {customer.custFname} {customer.custLname}
          </h3>
          <text className="text-zinc-500">
            <a href={`mailto:${customer.custEmail}`}> {customer.custEmail}</a>
          </text>
        </div>
        <div className="flex-grow md:p-5">
          <p>{customer.custId}</p>
          <p>{customer.custUId}</p>
          <p>{customer.custMobile}</p>

          <p>
            {customer.custComi}
            {"%"}
          </p>
          <p>{customer.custRegDate?.toString().split(" ")[0]}</p>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
