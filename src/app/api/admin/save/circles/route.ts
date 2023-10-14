import { emailToId } from "@/functions/emailToId";
import { supabase } from "@/functions/supabase";
import { VerifyWithEmail } from "@/functions/verifyToken";
import { Circle } from "@/interfaces/Circle";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const email = await VerifyWithEmail(request);
  const id = await emailToId(email);
  if (!email || !id) return NextResponse.json({}, { status: 400 });

  var circles: Circle[] = await request.json();

  const { data: dbCircles } = await supabase().from("circles").select("id");

  circles = circles.filter((i) => !dbCircles?.map((i) => i.id).includes(i.id));

  await supabase()
    .from("circles")
    .insert(circles.map((i) => ({ name: i.name })));

  return NextResponse.json({});
};
