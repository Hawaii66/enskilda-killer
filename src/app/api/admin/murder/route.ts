import { checkIsAdmin } from "@/functions/admin/checkIsAdmin";
import { GhostMurder, MurdererMurder } from "@/functions/admin/murder";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const isAdmin = await checkIsAdmin(request);
  if (!isAdmin) return NextResponse.json({}, { status: 404 });

  const data: { murderer: number | undefined; target: number; circle: number } =
    await request.json();

  if (data.murderer) {
    await MurdererMurder(data.murderer, data.target, data.circle);
  } else {
    await GhostMurder(data.target, data.circle);
  }

  return NextResponse.json({});
};
