import { TargetUser } from "@/interfaces/User";
import { supabase } from "./supabase";

export const getTargetUser = async (id: number) => {
  const result = await supabase()
    .from("users")
    .select("*")
    .eq("id", id)
    .single();

  const target: TargetUser | undefined =
    result.data === null
      ? undefined
      : {
          firstname: result.data.firstname || "",
          group: result.data.group,
          id: id,
          lastname: result.data.lastname,
        };

  return target;
};

export const getTargetUsers = async (ids: number[]) => {
  const promises: Promise<TargetUser | undefined>[] = [];
  ids.forEach((i) => promises.push(getTargetUser(i)));

  const targets = await Promise.all(promises);

  return targets;
};
