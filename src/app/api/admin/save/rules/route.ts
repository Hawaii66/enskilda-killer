import { emailToId } from "@/functions/emailToId";
import { supabase } from "@/functions/supabase";
import { VerifyWithEmail } from "@/functions/verifyToken";
import { Rule } from "@/interfaces/Constants";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const email = await VerifyWithEmail(request);
  const id = await emailToId(email);
  if (!email || !id) return NextResponse.json({}, { status: 400 });

  const rules: Rule[] = await request.json();

  await supabase().from("rules").delete();
  await supabase()
    .from("rules")
    .insert(
      rules.map((rule) => ({
        header: rule.header,
        index: rule.index,
        rule: rule.rule,
      }))
    );
};
