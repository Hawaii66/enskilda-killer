import Top from "@/components/Top";
import Link from "next/link";
import React from "react";

function NotFound() {
  return (
    <div>
      <Top text="404" />
      <div className="flex justify-center items-center">
        <div className="1/2 pt-8">
          <h3 className="text-5xl font-semibold">Sidan hittades inte</h3>
          <Link className="text-blue-500 text-3xl underline" href="/">
            Tillbaka till start
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
