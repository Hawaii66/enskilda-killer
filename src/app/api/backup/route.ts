import { BackupTables } from "@/functions/backup";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const url = new URL(request.url);
  const manual = url.searchParams.get("manual");

  await BackupTables(manual === "true" ? true : false);

  return NextResponse.json({}, {});
};
