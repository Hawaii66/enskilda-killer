import { emailToId } from "@/functions/emailToId";
import { supabase } from "@/functions/supabase";
import { VerifyWithEmail } from "@/functions/verifyToken";
import { Concept } from "@/interfaces/Constants";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const email = await VerifyWithEmail(request);
  const id = await emailToId(email);
  if (!email || !id) return NextResponse.json({}, { status: 400 });

  const concepts: Concept[] = await request.json();

  await supabase().from("concepts").delete();
  await supabase()
    .from("concepts")
    .insert(
      concepts.map((concept) => ({
        index: concept.index,
        concept: concept.concept,
      }))
    );
};
