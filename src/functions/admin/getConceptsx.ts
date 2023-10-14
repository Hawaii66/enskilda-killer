import { Concept } from "@/interfaces/Constants";
import { supabase } from "../supabase";

export async function GetConcepts() {
  const data = await supabase().from("concepts").select("*");

  const concepts: Concept[] =
    data.data?.map((i) => ({
      concept: i.concept,
      index: i.index,
    })) || [];

  return concepts;
}
