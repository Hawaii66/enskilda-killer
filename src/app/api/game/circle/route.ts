import { supabase } from "@/functions/supabase";
import { RevealInfo } from "@/interfaces/CircleReveal";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const backupURL = supabase()
    .storage.from("backup")
    .getPublicUrl("/backup-automatic-1700031628883");

  const text = await fetch(backupURL.data.publicUrl);
  const backup: RevealInfo & {
    usersincircle: { user: number; circle: number }[];
  } = await text.json();

  console.log(backup.usersincircle);
  const inCircle = backup.usersincircle.map((i) => i.user);

  var fixed = {
    kills: backup.kills.map((kill) => ({
      murderer: kill.murderer,
      target: kill.target,
      circle: kill.circle,
      time: kill.created_at,
    })),
    users: backup.users.map((user) => ({
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      group: user.group,
      circle:
        backup.usersincircle.find((i) => i.user === user.id)?.circle ?? -1,
    })),
    circles: backup.circles.map((circle) => ({
      name: circle.name,
      color: circle.color,
      id: circle.id,
    })),
    targets: backup.targets.map((target) => ({
      murderer: target.murderer,
      target: target.target,
    })),
  };

  fixed.users = fixed.users.filter((i) => inCircle.includes(i.id));

  return NextResponse.json(fixed);
};
