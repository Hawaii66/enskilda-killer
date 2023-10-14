import Rules from "@/components/admin/rules/Rules";
import { supabase } from "@/functions/supabase";
import { Rule } from "@/interfaces/Constants";
import React from "react";

async function GetData() {
  const data = await supabase().from("rules").select("*");

  const rules: Rule[] =
    data.data?.map((rule) => ({
      header: rule.header,
      index: rule.index,
      rule: rule.rule,
    })) || [];

  return rules;
}

async function Page() {
  const rules = await GetData();

  return (
    <div className="w-full flex flex-col gap-4">
      <Rules rules={rules} />
    </div>
  );
}

export default Page;
