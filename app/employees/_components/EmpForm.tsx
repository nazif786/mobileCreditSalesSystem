"use client";
import Alerts from "@/app/components/ui/Aterts";
import DangerAlert from "@/app/components/ui/DangerAlert";
import Spinner from "@/app/components/ui/Spinner";
import { empInsertSchema } from "@/app/db/validationSchema";
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
import { InsertEmployee } from "@/drizzle/schema";
interface ValidationError {
  message: string;
  errors: Record<string, string[]>;
}

type empSchema = z.infer<typeof empInsertSchema>;

const EmpForm = ({ employeeData }: { employeeData?: InsertEmployee }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<empSchema>({ resolver: zodResolver(empInsertSchema) });

  const router = useRouter();
  const [error, setError] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      if (employeeData)
        await axios.patch(`/api/employees/${employeeData.id}`, data);
      else await axios.post("/api/employees", data);
      // console.log(res.status);

      router.push("/employees");
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
        bg-gradient-to-r from-fuchsia-700 to-fuchsia-800 shadow-slate-400  rounded-lg  shadow-md "
        >
          <h2 className="prose md:prose-lg lg:prose-2xl font-sans text-zinc-50">
            Register New Employee
          </h2>
          <p className="text-zinc-300 ">
            To Register new employee fill the required fields. Tazkira (ID)
            number, first Name and mobile number fields are mandatory.
          </p>
        </div>
        <div className="relative mt-20">
          {/* ------------- Form -***********************************------------- */}

          <div className="mb-3">
            {error && <Alerts alertName="danger" alertMessage={error} />}
          </div>

          <form className=" max-w-xl space-y-5 " onSubmit={onSubmit}>
            <Input
              defaultValue={employeeData?.tazkiraId}
              size="sm"
              type="text"
              label="Tazkira Number"
              {...register("tazkiraId")}
            />
            <DangerAlert>{errors.tazkiraId?.message}</DangerAlert>

            <Input
              defaultValue={employeeData?.fname}
              size="sm"
              type="text"
              label="First Name"
              {...register("fname")}
            />
            <DangerAlert>{errors.fname?.message}</DangerAlert>
            <Input
              defaultValue={employeeData?.lname!}
              size="sm"
              type="text"
              label="Last Name"
              {...register("lname")}
            />
            <DangerAlert>{errors.lname?.message}</DangerAlert>
            <Input
              defaultValue={employeeData?.fatherName!}
              size="sm"
              type="text"
              label="Father Name"
              {...register("fatherName")}
            />
            <Input
              defaultValue={employeeData?.jobTitle}
              size="sm"
              type="text"
              label="Job Title"
              {...register("jobTitle")}
            />
            <DangerAlert>{errors.jobTitle?.message!}</DangerAlert>
            <Input
              defaultValue={employeeData?.mobile}
              size="sm"
              type="tel"
              label="Mobile Number"
              {...register("mobile")}
            />
            <DangerAlert>{errors.mobile?.message!}</DangerAlert>
            <Input
              defaultValue={employeeData?.email!}
              size="md"
              type="email"
              label="Email"
              startContent={
                <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
              {...register("email")}
            />

            <DangerAlert>{errors.email?.message}</DangerAlert>

            <RadioGroup
              defaultValue={employeeData?.status!.toString()}
              onSubmit={() => console.log(getSelection)}
              label="Employee Status"
              orientation="horizontal"
              className="border-1 p-5 rounded-md text-left"
              {...register("status")}
            >
              <Radio value="1" className="mr-3" checked>
                current
              </Radio>
              <Radio value={(0).toString()}>former</Radio>
            </RadioGroup>
            <DangerAlert>{errors.status?.message!}</DangerAlert>
            <Textarea
              defaultValue={employeeData?.address!}
              size="sm"
              type="text"
              label="Address"
              {...register("address")}
            />
            <DangerAlert>{errors.address?.message!}</DangerAlert>
            <Button
              disabled={isSubmitting}
              type="submit"
              color="primary"
              className="bg-fuchsia-800"
              size="lg"
              startContent={<UserIcon />}
            >
              {employeeData ? "Update Employee Info" : "Save New Employee"}

              {isSubmitting && <Spinner />}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EmpForm;
