import { GhostMurder, MurdererMurder } from "@/functions/admin/murder";
import { emailToId } from "@/functions/emailToId";
import { VerifyWithEmail } from "@/functions/verifyToken";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const email = await VerifyWithEmail(request);
  const id = await emailToId(email);
  if (!email || !id) return NextResponse.json({}, { status: 400 });

  const data: { murderer: number | undefined; target: number; circle: number } =
    await request.json();

  if (data.murderer) {
    await MurdererMurder(data.murderer, data.target, data.circle);
  } else {
    await GhostMurder(data.target, data.circle);
  }

  return NextResponse.json({});
};
