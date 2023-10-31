import { supabase } from "@/functions/supabase";
import { VerifyWithEmail, validateToken } from "@/functions/verifyToken";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const email = await VerifyWithEmail(request);
  const { userId } = auth();

  const data: {
    firstname: string;
    lastname: string;
    phone: string;
    group: string;
    isMember: boolean;
  } = await request.json();

  const { error } = await supabase()
    .from("users")
    .insert({
      email: email,
      firstname: data.firstname,
      group: data.group,
      lastname: data.lastname,
      phone: data.phone,
      isMember: data.isMember,
      clerkId: userId ?? "",
    });

  if (error) {
    return NextResponse.json({ error }, { status: 400 });
  }

  return NextResponse.json({});
};
