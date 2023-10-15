import { PlayerContactInfo } from "@/interfaces/Admin";
import { supabase } from "./supabase";

export const getPlayerContactInfo = async (id: number) => {
  const { data } = await supabase()
    .from("users")
    .select("*")
    .eq("id", id)
    .single();

  if (data === null) return undefined;

  const user: PlayerContactInfo = {
    email: data.email,
    firstname: data.firstname,
    group: data.group,
    lastname: data.lastname,
    phone: data.phone,
    id,
  };

  return user;
};

export const getPlayerContactInfos = async (ids: number[]) => {
  const promises: Promise<PlayerContactInfo | undefined>[] = [];
  ids.forEach((i) => promises.push(getPlayerContactInfo(i)));

  return await Promise.all(promises);
};
