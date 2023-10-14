import { emailToId } from "@/functions/emailToId";
import { supabase } from "@/functions/supabase";
import { VerifyWithEmail } from "@/functions/verifyToken";
import { ConstantKey, GameState, Rule } from "@/interfaces/Constants";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const email = await VerifyWithEmail(request);
  const id = await emailToId(email);
  if (!email || !id) return NextResponse.json({}, { status: 400 });

  const gameState: GameState = await request.json();

  const key: ConstantKey = "GameState";

  await supabase()
    .from("constants")
    .update({ data: JSON.stringify(gameState) })
    .eq("query", key);

  return NextResponse.json({});
};
