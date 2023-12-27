import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
  const body = request.body;

  return NextResponse.json([
    { id: 1, name: "Ahmad" },
    { id: 2, name: "shah" },
  ]);
}
