import React from "react";
import CustomerForm from "../_components/CustomerForm";

const page = () => {
  return (
    <>
      <h1 className="prose md:prose-lg lg:prose-2xl font-sans font-bold  text-zinc-500 text-center">
        New Customer
      </h1>
      <CustomerForm />
    </>
  );
};

export default page;
