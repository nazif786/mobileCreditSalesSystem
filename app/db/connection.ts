import * as schema from '../../drizzle/schema';
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import process from 'process';
// require('dotenv').config()

export const connection = await mysql.createConnection({uri:process.env.DB_URL});

export const db = drizzle(connection, { schema, mode: 'default' });








