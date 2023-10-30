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
import React from "react";

async function GetGroupStats() {
  const result = await supabase().from("users").select("group, id");
  const circleUsers = await supabase().from("usersincircle").select("user");

  const map: Map<
    string,
    {
      alive: number;
      dead: number;
    }
  > = new Map();

  result.data?.forEach((user) => {
    const previous = map.get(user.group);
    const inCircle = circleUsers.data?.map((i) => i.user).includes(user.id);
    map.set(user.group, {
      alive: (previous === undefined ? 0 : previous.alive) + (inCircle ? 1 : 0),
      dead: (previous === undefined ? 0 : previous.dead) + (inCircle ? 0 : 1),
    });
  });

  return map;
}

async function GetMostKills() {
  const kills = await supabase()
    .from("countkills")
    .select("*")
    .order("count", { ascending: false });

  const map: Map<string, { alive: boolean; kills: number }> = new Map();

  kills.data?.forEach((user) => {
    map.set(`${user.firstname} ${user.lastname}`, {
      alive: user.circle !== null,
      kills: user.count ?? 0,
    });
  });

  return map;
}

async function GetGroupKills() {
  const kills = await supabase().from("groupkills").select("*");

  const map: Map<string, number> = new Map();

  kills.data?.forEach((group) => {
    map.set(group.group || "", group.kills || 0);
  });

  return map;
}

async function GetAliveTotal() {
  const totalUsers =
    (await supabase().from("users").select("id")).data?.length || 0;
  const totalAlive =
    (await supabase().from("usersincircle").select("id")).data?.length || 0;

  return {
    alive: totalAlive,
    dead: totalUsers - totalAlive,
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

  const data = await supabase().from("killsperday").select("*");

  const killsPerDay = data.data?.map((i) => ({
    time: addHours(startOfDay(new Date(i.time || "")), 1).getTime(),
    count: i.count,
  }));

  const map: Map<number, number> = new Map(); // Map<day (UTC), number of kills>

  const today = Date.now();

  var time = startOfDay(startDay).getTime();
  while (time < today) {
    const count = killsPerDay?.find((i) => isSameDay(time, i.time))?.count;

    map.set(time, count ?? 0);

    time = addDays(time, 1).getTime();
  }

  return map;
}

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
            <h1 className="text-xl underline font-bold text-black">
              Statistik för Killer
            </h1>
            <p className="text-md font-bold text-gray-600">
              Här kan du se live statistik för årets Killer
            </p>
          </div>
          <KillsPerDay kills={killsPerDay} />
          <Circles circles={circles} />
          <MostKills kills={userKills} />
          <GroupKills kills={groupKills} />
          <TotalAlive total={totalAlive} />
        </div>
      </div>
    </>
  );
}

export default page;
