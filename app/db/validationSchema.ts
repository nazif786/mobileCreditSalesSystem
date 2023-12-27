import { createInsertSchema } from 'drizzle-valibot';
import {employees} from './schema'

export const insertEmpSchema = createInsertSchema(employees);
