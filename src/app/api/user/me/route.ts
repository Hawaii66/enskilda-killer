import { supabase } from "@/functions/supabase";
import { VerifyUser } from "@/functions/verifyUser";
import { PlayerContactInfo } from "@/interfaces/Admin";
import { Me } from "@/interfaces/Profile";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const { email, id } = await VerifyUser();
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
    clerkId: data.clerkId,
  };

  return NextResponse.json(me);
};

export const POST = async (request: NextRequest) => {
  const { email, id } = await VerifyUser();
  if (!email || !id) return NextResponse.json({}, { status: 400 });

  const info: PlayerContactInfo & { isMember: boolean } = await request.json();

  const result = await supabase()
    .from("users")
    .update({
      firstname: info.firstname,
      lastname: info.lastname,
      group: info.group,
      isMember: info.isMember,
      phone: info.phone,
    })
    .eq("id", id);

  return NextResponse.json(info);
};
