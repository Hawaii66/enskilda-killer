"use client";

import { useRouter } from "next/router";
import React, { useEffect } from "react";

declare const window: any;

const initAd = () => {
  (window.adsbygoogle = window.adsbygoogle || []).push({});
};

function BloggAd() {
  const router = useRouter();

  useEffect(() => {
    initAd();
  });

  return (
    <div
      key={
        router.asPath.replace(/\//g, "-") +
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
