import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/db/connection";
import * as schema from "@/drizzle/schema";
import { empInsertSchema } from "@/app/db/validationSchema";

export async function GET(request: NextRequest) {
  try {
    const emp = await db.select().from(schema.employees);
    return NextResponse.json({ emp }, { status: 200 });
  } catch (err: any) {
    console.log(err.message);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validData = empInsertSchema.safeParse(body);

    if (!validData.success) {
      return NextResponse.json(
        { error: validData.error.format() },
        { status: 201 },
      );
    }

    const empMobile = body.mobile;
    const empEmail = body.email;
    const empTazkira = body.tazkiraId;

    const result = await db
      .select({
        email: schema.employees.email,
        mobile: schema.employees.mobile,
        tazkiraDB: schema.employees.tazkiraId,
      })
      .from(schema.employees);

    // chec if mobile number exists


    if (result.length > 0) {
      return NextResponse.json(
        { message: "tazkera number already registered" },
        { status: 409 },
      );
    }
    const data = await db.insert(schema.employees).values(body);
    return NextResponse.json({ data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
