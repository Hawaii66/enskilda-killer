"use client";

import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

type Props = {
  slot: string;
  client: string;
  format: string;
};

declare const window: any;

const initAd = () => {
  (window.adsbygoogle = window.adsbygoogle || []).push({});
};

function Ad({ slot, client, format }: Props) {
  const pathname = usePathname();

  useEffect(() => {
    initAd();
  });

  return (
    <div
      key={
        pathname.replace(/\//g, "-") +
        "-" +
        { slot } +
        "-" +
        "default-ad-unit-type"
      }
    >
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}

export default Ad;
