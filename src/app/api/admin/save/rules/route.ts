import { checkIsAdmin } from "@/functions/admin/checkIsAdmin";
import { supabase } from "@/functions/supabase";
import { Rule } from "@/interfaces/Constants";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const isAdmin = await checkIsAdmin(request);
  if (!isAdmin) return NextResponse.json({}, { status: 404 });

  const rules: Rule[] = await request.json();

  await supabase().from("rules").delete().neq("id", -1);
  await supabase()
    .from("rules")
    .insert(
      rules.map((rule) => ({
        header: rule.header,
        index: rule.index,
        rule: rule.rule,
      }))
    );

  return NextResponse.json({});
};
