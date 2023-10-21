import { Rule } from "@/interfaces/Constants";
import React from "react";

interface Props {
  rule: Rule;
  isEven: boolean;
  index: number;
}

function RenderRule({ rule, isEven, index }: Props) {
  return (
    <div
      className={`${
        isEven ? "bg-white" : "bg-green-900"
      } md:w-2/3 lg:w-1/2 w-11/12 flex justify-center items-start py-8 flex-col`}
    >
      <h3
        className={`font-bold text-2xl font-serif ${
          isEven ? "text-black" : "text-white"
        }`}
      >
        {index}. {rule.header}
      </h3>
      <div
        className={`font-serif ${isEven ? "text-black" : "text-white"} pt-2`}
        dangerouslySetInnerHTML={{ __html: rule.rule }}
      />
    </div>
  );
}

export default RenderRule;
