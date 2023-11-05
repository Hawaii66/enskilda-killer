import React from "react";
import { supabase } from "@/functions/supabase";
import { ConstantKey } from "@/interfaces/Constants";
import AllLitigationReasonsProvider from "./AllLitigationReasonsProvider";

type Props = {
  children: React.ReactNode;
};

async function GetAllLitigations() {
  const key: ConstantKey = "LitigationReasons";
  const result = await supabase()
    .from("constants")
    .select("data")
    .eq("query", key)
    .single();

  if (result.data === null) {
    return [];
  }

  const litigations: string[] = JSON.parse(result.data.data);

  return litigations;
}

export const revalidate = 0;

async function AllLitigationReasonsWrapper({ children }: Props) {
  const litigations = await GetAllLitigations();

  return (
    <AllLitigationReasonsProvider litigations={litigations}>
      {children}
    </AllLitigationReasonsProvider>
  );
}

export default AllLitigationReasonsWrapper;
