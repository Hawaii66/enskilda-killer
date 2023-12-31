import { checkIsAdmin } from "@/functions/admin/checkIsAdmin";
import { supabase } from "@/functions/supabase";
import { clerkClient } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const isAdmin = await checkIsAdmin(request);
  if (!isAdmin) return NextResponse.json({}, { status: 404 });

  const clerkUsers = await clerkClient.users.getUserList({ limit: 500 });

  const failed: any[] = [];

  const toResolve: Promise<any>[] = [];

  for (var i = 0; i < clerkUsers.length; i++) {
    const promise = supabase()
      .from("users")
      .update({
        clerkId: clerkUsers[i].id,
      })
      .eq("email", clerkUsers[i].emailAddresses[0].emailAddress)
      .select("*");
    toResolve.push(promise as any);
  }

  const results = await Promise.all(toResolve);
  results.forEach((result, i) => {
    if (result.error || result.data === null || result.data.length === 0) {
      failed.push({
        email: clerkUsers[i].emailAddresses[0].emailAddress,
        id: clerkUsers[i].id,
      });
    }
  });

  return NextResponse.json({
    arr: failed,
  });
};
