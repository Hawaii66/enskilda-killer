import { supabase } from "@/functions/supabase";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs";
import { VerifyUser } from "@/functions/verifyUser";

export const GET = async (request: NextRequest) => {
  const { email, id } = await VerifyUser();

  if (id === undefined) {
    ("No user");
    return NextResponse.json({ exists: false });
  }

  return NextResponse.json({ exists: true });
};
