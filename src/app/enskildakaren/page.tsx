import Top from "@/components/Top";
import { supabase } from "@/functions/supabase";
import { ConstantKey } from "@/interfaces/Constants";
import React from "react";

export const revalidate = 0;

async function GetData() {
  const query: ConstantKey = "Enskildakaren";
  const result = await supabase()
    .from("constants")
    .select("data")
    .eq("query", query)
    .single();

  const text = result.data?.data || "";

  return text;
}

async function Page() {
  const data = await GetData();

  return (
    <div>
      <Top text="Enskilda Kåren" />
      <div className="flex justify-center items-center">
        <div
          className="md:w-2/3 lg:w-1/2 w-11/12 text-center pt-4 font-serif text-lg font-medium text-black"
          dangerouslySetInnerHTML={{ __html: data }}
        ></div>
      </div>
    </div>
  );
}

export default Page;
