import { supabase } from "@/functions/supabase";
import { validateToken } from "@/functions/verifyToken";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");
  const result = await validateToken(token || "");
  if (!result) return NextResponse.json({}, { status: 400 });

  const { email } = result;

  const data: {
    firstname: string;
    lastname: string;
    phone: string;
    group: string;
  } = await request.json();

  const { error } = await supabase().from("users").insert({
    email: email,
    firstname: data.firstname,
    group: data.group,
    lastname: data.lastname,
    phone: data.phone,
  });

  if (error) {
    return NextResponse.json({ error }, { status: 400 });
  }

  return NextResponse.json({});
};
