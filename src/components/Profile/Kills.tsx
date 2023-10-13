"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Kill from "./Kill";
import { Kills } from "@/interfaces/Profile";
import { useApi } from "@/hooks/useApi";

function Kills() {
  const [kills, setKills] = useState<Kills | null>(null);

  const apiFetch = useApi();

  const fetchKills = async () => {
    const response = await apiFetch("/api/user/kills", { method: "GET" });
    if (response.status === 200) {
      setKills(await response.json());
    }
  };

  useEffect(() => {
    fetchKills();
  }, []);

  if (kills === null) {
    return <p>Laddar</p>;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Se dina kills</CardTitle>
        <CardDescription>Följ vilka personer du mördat</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <p className="font-bold text-lg">
          Totalt har du dödat: {kills.length} st
        </p>
        <div className="flex flex-col gap-4">
          {kills
            .sort((a, b) => b.time - a.time)
            .map((k) => (
              <Kill kill={k} />
            ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default Kills;
