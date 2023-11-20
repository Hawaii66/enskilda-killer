"use client";

import { StatsContext } from "@/contexts/StatsContext";
import { useApi } from "@/hooks/useApi";
import { useBasicToast } from "@/hooks/useBasicToast";
import { Circle } from "@/interfaces/Circle";
import React, { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
};

function StatsWrapper({ children }: Props) {
  const [circles, setCircles] = useState<Map<number, Circle>>();

  const apiFetch = useApi();
  const { toast } = useBasicToast();

  const fetchCircles = async () => {
    const response = await apiFetch("/api/game/circles", { method: "POST" });
    if (response.status === 200) {
      const circles: Circle[] = await response.json();
      const map: Map<number, Circle> = new Map();
      circles.forEach((c) => {
        map.set(c.id, c);
      });
      setCircles(map);
    } else {
      toast("Kunde inte hämta cirklar");
    }
  };

  useEffect(() => {
    fetchCircles();
  }, []);

  if (circles === undefined) {
    return <p>Laddar</p>;
  }

  return (
    <StatsContext.Provider
      value={{
        circles,
      }}
    >
      {children}
    </StatsContext.Provider>
  );
}

export default StatsWrapper;
