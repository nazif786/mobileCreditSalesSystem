import type { Config } from "drizzle-kit";
import process from "process";



export default {
  schema: "./app/db/schema.ts",
  out: "./drizzle",
  driver: 'mysql2',
  dbCredentials: {
    uri: process.env.DB_URL!,
  }
} satisfies Config;