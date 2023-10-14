import React from "react";
import AllUsersWrapperProvider from "./AllUsersWrapperProvider";
import { supabase } from "@/functions/supabase";
import { TargetUser } from "@/interfaces/User";

type Props = {
  children: React.ReactNode;
};

async function GetAllUsers() {
  const result = await supabase().from("users").select("*");

  if (result.data === null) {
    return [];
  }

  const targetUsers: TargetUser[] = result.data.map((u) => ({
    firstname: u.firstname,
    lastname: u.lastname,
    group: u.group,
    id: u.id,
  }));

  return targetUsers;
}

export const revalidate = 0;

async function AllUsersWrapper({ children }: Props) {
  const users = await GetAllUsers();

  return (
    <AllUsersWrapperProvider users={users}>{children}</AllUsersWrapperProvider>
  );
}

export default AllUsersWrapper;
