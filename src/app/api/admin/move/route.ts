import { emailToId } from "@/functions/emailToId";
import { getUserKills, getUsersKills } from "@/functions/getUserKills";
import { supabase } from "@/functions/supabase";
import { VerifyWithEmail } from "@/functions/verifyToken";
import { BulkMoveInfo, MovePlayersCriterie } from "@/interfaces/Admin";
import { Kills } from "@/interfaces/Profile";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const email = await VerifyWithEmail(request);
  const id = await emailToId(email);
  if (!email || !id) return NextResponse.json({}, { status: 400 });

  const moveInfo: BulkMoveInfo = await request.json();

  const { data: userIdsData } = await supabase().from("users").select("id");
  if (userIdsData === null) return;
  const userIds = userIdsData.map((i) => i.id);

  const userKills = await getUsersKills(userIds);

  const fromUserIds = await getUsersToMove(moveInfo.from);

  const filteredUsers = fromUserIds.filter((user) =>
    filterUserToMove(
      userKills.find((i) => i.id === user)?.kills || [],
      moveInfo.criterias
    )
  );

  await supabase().from("usersincircle").delete().in("user", filteredUsers);

  if (moveInfo.to) {
    const circleId = moveInfo.to;
    await supabase()
      .from("usersincircle")
      .insert(
        filteredUsers.map((id) => ({
          user: id,
          circle: circleId,
        }))
      );
  }

  return NextResponse.json({});
};

const filterUserToMove = (kills: Kills, criterias: MovePlayersCriterie[]) => {
  for (var i = 0; i < criterias.length; i++) {
    const criteria = criterias[i];
    const killCount = kills.filter((a) =>
      criteria.circle ? a.circle.id === criteria.circle : true
    ).length;
    const expected = criteria.number;
    if (criteria.key === "minKills") {
      if (killCount < expected) {
        return false;
      }
    }
    if (criteria.key === "maxKills") {
      if (killCount > expected) {
        return false;
      }
    }
  }

  return true;
};

const getUsersToMove = async (from?: number) => {
  if (from) {
    const { data } = await supabase()
      .from("usersincircle")
      .select("user")
      .eq("circle", from);
    return data ? data.map((i) => i.user) : [];
  }

  const { data } = await supabase().from("usersincircle").select("user");
  const usersInACircle = data ? data.map((i) => i.user) : [];

  const { data: allUsersData } = await supabase().from("users").select("id");
  const allUsersIds = allUsersData ? allUsersData.map((i) => i.id) : [];

  return allUsersIds.filter((i) => !usersInACircle.includes(i));
};
