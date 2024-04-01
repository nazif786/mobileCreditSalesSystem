import { db } from "@/app/db/connection";
import { supplierInsertSchema } from "@/app/db/validationSchema";
import { NextRequest, NextResponse } from "next/server";
import * as schema from "@/drizzle/schema";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validData = supplierInsertSchema.safeParse(body);

    if (!validData.success) {
      return NextResponse.json(
        { error: validData.error.format() },
        { status: 404 },
      );
    }

    const supplierName = body.compName;
    const supplierMobile = body.compMobile;
    const supplierEmail = body.compEmail;

    const result = await db
      .select({
        name: schema.company.compName,
        mobile: schema.company.compMobile,
        email: schema.company.compEmail,
      })
      .from(schema.company);

    console.log(result);
    //   check if UId already exists
    const isNameExist = result.some(
      (supplier) => supplier.name === supplierName,
    );

    if (isNameExist) {
      return NextResponse.json(
        { message: "Supplier Name already registered" },
        { status: 409 },
      );
    }

    //   check if mobile number exists
    const isMobileNumberExists = result.some(
      (sup) => sup.mobile === supplierMobile,
    );

    // if true return error message
    if (isMobileNumberExists) {
      return NextResponse.json(
        { message: "Mobile number already registered" },
        { status: 409 },
      );
    }
    // check if email address exists
    const isEmailExists = result.some((sup) => sup.email === supplierEmail);
    if (isEmailExists) {
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
    const data = await db.insert(schema.company).values(body);
    return NextResponse.json({ data });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message });
  }
}
