import { PlayerInfo } from "@/interfaces/Admin";
import { Kills } from "@/interfaces/Profile";
import { TargetUser, User } from "@/interfaces/User";
import { getUserKills, getUsersKills } from "../getUserKills";
import { supabase } from "../supabase";
import { getUserCircles } from "../getUserCircles";
import { error } from "console";

export async function GetUsers(): Promise<PlayerInfo[]> {
  const { data: dbUsers } = await supabase().from("users").select("*");
  if (dbUsers === null) return [];

  const { data: targetIds } = await supabase().from("targets").select("*");
  if (targetIds === null) return [];

  const targets: TargetUser[] = targetIds.map((id) => {
    const user = dbUsers.find((i) => i.id === id.target);
    return {
      firstname: user?.firstname || "",
      group: user?.group || "",
      id: id.target,
      lastname: user?.lastname || "",
    };
  });

  const circleMap = await getUserCircles(dbUsers.map((i) => i.id));

  const users: User[] = dbUsers.map((user) => ({
    email: user.email,
    firstname: user.firstname,
    group: user.group,
    id: user.id,
    kills: [],
    lastname: user.lastname,
    phone: user.phone,
    target: targets.find(
      (i) => i.id === targetIds.find((j) => j.murderer === user.id)?.target
    ),
    circle: circleMap.get(user.id),
    isMember: user.isMember,
    clerkId: user.clerkId,
  }));

  const kills = await getUsersKills(users.map((i) => i.id));

  const players: PlayerInfo[] = users.map((user, idx) => ({
    user: user,
    kills: kills.get(user.id) ?? [],
  }));

  return players;
}
