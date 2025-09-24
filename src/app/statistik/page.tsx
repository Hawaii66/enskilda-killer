import StatsWrapper from "@/components/Contexts/StatsWrapper";
import Top from "@/components/Top";
import Circles from "@/components/statistics/Circles";
import GroupKills from "@/components/statistics/GroupKills";
import KillsPerDay from "@/components/statistics/KillsPerDay";
import MostKills from "@/components/statistics/MostKills";
import TotalAlive from "@/components/statistics/TotalAlive";
import { supabase } from "@/functions/supabase";
import { Database } from "@/interfaces/database";
import { SupabaseClient } from "@supabase/supabase-js";
import {
  addDays,
  addHours,
  addMonths,
  eachDayOfInterval,
  isSameDay,
  startOfDay,
} from "date-fns";
import React from "react";

async function GetGroupStats(supabase: SupabaseClient<Database>) {
  const result = await supabase.from("users").select("group, id");
  const circleUsers = await supabase
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

async function GetMostKills(supabase: SupabaseClient<Database>) {
  const kills = await supabase
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

async function GetGroupKills(supabase: SupabaseClient<Database>) {
  const kills = await supabase.from("groupkillscircle").select("*");

  const map: Map<string, Map<number, number>> = new Map();

  kills.data?.forEach((row) => {
    if (row.group === null || row.circle === null) return;

    var group = map.get(row.group) || new Map<number, number>();
    group.set(row.circle, row.count || 0);
    map.set(row.group, group);
  });

  return map;
}

async function GetAliveTotal(supabase: SupabaseClient<Database>) {
  const totalUsers =
    (await supabase.from("users").select("id")).data?.length || 0;
  const totalAlive =
    (await supabase.from("usersincircle").select("circle")).data || [];

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

async function GetKillsPerDay(supabase: SupabaseClient<Database>) {
  const startDay = parseInt(
    JSON.parse(
      (
        await supabase
          .from("constants")
          .select("data")
          .eq("query", "GameState")
          .single()
      ).data?.data || ""
    ).startdate
  );

  console.log(new Date(startDay));

  const data = await supabase.from("killsperdaycircle").select("*");

  const killsPerDay =
    data.data?.map((i) => ({
      time: addHours(startOfDay(new Date(i.time || "")), 1).getTime(),
      count: i.count,
      circle: i.circle,
    })) ?? [];

  const map: Map<number, Map<number, number>> = new Map();

  const start = startOfDay(new Date(startDay));
  const sortedLast = killsPerDay.sort((a, b) => b.time - a.time);
  const end =
    sortedLast.length > 0 ? new Date(sortedLast[0].time) : addMonths(start, 1);
  const eachDay = eachDayOfInterval({
    start: start,
    end,
  });

  eachDay.forEach((day) => {
    const killsOneDay =
      killsPerDay?.filter((i) => isSameDay(day, i.time)) || [];

    const dayMap = new Map<number, number>();
    killsOneDay.forEach((kill) => {
      if (kill.circle === null) return;
      dayMap.set(kill.circle, kill.count || 0);
    });

    map.set(day.getTime(), dayMap);
  });

  return map;
}

export const revalidate = 60 * 3;

async function page() {
  const _supabase = supabase();
  const circles = await GetGroupStats(_supabase);
  const userKills = await GetMostKills(_supabase);
  const groupKills = await GetGroupKills(_supabase);
  const totalAlive = await GetAliveTotal(_supabase);
  const killsPerDay = await GetKillsPerDay(_supabase);

  console.log(killsPerDay);

  return (
    <>
      <Top text="Statistik" />
      <div className="flex justify-center items-center mt-4 w-full">
        <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:px-8 w-11/12 md:w-2/3 lg:w-full">
          <div className="lg:col-span-2 text-center">
            <h1 className="font-bold text-black text-xl underline">
              Statistik för Killer
            </h1>
            <p className="font-bold text-gray-600 text-md">
              Här kan du se live statistik för årets Killer
            </p>
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
