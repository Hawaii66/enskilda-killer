import Concepts from "@/components/Concept/Concepts";
import Top from "@/components/Top";
import React, { Suspense } from "react";

export const revalidate = 0;

function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center flex-col">
          <Top text="Begrepp" />
          <p className="font-serif text-black font-medium text-lg">
            Spelet går ut på att döda ditt specifika offer och ej bli dödad av
            den som ska döda dig. När du dödat ditt offer får du offrets offer
            och kan fortsätta din räd mot finalen.
          </p>
          <p className="tracking-wide font-medium text-lg">Laddar begrepp...</p>
        </div>
      }
    >
      <Concepts />
    </Suspense>
  );
}

export default Page;
