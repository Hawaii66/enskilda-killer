import { supabase } from "@/functions/supabase";
import { VerifyUser } from "@/functions/verifyUser";
import { Circle } from "@/interfaces/Profile";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const { email, id } = await VerifyUser();
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

  const targetsId = await supabase()
    .from("targets")
    .select("target")
    .eq("murderer", id);
  const { data: targets } = await supabase()
    .from("users")
    .select("*")
    .in("id", targetsId.data?.map((i) => i.target) || []);

  const response: Circle = {
    status: "alive",
    circle: circle.data?.name || "",
    targets:
      targets?.map((target) => ({
        firstname: target?.firstname || "",
        group: target?.group || "",
        id: target.id || 0,
        lastname: target?.lastname || "",
      })) || [],
  };

  return NextResponse.json(response);
};
