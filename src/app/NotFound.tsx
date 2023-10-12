import Top from "@/components/Top";
import React from "react";

export function NotFound() {
  return (
    <div>
      <Top text="404" />
      <h3>Sidan hittades inte</h3>
      <Link>Start</Link>
    </div>
  );
}
