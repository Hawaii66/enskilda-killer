import { checkIsAdmin } from "@/functions/admin/checkIsAdmin";
import { GetConcepts } from "@/functions/admin/getConceptsx";
import { GetRules } from "@/functions/admin/getRules";
import { emailToId } from "@/functions/emailToId";
import { VerifyWithEmail } from "@/functions/verifyToken";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const isAdmin = await checkIsAdmin(request);
  if (!isAdmin) return NextResponse.json({}, { status: 404 });

  const rules = await GetRules();

  return NextResponse.json(rules);
};
