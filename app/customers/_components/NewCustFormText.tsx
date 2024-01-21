import React from "react";

const CustFormText = () => {
  return (
    <div className="p-1 md:text-zinc-100 md:w-[90%] md:m-auto md:p-3 md:bg-gradient-to-r from-violet-700 to-violet-800 shadow-slate-400  rounded-lg  shadow-md">
      <h1 className="prose md:prose-lg lg:prose-2xl md:text-white font-sans font-bold md:font-thin mb-1">
        Register New Customers
      </h1>
      <text>
        To register new customer, fill the required fields. required fields are:
        unique ID, Name, commission, and mobile number. commission is in
        percentage. only enter the number.
      </text>
    </div>
  );
};

export default CustFormText;
