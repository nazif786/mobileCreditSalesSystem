import React from "react";
import { Button } from "@nextui-org/button";
import { Input, Radio, RadioGroup } from "@nextui-org/react";
import { MailIcon } from "../../components/ui/MailIcon";
import { UserIcon } from "../../components/ui/UserIcon";

const page = () => {
  return (
    <div className="">
      <div className="mb-12">
        <h2 className="prose md:prose-lg lg:prose-2xl font-sans font-bold  text-zinc-500">
          New Emplyee Form
        </h2>
      </div>

      <div
        className="mt-7 lg:p-10 md:relative
       bg-white shadow-md rounded-md "
      >
        <div
          className=" mx-auto p-5 px-3 md:absolute -top-5 
        bg-gradient-to-r from-fuchsia-700 to-fuchsia-800 shadow-slate-400  rounded-lg  shadow-md "
        >
          <h2 className="prose md:prose-lg lg:prose-2xl font-sans text-zinc-50">
            Register New Emplyee
          </h2>
          <p className="text-zinc-300 ">
            To Register new emplyee fill the required fields. Tazkira (ID)
            number, first Name and moblie number fields are mendatory.
          </p>
        </div>
        <div className="relative mt-28">
          <form className=" max-w-xl space-y-5 ">
            <Input size="sm" type="text" label="Tazkira Number" />
            <Input size="sm" type="text" label="First Name" />
            <Input size="sm" type="text" label="Father Name" />
            <Input size="sm" type="tel" label="Mobile Number" />
            <Input
              size="md"
              type="email"
              label="Email"
              startContent={
                <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
            />
            <Input size="sm" type="text" label="Adress" />
            <RadioGroup
              label="Emplyee Status"
              orientation="horizontal"
              className="border-1 p-5 rounded-md"
            >
              <Radio value="0" className="mr-3">
                current
              </Radio>
              <Radio value="1">former</Radio>
            </RadioGroup>
            <Button
              color="primary"
              className="bg-fuchsia-800"
              size="lg"
              startContent={<UserIcon />}
            >
              Save New Emplyee
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;
