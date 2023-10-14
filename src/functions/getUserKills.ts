import { Kills } from "@/interfaces/Profile";
import { supabase } from "./supabase";

export const getUserKills = async (id: number) => {
  const killsIds = await supabase()
    .from("kills")
    .select("*")
    .eq("murderer", id);

  const targets = await supabase()
    .from("users")
    .select("*")
    .in("id", killsIds.data?.map((i) => i.target) || []);

  const kills: Kills =
    targets.data?.map((target, idx) => ({
      circle: "",
      target: {
        firstname: target.firstname,
        group: target.group,
        id: target.id,
        lastname: target.lastname,
      },
      time: new Date(
        killsIds.data === null ? "0" : killsIds.data[idx].created_at
      ).getTime(),
    })) || [];
  return kills;
};
