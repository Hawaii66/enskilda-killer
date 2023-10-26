import List from "@/components/admin/players/List";
import { GetUsers } from "@/functions/admin/getPlayers";
import React from "react";
import { clerkClient } from "@clerk/nextjs";

export const revalidate = 0;

async function Page() {
  const users = await GetUsers();
  //Todo: implement "pagination" to get all if above 500 in the future
  const clerkUsers = await clerkClient.users.getUserList({ limit: 500 });

  return (
    <List
      clerks={clerkUsers.map((i) => i.emailAddresses[0].emailAddress)}
      users={users}
    />
  );
}

export default Page;
