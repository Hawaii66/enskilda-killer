import React from "react";
import { supabase } from "@/functions/supabase";
import { ConstantKey } from "@/interfaces/Constants";
import AllGroupsWrapperProvider from "./AllGroupsWrapperProvider";

type Props = {
  children: React.ReactNode;
};

async function GetAllGroups() {
  const key: ConstantKey = "Groups";
  const result = await supabase()
    .from("constants")
    .select("data")
    .eq("query", key)
    .single();

  if (result.data === null) {
    return [];
  }

  const groups: string[] = JSON.parse(result.data.data);

  return groups;
}

export const revalidate = 0;

async function AllGroupsWrapper({ children }: Props) {
  const groups = await GetAllGroups();

  return (
    <AllGroupsWrapperProvider groups={groups}>
      {children}
    </AllGroupsWrapperProvider>
  );
}

export default AllGroupsWrapper;
