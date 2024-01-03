import type { Config } from "drizzle-kit";
import process from "process";



export default {
  schema: "./drizzle/schema.ts",
  out: "./drizzle",
  driver: 'mysql2',
  dbCredentials: {
    uri: process.env.DB_URL!,
  }
} satisfies Config;

// run these after each change in database 
// npx drizzle-kit introspect:mysql 
// npx drizzle-kit generate:mysql
// npx drizzle-kit drop