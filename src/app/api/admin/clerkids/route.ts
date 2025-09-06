import { checkIsAdmin } from "@/functions/admin/checkIsAdmin";
import { supabase } from "@/functions/supabase";
import { clerkClient } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    const isAdmin = await checkIsAdmin(request);
    if (!isAdmin) return NextResponse.json({}, { status: 404 });

    let clerkUsersI: User[][] = [];
    let page = 0;
    while (true) {
        let newUsers = await clerkClient.users.getUserList({
            limit: 500,
            offset: page * 500,
        });

        page += 1;
        if (newUsers.length === 0) {
            break;
        }
        clerkUsersI.push(newUsers);
    }
    const clerkUsers = clerkUsersI.flat()

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
