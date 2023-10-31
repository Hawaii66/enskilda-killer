import { supabase } from "@/functions/supabase";
import { clerkClient } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const GET = async () => {
  const clerkUsers = await clerkClient.users.getUserList({ limit: 500 });

  const failed: any[] = [];

  for (var i = 0; i < clerkUsers.length; i++) {
    if (clerkUsers[i].emailAddresses.length !== 1) {
      failed.push(clerkUsers[i].emailAddresses);
    }
  }

  return NextResponse.json(failed);
};
