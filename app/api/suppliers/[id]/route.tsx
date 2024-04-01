import { db } from "@/app/db/connection";
import { company } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
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
      return NextResponse.json({ error: "invalid employee" }, { status: 404 });

    await db.delete(company).where(eq(company.compId, parseInt(params.id)));
    return NextResponse.json({});
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message });
  }
}
