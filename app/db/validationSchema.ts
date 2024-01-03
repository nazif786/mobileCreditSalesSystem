import { employees } from '@/drizzle/schema';
import { createInsertSchema } from 'drizzle-zod';
import {z} from 'zod'

// export const empInsertSchema = z.object({
//     tazkiraId: z.string(),
//     fname: z.string().max(50, 'Name con not exceed 45 characters'),
//   });

export const empInsertSchema = createInsertSchema(employees, {
  tazkiraId: z.string({
    required_error: "Tazkra number is required",
  }).min(4,{ message: "Must be 4 or more characters long" }).max(20, { message: "Must be 20 or fewer characters long" }),
  fname: z.string({
    required_error: "Name is required",
  }).min(4,{ message: "Must be 4 or more characters long" }).max(45, { message: "Must be 45 or fewer characters long" }),
  lname: z.string().max(45, { message: "Must be 45 or fewer characters long" }),
  fatherName: z.string().max(45, { message: "Must be 45 or fewer characters long" }),
  mobile: z.string({required_error: "Mobile number is required",}).min(10, {message:"enter correct mobile number"}).max(15, { message: "Must be 15 or fewer characters long" }),
  email: z.string().email({ message: "Please enter a valid email address." }).optional(),
  address: z.string().max(255, { message: "Must be 255 or fewer characters long" }),
  regDate: z.coerce.date().max(new Date(), { message: "enter correct date" }), 
  status: z.coerce.boolean(),
});
