import List from "@/components/admin/players/List";
import { GetUsers } from "@/functions/admin/getPlayers";
import React from "react";

export const revalidate = 0;

async function Page() {
  const users = await GetUsers();

  return <List users={users} />;
}

export default Page;
