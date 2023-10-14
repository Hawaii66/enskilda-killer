import { emailToId } from "@/functions/emailToId";
import { supabase } from "@/functions/supabase";
import { VerifyWithEmail } from "@/functions/verifyToken";
import { Circle } from "@/interfaces/Circle";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const email = await VerifyWithEmail(request);
  const id = await emailToId(email);
  if (!email || !id) return NextResponse.json({}, { status: 400 });

  const { data } = await supabase().from("circles").select("*");

  const circles: Circle[] =
    data?.map((c) => ({ id: c.id, name: c.name })) || [];

  return NextResponse.json(circles);
};
