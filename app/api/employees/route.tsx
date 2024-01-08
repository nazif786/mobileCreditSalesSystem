import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/db/connection";
import * as schema from "@/drizzle/schema";
import { empInsertSchema } from "@/app/db/validationSchema";

export async function GET(request: NextRequest) {
  try {
    const emp = await db.select().from(schema.employees);
    return NextResponse.json({ emp }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ err: err.message });
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

    // check if tazkira Id already exists
    const isTazkiraExist = result.some(
      (employee) => employee.tazkiraDB === empTazkira,
    );

    if (isTazkiraExist) {
      return NextResponse.json(
        { message: "Tazkira holder already registered" },
        { status: 409 },
      );
    }

    // chec if mobile number exists
    const isMobileNumberExists = result.some(
      (employee) => employee.mobile === empMobile,
    );

    // if true return error message
    if (isMobileNumberExists) {
      return NextResponse.json(
        { message: "Mobile number already registered" },
        { status: 409 },
      );
    }
    // check if email address exists
    const isEmialExists = result.some(
      (employee) => employee.email === empEmail,
    );
    if (isEmialExists) {
      return NextResponse.json(
        { message: "Email address already registered" },
        { status: 409 },
      );
    }

    // if (result.length > 0) {
    //   return NextResponse.json(
    //     { message: "tazkera number already registered" },
    //     { status: 409 },
    //   );
    // }
    const data = await db.insert(schema.employees).values(body);
    return NextResponse.json({ data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
