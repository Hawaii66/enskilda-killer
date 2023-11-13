"use client";

import { track } from "@vercel/analytics/react";
import Link from "next/link";
import React from "react";

function Temp() {
  return (
    <>
      <h1 className="text-2xl underline font-bold text-black">
        Hjälp Simplito UF
      </h1>
      <p className="text-lg font-bold text-gray-600">
        Hej, det tar endast 1 minut att fylla i enkäten
      </p>
      <Link
        href="https://forms.gle/2aSV3hwCeuHTWGeQA"
        target="_blank"
        className="text-blue-500 text-lg font-bold"
        onClick={() => {
          track("Form");
        }}
      >
        Klicka här
      </Link>
    </>
  );
}

export default Temp;
