import { supabase } from "@/functions/supabase";
import { VerifyUser } from "@/functions/verifyUser";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const { email, id } = await VerifyUser();
  if (!email || !id) return NextResponse.json({}, { status: 400 });

  const { data } = await supabase()
    .from("users")
    .select("show_murderer")
    .eq("id", id)
    .single();

  if (!data?.show_murderer) {
    return NextResponse.json({}, { status: 201 });
  }

  const { data: murdererID } = await supabase()
    .from("targets")
    .select("murderer")
    .eq("target", id)
    .single();

  if (murdererID === null) {
    return NextResponse.json({}, { status: 400 });
  }

  const { data: murderer } = await supabase()
    .from("users")
    .select("firstname,lastname,id,group")
    .eq("id", murdererID?.murderer)
    .single();

  if (murderer === null) {
    return NextResponse.json({}, { status: 400 });
  }

  return NextResponse.json({
    firstname: murderer.firstname,
    lastname: murderer.lastname,
    group: murderer.group,
    id: murderer.id,
  });
};
