import { Kills } from "@/interfaces/Profile";
import { supabase } from "./supabase";

export const getUserKills = async (id: number): Promise<Kills> => {
  const performant = await supabase()
    .from("users")
    .select(
      "kills!kills_murderer_fkey(killid:id,time:created_at, users!kills_target_fkey (tid:id,tfirstname:firstname,tlastname:lastname,tgroup:group), circles!kills_circle_fkey (cname:name,cid:id))"
    )
    .eq("id", id);

  return (
    (performant.data &&
      performant.data[0].kills.map((kill) => ({
        circle: {
          id: kill.circles?.cid ?? -1,
          name: kill.circles?.cname ?? "",
          color: "",
        },
        id: kill.killid,
        time: new Date(kill.time).getTime(),
        target: {
          firstname: kill.users?.tfirstname ?? "",
          group: kill.users?.tgroup ?? "",
          id: kill.users?.tid ?? -1,
          lastname: kill.users?.tlastname ?? "",
        },
      }))) ||
    []
  );
};

export const getUsersKills = async (
  ids: number[]
): Promise<Map<number, Kills>> => {
  const performant = await supabase()
    .from("users")
    .select(
      "id, kills!kills_murderer_fkey(killid:id,time:created_at, users!kills_target_fkey (tid:id,tfirstname:firstname,tlastname:lastname,tgroup:group), circles!kills_circle_fkey (cname:name,cid:id))"
    )
    .in("id", ids);

  const map: Map<number, Kills> = new Map();

  performant.data?.forEach((user) => {
    map.set(
      user.id,
      user.kills.map((kill) => ({
        circle: {
          id: kill.circles?.cid ?? -1,
          name: kill.circles?.cname ?? "",
          color: "",
        },
        id: kill.killid,
        time: new Date(kill.time).getTime(),
        target: {
          firstname: kill.users?.tfirstname ?? "",
          group: kill.users?.tgroup ?? "",
          id: kill.users?.tid ?? -1,
          lastname: kill.users?.tlastname ?? "",
        },
      }))
    );
  });

  return map;
};
