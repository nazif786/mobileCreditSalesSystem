import { db } from "@/app/db/connection";
import { custInsertSchema } from "@/app/db/validationSchema";
import * as schema from "@/drizzle/schema";
import { eq, ne, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const body = await request.json();

    const validData = custInsertSchema.safeParse(body);

    if (!validData.success)
      return NextResponse.json(validData.error.format(), { status: 201 });

    const Mobile = body.custMobile;
    const Email = body.custEmail;
    const uId = body.custUId;
    // console.log("this is id", params.id);
    // console.log(typeof cid);
    const result = await db
      .select({
        uid: schema.customers.custUId,
        email: schema.customers.custEmail,
        mobile: schema.customers.custMobile,
      })
      .from(schema.customers)
      .where(ne(schema.customers.custId, parseInt(params.id)));

    // check if Uid is taken
    const isUIdExist = result.some((cust) => cust.uid === uId);
    if (isUIdExist) {
      return NextResponse.json(
        { message: "Customer Unique ID already registered" },
        { status: 409 },
      );
    }
    // check if mobile no is taken
    const isMobileNumberExists = result.some((cust) => cust.mobile === Mobile);
    if (isMobileNumberExists) {
      return NextResponse.json(
        { message: "Mobile number already registered" },
        { status: 409 },
      );
    }
    // check if email already exist
    const isEmialExists = result.some((cust) => cust.email === Email);
    if (isEmialExists) {
      return NextResponse.json(
        { message: "Email address already registered" },
        { status: 409 },
      );
    }

    // Update customer Info
    // const updateData = await db.update(schema.customers).set({
    //   // custUId: body.uId,
    //   // custFname: body.custFname,
    //   // custLname: body.custLname,
    //   // custComi: body.custComi,
    //   custMobile: body.custMobile,
    //   // custEmail: body.custEmail,
    //   // custAddress: body.custAddress,
    // });
    console.log(body);
    const updateData = await db.execute(
      sql`UPDATE employeedb.customers SET 
          cust_u_id = ${body.custUId}, 
          cust_fname = ${body.custFname},
          cust_lname = ${body.custLname},
          cust_comi = ${body.custComi},
          cust_mobile = ${body.custMobile},
          cust_email = ${body.custEmail},
          cust_address = ${body.custAddress}
          WHERE (cust_id = ${parseInt(params.id)});`,
    );

    // console.log(updateData);
    return NextResponse.json(updateData);
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message });
  }
}
