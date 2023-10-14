import { Rule } from "@/interfaces/Constants";
import { supabase } from "../supabase";

export async function GetRules() {
  const data = await supabase().from("rules").select("*");

  const rules: Rule[] =
    data.data?.map((i) => ({
      index: i.index,
      header: i.header,
      rule: i.rule,
    })) || [];

  return rules;
}
