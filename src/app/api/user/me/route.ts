import { emailToId } from "@/functions/emailToId";
import { supabase } from "@/functions/supabase";
import { VerifyWithEmail, validateToken } from "@/functions/verifyToken";
import { Me } from "@/interfaces/Profile";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const email = await VerifyWithEmail(request);
  const id = await emailToId(email);
  if (!email || !id) return NextResponse.json({}, { status: 400 });

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
