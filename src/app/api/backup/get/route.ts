import { supabase } from "@/functions/supabase";
import { AllowedBackup, Backup } from "@/interfaces/Constants";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const params = new URL(request.url).searchParams;
  const yearStr = params.get("year");
  const offsetStr = params.get("offset");

  const year = parseInt(yearStr || "");
  const offset = parseInt(offsetStr || "");

  if (isNaN(year) || isNaN(offset)) {
    return NextResponse.json(
      {},
      {
        status: 400,
      }
    );
  }

  const supabaseClient = supabase();

  const names = (
    await supabaseClient.storage.from("backup").list(undefined, {
      offset: offset * 50,
      limit: 50,
    })
  ).data?.map((i) => i.name);
  console.log(names);

  const links =
    names?.map((name) => ({
      link: supabaseClient.storage.from("backup").getPublicUrl(name).data
        .publicUrl,
      name: name,
    })) || [];

  const backups = (await Promise.all(
    links.map((link) => {
      return new Promise((res) => {
        fetch(link.link)
          .then((response) => response.json())
          .then(res);
      });
    })
  )) as Backup[];

  const allowed: AllowedBackup[] = backups.map((backup, idx) => ({
    time: parseInt(links[idx].name.split("-")[2]),
    circles: backup.circles.map((circle) => ({
      id: circle.id,
      name: circle.name,
      color: circle.color,
      multipleTargets: circle.multipleTargets,
      hidden: circle.hidden,
    })),
    constants: backup.constants.map((constant) => ({
      data: constant.data,
      query: constant.query,
    })),
    kills: backup.kills.map((kill) => ({
      murderer: kill.murderer,
      circle: kill.circle,
      target: kill.target,
      id: kill.id,
      created_at: new Date(kill.created_at).getTime(),
    })),
    targets: backup.targets.map((target) => ({
      murderer: target.murderer,
      target: target.target,
    })),
    users: backup.users.map((user) => ({
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      group: user.group,
      showMurderer: user.show_murderer,
    })),
    usersincircle: backup.usersincircle.map((u) => ({
      user: u.user,
      circle: u.circle,
    })),
  }));

  return NextResponse.json(allowed);
};
