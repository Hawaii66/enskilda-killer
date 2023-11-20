import { BackupTables } from "@/functions/backup";
import { track } from "@/functions/tracking";
import { format } from "date-fns";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const url = new URL(request.url);
  const manual = url.searchParams.get("manual");

  await BackupTables(manual === "true" ? true : false);

  await track("Backup", {
    manual,
    time: format(Date.now(), "yyyy-MM-dd HH:mm"),
  });

  return NextResponse.json({ status: true }, {});
};
