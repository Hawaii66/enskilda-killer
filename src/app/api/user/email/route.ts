import { validateToken } from "@/functions/verifyToken";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");
  const result = await validateToken(token || "");
  if (!result) {
    return NextResponse.json({}, { status: 400 });
  }

  return NextResponse.json(result);
};
