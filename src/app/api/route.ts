import { validateToken } from "@/functions/verifyToken";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");

  const t = await validateToken(token || "");

  return NextResponse.json({
    token: t,
  });
};
