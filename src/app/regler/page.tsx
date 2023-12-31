import Rules from "@/components/Rules/Rules";
import Top from "@/components/Top";
import React, { Suspense } from "react";

export const revalidate = 0;

function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center flex-col">
          <Top text="Regler" />
          <p className="tracking-wide font-medium text-lg">Laddar regler...</p>
        </div>
      }
    >
      <Rules />
    </Suspense>
  );
}

export default Page;
