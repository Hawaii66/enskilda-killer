import { supabase } from "@/functions/supabase";
import { VerifyUser } from "@/functions/verifyUser";
import { Circle } from "@/interfaces/Circle";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const { data } = await supabase().from("circles").select("color,id,name");

  const circles: Circle[] =
    data?.map((c) => ({
      id: c.id,
      name: c.name,
      color: c.color,
    })) || [];

  return NextResponse.json(circles);
};
