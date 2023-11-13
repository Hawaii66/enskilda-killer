import StatsWrapper from "@/components/Contexts/StatsWrapper";
import Temp from "@/components/Temp";
import Top from "@/components/Top";
import Circles from "@/components/statistics/Circles";
import GroupKills from "@/components/statistics/GroupKills";
import KillsPerDay from "@/components/statistics/KillsPerDay";
import MostKills from "@/components/statistics/MostKills";
import TotalAlive from "@/components/statistics/TotalAlive";
import { supabase } from "@/functions/supabase";
import {
  addDays,
  addHours,
  format,
  getDay,
  isSameDay,
  startOfDay,
} from "date-fns";
import Link from "next/link";
import React from "react";

async function GetGroupStats() {
  const result = await supabase().from("users").select("group, id");
  const circleUsers = await supabase()
    .from("usersincircle")
    .select("user,circle");

  const map: Map<
    string,
    {
      circles: Map<number, number>;
      dead: number;
    }
  > = new Map();

  const dead: Map<string, number> = new Map();

  result.data?.forEach((user) => {
    const previous = map.get(user.group);

    const circles: Map<number, number> =
      previous?.circles || new Map<number, number>();
    const circle = circleUsers.data?.find((i) => i.user === user.id)?.circle;

    if (circle) {
      circles.set(circle, (circles.get(circle) || 0) + 1);
    } else {
      dead.set(user.group, (dead.get(user.group) || 0) + 1);
    }

    map.set(user.group, {
      dead: 0,
      circles,
    });
  });

  Array.from(dead).forEach((dead) => {
    map.set(dead[0], {
      circles: map.get(dead[0])?.circles || new Map(),
      dead: dead[1],
    });
  });

  return map;
}

async function GetMostKills() {
  const kills = await supabase()
    .from("countkillscircle")
    .select("*")
    .order("count", { ascending: false });

  const map: Map<
    string,
    {
      alive: boolean;
      kills: Map<number, number>;
    }
  > = new Map();

  kills.data?.forEach((user) => {
    if (user.circle === null || user.count === null) return;

    const key = `${user.firstname} ${user.lastname} ${user.group}`;
    map.set(key, {
      alive: user.alive !== null,
      kills:
        map.get(key)?.kills.set(user.circle, user.count) ??
        new Map().set(user.circle, user.count),
    });
  });

  return map;
}

async function GetGroupKills() {
  const kills = await supabase().from("groupkillscircle").select("*");

  const map: Map<string, Map<number, number>> = new Map();

  kills.data?.forEach((row) => {
    if (row.group === null || row.circle === null) return;

    var group = map.get(row.group) || new Map<number, number>();
    group.set(row.circle, row.count || 0);
    map.set(row.group, group);
  });

  return map;
}

async function GetAliveTotal() {
  const totalUsers =
    (await supabase().from("users").select("id")).data?.length || 0;
  const totalAlive =
    (await supabase().from("usersincircle").select("circle")).data || [];

  const map: Map<number, number> = new Map();
  totalAlive.forEach((user) => {
    const newCount = (map.get(user.circle) || 0) + 1;
    map.set(user.circle, newCount);
  });

  return {
    dead: totalUsers - totalAlive.length,
    circles: map,
  };
}

async function GetKillsPerDay() {
  const startDay = parseInt(
    JSON.parse(
      (
        await supabase()
          .from("constants")
          .select("data")
          .eq("query", "GameState")
          .single()
      ).data?.data || ""
    ).startdate
  );

  const data = await supabase().from("killsperdaycircle").select("*");

  const killsPerDay = data.data?.map((i) => ({
    time: addHours(startOfDay(new Date(i.time || "")), 1).getTime(),
    count: i.count,
    circle: i.circle,
  }));

  const map: Map<number, Map<number, number>> = new Map(); // Map<day (UTC), number of kills>

  const today = Date.now();

  var time = startOfDay(addHours(startDay, 1)).getTime();
  while (time < today) {
    const killsOneDay =
      killsPerDay?.filter((i) => isSameDay(time, i.time)) || [];

    const dayMap = new Map<number, number>();
    killsOneDay.forEach((kill) => {
      if (kill.circle === null) return;
      dayMap.set(kill.circle, kill.count || 0);
    });

    map.set(time, dayMap);

    time = addDays(time, 1).getTime();
  }

  return map;
}

export const revalidate = 60 * 3;

async function page() {
  const circles = await GetGroupStats();
  const userKills = await GetMostKills();
  const groupKills = await GetGroupKills();
  const totalAlive = await GetAliveTotal();
  const killsPerDay = await GetKillsPerDay();

  return (
    <>
      <Top text="Statistik" />
      <div className="w-full flex justify-center items-center mt-4">
        <div className="md:w-2/3 lg:grid lg:w-full lg:grid-cols-2 w-11/12 lg:px-8 flex flex-col gap-4">
          <div className="text-center lg:col-span-2">
            {/*<h1 className="text-xl underline font-bold text-black">
              Statistik för Killer
            </h1>
            <p className="text-md font-bold text-gray-600">
              Här kan du se live statistik för årets Killer
  </p>*/}
            <Temp />
          </div>
          <StatsWrapper>
            <KillsPerDay kills={killsPerDay} />
            <Circles groups={circles} />
            <MostKills kills={userKills} />
            <GroupKills kills={groupKills} />
            <TotalAlive total={totalAlive} />
          </StatsWrapper>
        </div>
      </div>
    </>
  );
}

export default page;
