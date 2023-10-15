import List from "@/components/admin/litigations/List";
import { GetLitigations } from "@/functions/admin/getLitigations";
import React from "react";

async function Page() {
  const litigations = await GetLitigations();

  return <List litigations={litigations} />;
}

export default Page;
