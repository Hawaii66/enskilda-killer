import List from "@/components/admin/litigations/List";
import { GetLitigations } from "@/functions/admin/getLitigations";
import { supabase } from "@/functions/supabase";
import React from "react";

export const revalidate = 0;

async function Page() {
  const litigations = await GetLitigations();
  const admins = await supabase().from("admins").select("*");

  return (
    <List
      litigations={litigations}
      admins={
        admins.data?.map((i) => ({
          email: i.email,
          name: i.name,
        })) || []
      }
    />
  );
}

export default Page;
