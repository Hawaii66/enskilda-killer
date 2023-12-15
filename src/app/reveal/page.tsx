"use client";

import { useApi } from "@/hooks/useApi";
import { useBasicToast } from "@/hooks/useBasicToast";
import { RevealInfo } from "@/interfaces/CircleReveal";
import React, { useEffect, useState } from "react";
import Graph from "react-graph-vis";

function page() {
  const [info, setInfo] = useState<RevealInfo>();

  const apiFetch = useApi();

  const { toast } = useBasicToast();

  const fetchInfo = async () => {
    const response = await apiFetch("/api/game/circle", { method: "GET" });
    if (response.status === 200) {
      setInfo(await response.json());
    } else {
      toast("Kunde inte hämta info");
    }
  };

  const nodes = info?.users.map((user) => ({
    id: user.id,
    label: `${user.firstname} ${user.lastname} ${user.group}`,
    title: `${user.firstname} ${user.lastname} ${user.group}`,
    color: info.circles.find((i) => i.id === user.circle)?.color,
    mass: 5,
  }));

  const edges = info?.targets.map((target) => ({
    from: target.murderer,
    to: target.target,
    color: "#FFF",
    id: target.murderer,
    width: 2,
  }));

  useEffect(() => {
    fetchInfo();
  }, []);

  if (!info) {
    return <></>;
  }

  return (
    <div className="bg-black flex-grow h-screen">
      <Graph
        options={{
          nodes: {
            borderWidth: 2,
            borderWidthSelected: 1,
            margin: 12,
          },
        }}
        graph={{
          nodes,
          edges,
        }}
      />
    </div>
  );
}

export default page;
