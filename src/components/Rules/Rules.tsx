import { Rule } from "@/interfaces/Constants";
import React from "react";
import RenderRule from "./Rule";
import Top from "../Top";

async function GetData() {
  const rules: Rule[] = [
    {
      header: "tae123",
      index: 0,
      rule: "123123",
    },
    {
      header: "tae123",
      index: 1,
      rule: "123123",
    },
    {
      header: "tae123",
      index: 2,
      rule: "123123",
    },
  ];

  return rules;
}

async function Rules() {
  const data = await GetData();

  return (
    <div>
      <Top text="Regler" />
      <div>
        {data
          .sort((a, b) => b.index - a.index)
          .map((rule, idx) => (
            <RenderRule index={idx + 1} isEven={idx % 2 === 0} rule={rule} />
          ))}
      </div>
    </div>
  );
}

export default Rules;
