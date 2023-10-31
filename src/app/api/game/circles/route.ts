import { supabase } from "@/functions/supabase";
import { VerifyUser } from "@/functions/verifyUser";
import { Circle } from "@/interfaces/Circle";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const { email, id } = await VerifyUser();
  if (!email || !id) return NextResponse.json({}, { status: 400 });

  const { data } = await supabase().from("circles").select("*");

  const circles: Circle[] =
    data?.map((c) => ({ id: c.id, name: c.name })) || [];

  return NextResponse.json(circles);
};
