import List from "@/components/admin/players/List";
import { supabase } from "@/functions/supabase";
import { TargetUser, User } from "@/interfaces/User";
import React from "react";

export const revalidate = 0;

async function GetUsers(): Promise<User[]> {
  const { data: dbUsers } = await supabase().from("users").select("*");
  if (dbUsers === null) return [];

  const { data: targetIds } = await supabase().from("targets").select("*");
  if (targetIds === null) return [];

  const targets: TargetUser[] = targetIds.map((id) => {
    const user = dbUsers.find((i) => i.id === id.target);
    return {
      firstname: user?.firstname || "",
      group: user?.group || "",
      id: id.target,
      lastname: user?.lastname || "",
    };
  });

  const users: User[] = dbUsers.map((user) => ({
    email: user.email,
    firstname: user.firstname,
    group: user.group,
    id: user.id,
    kills: [],
    lastname: user.lastname,
    phone: user.phone,
    target: targets.find(
      (i) => i.id === targetIds.find((j) => j.murderer === user.id)?.target
    ),
    circle: {
      id: 0,
      name: "",
    },
  }));

  return users;
}

async function Page() {
  const users = await GetUsers();

  return <List users={users} />;
}

export default Page;
