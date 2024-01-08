import { datetime } from 'drizzle-orm/mysql-core';
import { employees } from '@/drizzle/schema';
import { createInsertSchema } from 'drizzle-zod';
import {z} from 'zod'

// export const empInsertSchema = z.object({
//     tazkiraId: z.string(),
//     fname: z.string().max(50, 'Name con not exceed 45 characters'),
//   });

export const empInsertSchema = createInsertSchema(employees, {
  id: z.number(), 
  tazkiraId: z.string({
    required_error: "Tazkra number is required",
  }).min(4,{ message: "Tazkra number must be 4 or more characters long" }).max(20, { message: "Tazkra number msut be 20 or fewer characters long" }),
  fname: z.string({
    required_error: "Name is required",
  }).min(4,{ message: "Name must be 4 or more characters long" }).max(45, { message: "Name must be 45 or fewer characters long" }),
  lname: z.string().max(45, { message: "last name must be 45 or fewer characters long" }),
  fatherName: z.string().max(45, { message: "father name msut be 45 or fewer characters long" }),
  jobTitle: z.string().min(1, {message: "Job title is required"}).max(45, { message: "father name msut be 45 or fewer characters long" }),
  mobile: z.string({required_error: "Mobile number is required",}).min(10, {message:"enter correct mobile number"}).max(15, { message: "mobile number must be 15 or fewer characters long" }),
  email: z.string().email({ message: "Please enter a valid email address." }).optional(),
  address: z.string().max(255, { message: "Address must be 255 or fewer characters long" }),
  regDate:  z.string(),
  status: z.coerce.string(),
});
// z.coerce.date().max(new Date()),