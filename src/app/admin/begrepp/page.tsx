import Concepts from "@/components/admin/concepts/Concepts";
import { GetConcepts } from "@/functions/admin/getConceptsx";
import React from "react";

export const revalidate = 0;

async function Page() {
  const concepts = await GetConcepts();

  return (
    <div className="w-full flex flex-col gap-4">
      <Concepts concepts={concepts} />
    </div>
  );
}

export default Page;
