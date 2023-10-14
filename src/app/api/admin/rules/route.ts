import { GetConcepts } from "@/functions/admin/getConceptsx";
import { GetRules } from "@/functions/admin/getRules";
import { emailToId } from "@/functions/emailToId";
import { VerifyWithEmail } from "@/functions/verifyToken";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const email = await VerifyWithEmail(request);
  const id = await emailToId(email);
  if (!email || !id) return NextResponse.json({}, { status: 400 });

  const rules = await GetRules();

  return NextResponse.json(rules);
};
