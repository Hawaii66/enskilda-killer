import { emailToId } from "@/functions/emailToId";
import { VerifyWithEmail, validateToken } from "@/functions/verifyToken";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const email = await VerifyWithEmail(request);

  if (email) {
    return NextResponse.json({ email });
  }

  return NextResponse.json({}, { status: 400 });

  const url = new URL(request.url);
  const token = url.searchParams.get("token");
  const result = await validateToken(token || "");
  if (!result) {
    return NextResponse.json({}, { status: 400 });
  }

  return NextResponse.json(result);
};
