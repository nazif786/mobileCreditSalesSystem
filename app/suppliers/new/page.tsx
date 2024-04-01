import EmpForm from "@/app/employees/_components/EmpForm";
import React from "react";
import SupplierForm from "../_components/SupplierForm";

const page = () => {
  return (
    <>
      <div className="mb-12 ml-5 text-center">
        <h2 className="prose md:prose-lg lg:prose-2xl font-sans font-bold  text-zinc-500">
          Register New Supplier
        </h2>
      </div>
      <SupplierForm />
    </>
  );
};

export default page;
