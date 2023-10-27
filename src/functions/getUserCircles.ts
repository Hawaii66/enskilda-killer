import { Circle } from "@/interfaces/Circle";
import { supabase } from "./supabase";

export const getUserCircles = async (
  ids: number[]
): Promise<Map<number, Circle | undefined>> => {
  const performent = await supabase()
    .from("users")
    .select("id, usersincircle ( circles (name,id))")
    .in("id", ids);
  const map: Map<number, Circle | undefined> = new Map();

  performent.data?.forEach((user) =>
    map.set(
      user.id,
      user.usersincircle && user.usersincircle.length > 0
        ? {
            id: user.usersincircle[0].circles?.id ?? -1,
            name: user.usersincircle[0].circles?.name ?? "",
          }
        : undefined
    )
  );

  return map;
};

export const getUserKillCircle = async (killId: number) => {
  const { data } = await supabase()
    .from("kills")
    .select("circle")
    .eq("id", killId)
    .single();
  if (data === null) return undefined;

  const { data: circleData } = await supabase()
    .from("circles")
    .select("*")
    .eq("id", data.circle)
    .single();
  if (circleData === null) return undefined;

  const circle: Circle = {
    id: circleData.id,
    name: circleData.name,
  };

  return circle;
};

export const getUserKillCircles = async (killIds: number[]) => {
  const promises: Promise<Circle | undefined>[] = [];
  killIds.forEach((i) => promises.push(getUserKillCircle(i)));

  return await Promise.all(promises);
};
