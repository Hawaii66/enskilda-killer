import { emailToId } from "@/functions/emailToId";
import { supabase } from "@/functions/supabase";
import { VerifyWithEmail } from "@/functions/verifyToken";
import { Kills } from "@/interfaces/Profile";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const email = await VerifyWithEmail(request);
  const id = await emailToId(email);
  if (!email || !id) return NextResponse.json({}, { status: 400 });

  const killsIds = await supabase()
    .from("kills")
    .select("*")
    .eq("murderer", id);

  const targets = await supabase()
    .from("users")
    .select("*")
    .in("id", killsIds.data?.map((i) => i.target) || []);

  const kills: Kills =
    targets.data?.map((target, idx) => ({
      circle: "",
      target: {
        firstname: target.firstname,
        group: target.group,
        id: target.id,
        lastname: target.lastname,
      },
      time: new Date(
        killsIds.data === null ? "0" : killsIds.data[idx].created_at
      ).getTime(),
    })) || [];

  return NextResponse.json(kills);
};
