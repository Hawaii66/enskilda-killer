import { Circle } from "@/interfaces/Circle";
import { supabase } from "./supabase";

export const getUserCircles = async (
  ids: number[]
): Promise<Map<number, Circle | undefined>> => {
  const { data: circlesData } = await supabase().from("circles").select("*");
  const { data: usersInCirclesData } = await supabase()
    .from("usersincircle")
    .select("*");
  if (!circlesData || !usersInCirclesData) return new Map();

  const circles: Circle[] = circlesData.map((c) => ({
    id: c.id,
    name: c.name,
  }));

  const usersInCircles: { userId: number; circleId: number }[] =
    usersInCirclesData.map((i) => ({ circleId: i.circle, userId: i.user }));

  const mappedCircles = new Map<number, Circle>();
  circles.forEach((c) => mappedCircles.set(c.id, c));

  const mappedUsersInCircles = new Map<number, number>();
  usersInCircles.map((i) => mappedUsersInCircles.set(i.userId, i.circleId));

  const map = new Map<number, Circle | undefined>();

  ids.map((userId) => {
    const circleId = mappedUsersInCircles.get(userId);
    if (circleId === undefined) {
      map.set(userId, undefined);
    } else {
      const circle = mappedCircles.get(circleId);
      map.set(userId, circle);
    }
  });

  return map;
};
