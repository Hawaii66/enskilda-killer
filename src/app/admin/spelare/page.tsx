import List from "@/components/admin/players/List";
import { GetUsers } from "@/functions/admin/getPlayers";
import React from "react";
import { clerkClient } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";

export const revalidate = 0;

async function Page() {
  const users = await GetUsers();
  let clerkUsers: User[][] = [];
  let page = 0;
  while (true) {
    let newUsers = await clerkClient.users.getUserList({
      limit: 200,
      offset: page * 200,
    });

    page += 1;
    if (newUsers.length === 0) {
      break;
    }
    clerkUsers.push(newUsers);
  }

  return (
    <List
      clerks={clerkUsers
        .flat()
        .filter(
          (i) =>
            i.emailAddresses.length !== 0 &&
            i.emailAddresses[0].emailAddress !== ""
        )
        .map((i) => i.emailAddresses[0].emailAddress)}
      users={users}
    />
  );
}

export default Page;
