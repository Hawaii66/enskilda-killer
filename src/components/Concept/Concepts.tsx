import { Concept } from "@/interfaces/Constants";
import React from "react";
import Top from "../Top";
import { supabase } from "@/functions/supabase";

async function GetData() {
  const data = await supabase().from("concepts").select("*");

  const concepts: Concept[] =
    data.data?.map((i) => ({
      concept: i.concept,
      index: i.index,
    })) || [];

  return concepts;
}

async function Concepts() {
  const data = await GetData();

  return (
    <div className="flex flex-col items-center">
      <Top text="Begrepp" />
      <div className="md:w-2/3 lg:w-1/2 w-11/12 flex justify-center items-center">
        <div className="pt-8">
          <p className="font-serif text-center text-black font-medium text-lg">
            Spelet går ut på att döda ditt specifika offer och ej bli dödad av
            den som ska döda dig. När du dödat ditt offer får du offrets offer
            och kan fortsätta din räd mot finalen.
          </p>
          <ul className="pt-4">
            {data
              .sort((a, b) => a.index - b.index)
              .map((concept) => (
                <li
                  className="text-lg font-serif text-black font-medium py-2"
                  key={concept.index}
                >
                  •{" "}
                  <span dangerouslySetInnerHTML={{ __html: concept.concept }} />
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Concepts;
