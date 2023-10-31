import { checkIsAdmin } from "@/functions/admin/checkIsAdmin";
import { GetUsers } from "@/functions/admin/getPlayers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const isAdmin = await checkIsAdmin(request);
  if (!isAdmin) return NextResponse.json({}, { status: 404 });

  const players = await GetUsers();

  return NextResponse.json(players);
};
