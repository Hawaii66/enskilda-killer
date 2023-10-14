import { supabase } from "@/functions/supabase";
import { ConstantKey } from "@/interfaces/Constants";
import { NextResponse } from "next/server";

export const GET = async () => {
  const query: ConstantKey = "GameState";

  const { data } = await supabase()
    .from("constants")
    .select("data")
    .eq("query", query)
    .single();

  if (!data) {
    return NextResponse.json({}, { status: 400 });
  }

  return NextResponse.json(JSON.parse(data.data));
};
