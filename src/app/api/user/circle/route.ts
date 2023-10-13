import { emailToId } from "@/functions/emailToId";
import { supabase } from "@/functions/supabase";
import { VerifyWithEmail } from "@/functions/verifyToken";
import { Circle } from "@/interfaces/Profile";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const email = await VerifyWithEmail(request);
  const id = await emailToId(email);
  if (!email || !id) return NextResponse.json({}, { status: 400 });

  const userCircle = await supabase()
    .from("usersincircle")
    .select("*")
    .eq("user", id)
    .single();
  if (userCircle.data === null) {
    const response: Circle = {
      status: "dead",
    };
    return NextResponse.json(response);
  }

  const circle = await supabase()
    .from("circles")
    .select("name")
    .eq("id", userCircle.data.circle)
    .single();

  const targetId = await supabase()
    .from("targets")
    .select("target")
    .eq("murderer", id)
    .single();
  const { data: target } = await supabase()
    .from("users")
    .select("*")
    .eq("id", targetId.data?.target || 0)
    .single();

  console.log(targetId, target);

  const response: Circle = {
    status: "alive",
    circle: circle.data?.name || "",
    target: {
      firstname: target?.firstname || "",
      group: target?.group || "",
      id: targetId.data?.target || 0,
      lastname: target?.lastname || "",
    },
  };

  return NextResponse.json(response);
};
