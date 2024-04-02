import { db } from "@/app/db/connection";
import { supplierInsertSchema } from "@/app/db/validationSchema";
import { company } from "@/drizzle/schema";
import { eq, ne } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const emp = await db
      .selectDistinct()
      .from(company)
      .where(eq(company.compId, parseInt(params.id)));

    if (!emp)
      return NextResponse.json({ error: "invalid supplier" }, { status: 404 });

    await db.delete(company).where(eq(company.compId, parseInt(params.id)));
    return NextResponse.json({});
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const body = await request.json();
    const validDta = supplierInsertSchema.safeParse(body);

    if (!validDta.success)
      return NextResponse.json(validDta.error.format(), { status: 400 });

    const supplierName = body.compName;
    const supplierMobile = body.compMobile;
    const supplierEmail = body.compEmail;

    const result = await db
      .select({
        name: company.compName,
        mobile: company.compMobile,
        email: company.compEmail,
      })
      .from(company)
      .where(ne(company.compId, parseInt(params.id)));

    //   console.log(body);
    //   console.log(result);
    // check if tazkira id already registered to other employee
    const isName = result.some((company) => company.name === supplierName);

    if (isName) {
      return NextResponse.json(
        { message: "Supplier name already registered" },
        { status: 409 },
      );
    }
    // check if mobile already registered to other employee
    const isMobileNumberExists = result.some(
      (company) => company.mobile === supplierMobile,
    );
    if (isMobileNumberExists) {
      return NextResponse.json(
        { message: "Mobile number already registered" },
        { status: 409 },
      );
    }
    // check if email id already registered to other employee
    const isEmailExists = result.some(
      (company) => company.email === supplierEmail,
    );
    if (isEmailExists) {
      return NextResponse.json(
        { message: "Email address already registered" },
        { status: 409 },
      );
    }
    // console.log(body);
    const updatedSupplier = await db
      .update(company)
      .set({
        compName: body.compName,
        compMobile: body.compMobile,
        compEmail: body.compEmail,
        compAddress: body.compAddress,
      })
      .where(eq(company.compId, parseInt(params.id)));
    return NextResponse.json(updatedSupplier);
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message });
  }
}
