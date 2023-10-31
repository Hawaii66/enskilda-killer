import { VerifyUser } from "@/functions/verifyUser";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const { email, id } = await VerifyUser();

  if (email) {
    return NextResponse.json({ email });
  }

  return NextResponse.json({}, { status: 400 });
};
