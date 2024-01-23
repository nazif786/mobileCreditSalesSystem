import { db } from "@/app/db/connection";
import { empInsertSchema } from "@/app/db/validationSchema";
import { updateData } from "@/app/utils/apiUtils";
import { employees } from "@/drizzle/schema";
import { eq, ne } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const body = await request.json();
    const validDta = empInsertSchema.safeParse(body);

    if (!validDta.success)
      return NextResponse.json(validDta.error.format(), { status: 400 });

    const tId = body.tazkiraId;
    const Mobile = body.mobile;
    const Email = body.email;

    const result = await db
      .select({
        tazId: employees.tazkiraId,
        mobile: employees.mobile,
        email: employees.email,
      })
      .from(employees)
      .where(ne(employees.id, parseInt(params.id)));

    //   console.log(body);
    //   console.log(result);
    // check if tazkira id already registered to other employee
    const isTazkiraExist = result.some((employee) => employee.tazId === tId);

    if (isTazkiraExist) {
      return NextResponse.json(
        { message: "Tazkira holder already registered" },
        { status: 409 },
      );
    }
    // check if mobile already registered to other employee
    const isMobileNumberExists = result.some(
      (employee) => employee.mobile === Mobile,
    );
    if (isMobileNumberExists) {
      return NextResponse.json(
        { message: "Mobile number already registered" },
        { status: 409 },
      );
    }
    // check if email id already registered to other employee
    const isEmialExists = result.some((employee) => employee.email === Email);
    if (isEmialExists) {
      return NextResponse.json(
        { message: "Email address already registered" },
        { status: 409 },
      );
    }
    console.log(body);
    const updatedEmp = await db
      .update(employees)
      .set({
        tazkiraId: body.tazkiraId,
        fname: body.fname,
        lname: body.lname,
        fatherName: body.fatherName,
        jobTitle: body.jobTitle,
        mobile: body.mobile,
        email: body.email,
        address: body.address,
        status: body.status,
      })
      .where(eq(employees.id, parseInt(params.id)));
    return NextResponse.json(updatedEmp);
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message });
  }
}
