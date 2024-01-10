"use client";
import DangerAlert from "@/app/components/ui/DangerAlert";
import { UserIcon } from "@/app/components/ui/UserIcon";
import { custInsertSchema } from "@/app/db/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Alerts from "@/app/components/ui/Aterts";
import Spinner from "@/app/components/ui/Spinner";

type CustShema = z.infer<typeof custInsertSchema>;

const page = () => {
  const [error, setError] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CustShema>({ resolver: zodResolver(custInsertSchema) });

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      const res = await axios.post("/api/customers", data);
      console.log(res);
      router.push("/customers");
    } catch (error: any) {
      setIsSubmitting(false);
      setError(error.response.data.message);
      console.log(error);
    }
  });
  return (
    <>
      <div className="m-auto p-2">
        <h1 className="prose md:prose-lg lg:prose-2xl font-sans font-bold  text-zinc-500 text-center">
          New Customer
        </h1>
        <div className="flex-col mt-7 md:bg-white rounded-md md:py-7 md:w-[90%] lg:w-[65%] mx-auto">
          <div className="p-1 md:text-zinc-100 md:w-[90%] md:m-auto md:p-3 md:bg-gradient-to-r from-violet-700 to-violet-800 shadow-slate-400  rounded-lg  shadow-md">
            <h1 className="prose md:prose-lg lg:prose-2xl md:text-white font-sans font-bold md:font-thin mb-1">
              Register New Customers
            </h1>
            <text>
              To register new customer, fill the required fields. required
              fields are: unique ID, Name, commission, and mobile number.
              commission is in percentage. only enter the number.
            </text>
          </div>
          <div className="my-7 mx-3">
            {error && <Alerts alertName="danger" alertMessage={error} />}
            <form
              onSubmit={onSubmit}
              className="md:w-[70%] md:m-auto space-y-5 flex-col"
            >
              <Input
                size="sm"
                type="text"
                label="Customer unique ID"
                {...register("custUId")}
              />
              <DangerAlert>{errors.custUId?.message}</DangerAlert>
              <Input
                size="sm"
                type="number"
                label="Commission Percentage (number)"
                {...register("custComi", {
                  valueAsNumber: true,
                })}
              />
              <DangerAlert>{errors.custComi?.message}</DangerAlert>

              <Input
                size="sm"
                type="text"
                label="First Name"
                {...register("custFname")}
              />
              <DangerAlert>{errors.custFname?.message}</DangerAlert>

              <Input
                size="sm"
                type="text"
                label="Last Name"
                {...register("custLname")}
              />
              <DangerAlert>{errors.custLname?.message}</DangerAlert>
              <Input
                size="sm"
                type="tel"
                label="Mobile Number"
                {...register("custMobile", {
                  valueAsNumber: true,
                })}
              />
              <DangerAlert>{errors.custMobile?.message}</DangerAlert>
              <Input
                size="sm"
                type="email"
                label="Email Adress"
                {...register("custEmail")}
              />
              <DangerAlert>{errors.custEmail?.message}</DangerAlert>
              <Input
                size="sm"
                type="text"
                label="Address or City Name"
                {...register("custAddress")}
              />
              <DangerAlert>{errors.custAddress?.message}</DangerAlert>
              <Button
                disabled={isSubmitting}
                type="submit"
                color="secondary"
                size="lg"
                startContent={<UserIcon />}
              >
                Save New Customer {isSubmitting && <Spinner />}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
