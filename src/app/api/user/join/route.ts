import { supabase } from "@/functions/supabase";
import { VerifyEmail } from "@/functions/verifyUser";
import { ConstantKey } from "@/interfaces/Constants";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const email = await VerifyEmail();
  const { userId } = auth();

  const data: {
    firstname: string;
    lastname: string;
    phone: string;
    group: string;
    isMember: boolean;
  } = await request.json();

  const { error, data: user } = await supabase()
    .from("users")
    .insert({
      email: email,
      firstname: data.firstname,
      group: data.group,
      lastname: data.lastname,
      phone: data.phone,
      isMember: data.isMember,
      clerkId: userId ?? "",
    })
    .select("id");

  if (user === null) {
    return NextResponse.json({ error }, { status: 400 });
  }

  const joinCircleKey: ConstantKey = "JoinCircle";
  const { data: joinCircle } = await supabase()
    .from("constants")
    .select("data")
    .eq("query", joinCircleKey)
    .single();
  const circleId = parseInt(joinCircle?.data || "-1");
  if (circleId !== -1) {
    await supabase().from("usersincircle").insert({
      user: user[0].id,
      circle: circleId,
    });
  }

  if (error) {
    return NextResponse.json({ error }, { status: 400 });
  }

  return NextResponse.json({});
};
