import { supabase } from "@/functions/supabase";
import { clerkClient } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const GET = async () => {
  const clerkUsers = await clerkClient.users.getUserList({ limit: 500 });

  const failed: any[] = [];

  for (var i = 0; i < clerkUsers.length; i++) {
    const result = await supabase()
      .from("users")
      .update({
        clerkId: clerkUsers[i].id,
      })
      .eq("email", clerkUsers[i].emailAddresses[0].emailAddress)
      .select("*");

    if (result.error || result.data === null || result.data.length === 0) {
      failed.push(result);
    }
  }

  return NextResponse.json(failed);
};
