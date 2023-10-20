import { checkIsAdmin } from "@/functions/admin/checkIsAdmin";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  console.log(request);
  const isAdmin = await checkIsAdmin(request);
  if (!isAdmin) {
    return NextResponse.json({}, { status: 404 });
  } else {
    return NextResponse.json({});
  }
};
