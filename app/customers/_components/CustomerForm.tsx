"use client";
import DangerAlert from "@/app/components/ui/DangerAlert";
import { UserIcon } from "@/app/components/ui/UserIcon";
import { custInsertSchema } from "@/app/db/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Textarea } from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Alerts from "@/app/components/ui/Aterts";
import Spinner from "@/app/components/ui/Spinner";
import CustFormText from "./NewCustFormText";
import { InsertCustomer } from "@/drizzle/schema";

type CustShema = z.infer<typeof custInsertSchema>;

interface Props {
  custData: InsertCustomer;
}

const page = ({ customer }: { customer?: InsertCustomer }) => {
  const [error, setError] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  // console.log(customer);
  // console.log("here is id ", customer?.custId);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CustShema>({ resolver: zodResolver(custInsertSchema) });

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);

      if (customer)
        await axios.patch(`/api/customers/${customer.custId}`, data);
      else await axios.post("/api/customers", data);

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
        <div className="flex-col mt-7 md:bg-white rounded-md md:py-7 md:w-[90%] lg:w-[65%] mx-auto">
          <CustFormText />
          <div className="my-7 mx-3">
            {error && <Alerts alertName="danger" alertMessage={error} />}
            <form
              onSubmit={onSubmit}
              className="md:w-[70%] md:m-auto space-y-5 flex-col"
            >
              <Input
                defaultValue={customer?.custUId}
                size="sm"
                type="text"
                label="Customer unique ID"
                {...register("custUId")}
              />
              <DangerAlert>{errors.custUId?.message}</DangerAlert>
              <Input
                defaultValue={customer?.custComi}
                size="sm"
                type="number"
                label="Commission Percentage (number)"
                {...register("custComi", {
                  valueAsNumber: true,
                })}
              />
              <DangerAlert>{errors.custComi?.message}</DangerAlert>

              <Input
                defaultValue={customer?.custFname}
                size="sm"
                type="text"
                label="First Name"
                {...register("custFname")}
              />
              <DangerAlert>{errors.custFname?.message}</DangerAlert>

              <Input
                defaultValue={customer?.custLname}
                size="sm"
                type="text"
                label="Last Name"
                {...register("custLname")}
              />
              <DangerAlert>{errors.custLname?.message}</DangerAlert>
              <Input
                defaultValue={customer?.custMobile}
                size="sm"
                type="tel"
                label="Mobile Number"
                {...register("custMobile", {
                  valueAsNumber: true,
                })}
              />
              <DangerAlert>{errors.custMobile?.message}</DangerAlert>
              <Input
                defaultValue={customer?.custEmail!}
                size="sm"
                type="email"
                label="Email Adress"
                {...register("custEmail")}
              />
              <DangerAlert>{errors.custEmail?.message}</DangerAlert>
              <Textarea
                defaultValue={customer?.custAddress!}
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
                {customer ? "Update Customer Info" : "Save New Customer"}
                {isSubmitting && <Spinner />}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
