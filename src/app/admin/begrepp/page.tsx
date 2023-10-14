import Concepts from "@/components/admin/concepts/Concepts";
import { supabase } from "@/functions/supabase";
import { Concept } from "@/interfaces/Constants";
import React from "react";

export const revalidate = 0;
async function GetData() {
  const data = await supabase().from("concepts").select("*");

  const concepts: Concept[] =
    data.data?.map((i) => ({
      concept: i.concept,
      index: i.index,
    })) || [];

  return concepts;
}

async function Page() {
  const concepts = await GetData();

  return (
    <div className="w-full flex flex-col gap-4">
      <Concepts concepts={concepts} />
    </div>
  );
}

export default Page;
