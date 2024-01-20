import { z } from "zod";

// export const empInsertSchema = z.object({
//     tazkiraId: z.string(),
//     fname: z.string().max(50, 'Name con not exceed 45 characters'),
//   });

const emptyStringToUndefined = z.literal("").transform(() => undefined);

export function asOptionalField<T extends z.ZodTypeAny>(schema: T) {
  return schema.optional().or(emptyStringToUndefined);
}

export const empInsertSchema = z.object({
  id: z.number().optional(),
  tazkiraId: z
    .string({ required_error: "Tazkra number is required" })
    .trim()
    .min(4, { message: "Tazkra number must be 4 or more characters long" })
    .max(20, { message: "Tazkra number must be 20 or fewer characters long" }),
  fname: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(4, { message: "Name must be 4 or more characters long" })
    .max(45, { message: "Name must be 45 or fewer characters long" }),
  lname: z
    .string()
    .trim()
    .max(45, { message: "last name must be 45 or fewer characters long" })
    .optional(),
  fatherName: z
    .string()
    .trim()
    .max(45, { message: "father name msut be 45 or fewer characters long" })
    .optional(),
  jobTitle: z
    .string()
    .trim()
    .min(1, { message: "Job title is required" })
    .max(45, { message: "father name msut be 45 or fewer characters long" }),
  mobile: z
    .string({ required_error: "Mobile number is required" })
    .min(10, { message: "enter correct mobile number" })
    .max(15, { message: "mobile number must be 15 or fewer characters long" }),
  email: z.string().email().optional().or(z.literal("")),
  address: z
    .string()
    .max(255, { message: "Address must be 255 or fewer characters long" }),
  regDate: z.string().datetime().optional(),
  status: z.coerce.string().optional(),
});
// z.coerce.date().max(new Date()),

export const custInsertSchema = z.object({
  custId: z.number().optional(),
  custUId: z
    .string({ required_error: "Customer Unique ID is required" })
    .trim()
    .min(3, { message: "Customer Unique ID must be 3 or more charactors" })
    .max(15, { message: "must not exceed 15 charactors" }),
  custComi: z
    .number({
      required_error: "Commission percentage is required",
      invalid_type_error: "Commission must be a number",
    })
    .positive({ message: "Commission must be a positive number" })
    .lte(100, { message: "Commission can not be more than 100 percent" }),
  custFname: z
    .string({ required_error: "Customer name is required" })
    .trim()
    .min(3, { message: "Customer First Name must be 3 or more charactors" })
    .max(45, { message: "must not exceed 45 charactors" }),
  custLname: z
    .string()
    .trim()
    .max(45, { message: "must not exceed 45 charactors" })
    .optional(),
  custMobile: z.number({
    required_error: "Mobile Number is required",
    invalid_type_error: "Provie a correct mobile number",
  }),
  custEmail: asOptionalField(z.string().email()),
  custAddress: z
    .string()
    .max(255, { message: "must not exceed 255 charactors" })
    .optional(),
  custRegDate: z.string().datetime().optional(),
});
