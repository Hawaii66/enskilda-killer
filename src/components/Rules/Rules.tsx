import { Rule } from "@/interfaces/Constants";
import React, { Suspense } from "react";
import RenderRule from "./Rule";
import Top from "../Top";
import { supabase } from "@/functions/supabase";

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

async function Rules() {
  const data = await GetData();

  return (
    <div>
      <Top text="Regler" />
      <div className="w-full flex flex-col items-center">
        <p className="text-2xl underline my-8 font-semibold text-black">
          Brott mot vilken som helst av dessa regler innebär att man riskerar
          diskning.
        </p>
        {data
          .sort((a, b) => a.index - b.index)
          .map((rule, idx) => (
            <RenderRule
              key={rule.index}
              index={idx + 1}
              isEven={idx % 2 === 1}
              rule={rule}
            />
          ))}
      </div>
    </div>
  );
}

export default Rules;
