import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/db/connection";
import * as schema from "@/drizzle/schema";
import { empInsertSchema } from "@/app/db/validationSchema";
import { AxiosError } from "axios";

export async function GET(request: NextRequest) {
  try {
    const emp = await db.select().from(schema.employees);
    return NextResponse.json({ emp }, { status: 200 });
  } catch (err: any) {
    console.log(err.message);
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validation = empInsertSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      { error: validation.error.format() },
      { status: 201 },
    );
  }

  await db.insert(schema.employees).values(body);

  return NextResponse.json({ status: 200 });
}
