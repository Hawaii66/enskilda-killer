import { supabase } from "@/functions/supabase";
import { validateToken } from "@/functions/verifyToken";
import { Me } from "@/interfaces/Profile";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");
  const result = await validateToken(token || "");
  if (!result) {
    return NextResponse.json({}, { status: 400 });
  }

  const { email } = result;

  const { data } = await supabase()
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (data === null) {
    return NextResponse.json({}, { status: 400 });
  }

  const me: Me = {
    email: data.email,
    firstname: data.firstname,
    group: data.group,
    lastname: data.lastname,
    phone: data.phone,
    isMember: data.isMember,
  };

  return NextResponse.json(me);
};
