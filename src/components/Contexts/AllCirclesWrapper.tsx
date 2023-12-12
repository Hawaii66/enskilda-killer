import React from "react";
import { supabase } from "@/functions/supabase";
import AllGroupsWrapperProvider from "./AllGroupsWrapperProvider";
import { Circle } from "@/interfaces/Circle";
import AllCirclesWrapperProvider from "./AllCriclesWrapperProvider";

type Props = {
  children: React.ReactNode;
};

async function GetAllCircles() {
  const result = await supabase().from("circles").select("*");

  if (result.data === null) {
    return [];
  }

  const circles: Circle[] = result.data.map((c) => ({
    id: c.id,
    name: c.name,
    color: c.color,
    hidden: c.hidden,
    multipleTargets: c.multipleTargets,
  }));

  return circles;
}

export const revalidate = 0;

async function AllCirclesWrapper({ children }: Props) {
  const circles = await GetAllCircles();

  return (
    <AllCirclesWrapperProvider circles={circles}>
      {children}
    </AllCirclesWrapperProvider>
  );
}

export default AllCirclesWrapper;
