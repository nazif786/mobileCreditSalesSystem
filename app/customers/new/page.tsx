import React from "react";
import CustomerForm from "../_components/CustomerForm";

const page = () => {
  return (
    <>
      <h1 className="prose text-center font-sans font-bold text-zinc-500 md:prose-lg lg:prose-2xl">
        New Customer
      </h1>
      <CustomerForm />
    </>
  );
};
export default page;
