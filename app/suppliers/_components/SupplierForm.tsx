"use client";
import Alerts from "@/app/components/ui/Aterts";
import DangerAlert from "@/app/components/ui/DangerAlert";
import Spinner from "@/app/components/ui/Spinner";
import {
  empInsertSchema,
  supplierInsertSchema,
} from "@/app/db/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Input, Radio, RadioGroup, Textarea } from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { MailIcon } from "../../components/ui/MailIcon";
import { UserIcon } from "../../components/ui/UserIcon";
import { InsertSupplier } from "@/drizzle/schema";
interface ValidationError {
  message: string;
  errors: Record<string, string[]>;
}

type supplierSchema = z.infer<typeof supplierInsertSchema>;

const SupplierForm = ({ supplierData }: { supplierData?: InsertSupplier }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<supplierSchema>({ resolver: zodResolver(supplierInsertSchema) });

  const router = useRouter();
  const [error, setError] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log("submit Called");
      setIsSubmitting(true);
      if (supplierData)
        await axios.patch(`/api/suppliers/${supplierData.compId}`, data);
      else await axios.post("/api/suppliers", data);
      // console.log(res.status);

      router.push("/suppliers");
    } catch (error: any) {
      setIsSubmitting(false);
      //console.log(error.message); // it shows 500 code error
      // console.log(error.response.message);   // shows undefined
      setError(error.response.data.message); // gies axios error
      // console.log(error.response.data);  // not axios
      // console.log(error.response.data.error); // not axios: endefined
    }
  });

  return (
    <section className="">
      <div
        className="mt-7 p-2 md:p-10 lg:relative
       bg-white shadow-md rounded-md md:w-4/6 m-auto"
      >
        <div
          className=" mx-auto p-5 px-3 lg:absolute -top-5 lg:mr-7
          bg-gradient-to-r from-blue-800 to-indigo-900 shadow-slate-400  rounded-lg  shadow-md "
        >
          <h2 className="prose md:prose-lg lg:prose-2xl font-sans text-zinc-50">
            Register New Employee
          </h2>
          <p className="text-zinc-300 ">
            To Register new supplier fill the required fields. Supplier Name and
            mobile number are required fields.
          </p>
        </div>
        <div className="relative mt-20">
          {/* ------------- Form -***********************************------------- */}
          <div className="mb-3">
            {error && <Alerts alertName="danger" alertMessage={error} />}
          </div>
          <form className=" max-w-xl space-y-5 " onSubmit={onSubmit}>
            <Input
              defaultValue={supplierData?.compName}
              size="sm"
              type="text"
              label="Company Name"
              {...register("compName")}
            />
            <DangerAlert>{errors.compName?.message}</DangerAlert>

            <Input
              defaultValue={supplierData?.compMobile}
              size="sm"
              type="tel"
              label="Mobile Number"
              {...register("compMobile")}
            />
            <DangerAlert>{errors.compMobile?.message!}</DangerAlert>
            <Input
              defaultValue={supplierData?.compEmail!}
              size="md"
              type="email"
              label="Email"
              startContent={
                <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
              {...register("compEmail")}
            />

            <DangerAlert>{errors.compEmail?.message}</DangerAlert>

            <Textarea
              defaultValue={supplierData?.compAddress!}
              size="sm"
              type="text"
              label="Adress"
              {...register("compAddress")}
            />
            <DangerAlert>{errors.compAddress?.message!}</DangerAlert>
            <Button
              disabled={isSubmitting}
              type="submit"
              color="primary"
              className="bg-gradient-to-r from-blue-800 to-indigo-900"
              size="lg"
              startContent={<UserIcon />}
            >
              {supplierData ? "Update Supplier Info" : "Save New Supplier"}

              {isSubmitting && <Spinner />}
            </Button>
          </form>{" "}
        </div>
      </div>
    </section>
  );
};

export default SupplierForm;
