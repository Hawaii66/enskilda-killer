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
      } w-full flex justify-center items-center py-8`}
    >
      <div className="w-1/2">
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
    </div>
  );
}

export default RenderRule;
