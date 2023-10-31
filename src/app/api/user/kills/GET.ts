import { getUserKills } from "@/functions/getUserKills";
import { VerifyUser } from "@/functions/verifyUser";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const { email, id } = await VerifyUser();
  if (!email || !id) return NextResponse.json({}, { status: 400 });

  const kills = await getUserKills(id);

  return NextResponse.json(kills);
};
