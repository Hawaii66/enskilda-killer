import { checkIsAdmin } from "@/functions/admin/checkIsAdmin";
import { supabase } from "@/functions/supabase";
import { Concept } from "@/interfaces/Constants";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const isAdmin = await checkIsAdmin(request);
  if (!isAdmin) return NextResponse.json({}, { status: 404 });

  const concepts: Concept[] = await request.json();

  await supabase().from("concepts").delete().neq("id", -1);
  await supabase()
    .from("concepts")
    .insert(
      concepts.map((concept) => ({
        index: concept.index,
        concept: concept.concept,
      }))
    );

  return NextResponse.json({});
};
