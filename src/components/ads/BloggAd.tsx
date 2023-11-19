"use client";

import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

declare const window: any;

const initAd = () => {
  (window.adsbygoogle = window.adsbygoogle || []).push({});
};

function BloggAd() {
  const pathname = usePathname();

  useEffect(() => {
    initAd();
  });

  return (
    <div
      key={
        pathname.replace(/\//g, "-") +
        "-" +
        "6638719098" +
        "-" +
        "default-ad-unit-type"
      }
    >
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-1555847445754750"
        data-ad-slot="6638719098"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}

export default BloggAd;
