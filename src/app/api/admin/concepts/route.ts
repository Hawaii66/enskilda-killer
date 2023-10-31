import { checkIsAdmin } from "@/functions/admin/checkIsAdmin";
import { GetConcepts } from "@/functions/admin/getConceptsx";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const isAdmin = await checkIsAdmin(request);
  if (!isAdmin) return NextResponse.json({}, { status: 404 });

  const concepts = await GetConcepts();

  return NextResponse.json(concepts);
};
