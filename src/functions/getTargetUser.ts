import { TargetUser } from "@/interfaces/User";
import { supabase } from "./supabase";

export const getTargetUser = async (id: number) => {
  const result = await supabase()
    .from("users")
    .select("*")
    .eq("id", id)
    .single();

  const target: TargetUser = {
    firstname: result.data?.firstname || "",
    group: result.data?.group || "",
    id: id,
    lastname: result.data?.lastname || "",
  };

  return target;
};

export const getTargetUsers = async (ids: number[]) => {
  const result = await supabase().from("users").select("*").in("id", ids);

  const targets: TargetUser[] =
    result.data?.map((result) => ({
      firstname: result.firstname || "",
      group: result.group || "",
      id: result.id,
      lastname: result.lastname || "",
    })) || [];

  return targets;
};
