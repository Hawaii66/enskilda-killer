import { Kills } from "@/interfaces/Profile";
import { supabase } from "./supabase";
import { getUserKillCircles } from "./getUserCircles";

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
      circle: { id: -1, name: "" },
      target: {
        firstname: target.firstname,
        group: target.group,
        id: target.id,
        lastname: target.lastname,
      },
      time: new Date(
        killsIds.data === null ? "0" : killsIds.data[idx].created_at
      ).getTime(),
      id: killsIds.data === null ? -1 : killsIds.data[idx].id,
    })) || [];

  const circles = await getUserKillCircles(kills.map((i) => i.id));

  return kills.map((i, idx) => ({
    ...i,
    circle: circles[idx] ?? { id: -1, name: "" },
  }));
};

export const getUsersKills = async (ids: number[]) => {
  const promises: Promise<Kills>[] = [];
  ids.forEach((i) => promises.push(getUserKills(i)));

  const result = await Promise.all(promises);
  return ids.map((i, idx) => ({ id: i, kills: result[idx] }));
};
