import { checkIsAdmin } from "@/functions/admin/checkIsAdmin";
import { GetSettings } from "@/functions/admin/getSettings";
import { IsAdmin } from "@/functions/admin/isAdmin";
import { emailToId } from "@/functions/emailToId";
import { VerifyWithEmail } from "@/functions/verifyToken";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const isAdmin = await checkIsAdmin(request);
  if (!isAdmin) return NextResponse.json({}, { status: 404 });

  const settings = await GetSettings();

  return NextResponse.json(settings);
};
