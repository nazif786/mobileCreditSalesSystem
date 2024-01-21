import { db } from "@/app/db/connection";
import { custInsertSchema } from "@/app/db/validationSchema";
import { NextRequest, NextResponse } from "next/server";
import * as schema from "@/drizzle/schema";

export async function GET(request: NextRequest) {
  try {
    const cust = await db.select().from(schema.customers);
    return NextResponse.json({ cust }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ err: err.message });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validData = custInsertSchema.safeParse(body);

    if (!validData.success) {
      return NextResponse.json(
        { error: validData.error.format() },
        { status: 201 },
      );
    }

    const custMobile = body.custMobile;
    const custEmail = body.custEmail;
    const uId = body.custUId;

    const result = await db
      .select({
        uid: schema.customers.custUId,
        email: schema.customers.custEmail,
        mobile: schema.customers.custMobile,
      })
      .from(schema.customers);

    console.log(result);
    //   check if UId already exists
    const isUIdExist = result.some((cust) => cust.uid === uId);

    if (isUIdExist) {
      return NextResponse.json(
        { message: "Customer Unique ID already registered" },
        { status: 409 },
      );
    }

    //   check if mobile number exists
    const isMobileNumberExists = result.some(
      (cust) => cust.mobile === custMobile,
    );

    // if true return error message
    if (isMobileNumberExists) {
      return NextResponse.json(
        { message: "Mobile number already registered" },
        { status: 409 },
      );
    }
    // check if email address exists
    const isEmialExists = result.some((cust) => cust.email === custEmail);
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
    const data = await db.insert(schema.customers).values(body);
    return NextResponse.json({ data });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message });
  }
}
