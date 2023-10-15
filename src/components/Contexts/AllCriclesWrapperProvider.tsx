"use client";

import { AllCirclesContext } from "@/contexts/AllCirclesContext";
import { AllGroupsContext } from "@/contexts/AllGroupsContext";
import { Circle } from "@/interfaces/Circle";
import React from "react";

type Props = {
  children: React.ReactNode;
  circles: Circle[];
};

function AllCirclesWrapperProvider({ children, circles }: Props) {
  return (
    <AllCirclesContext.Provider value={circles}>
      {children}
    </AllCirclesContext.Provider>
  );
}

export default AllCirclesWrapperProvider;
