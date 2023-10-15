"use client";

import { AllGroupsContext } from "@/contexts/AllGroupsContext";
import React from "react";

type Props = {
  children: React.ReactNode;
  groups: string[];
};

function AllGroupsWrapperProvider({ children, groups }: Props) {
  return (
    <AllGroupsContext.Provider value={groups}>
      {children}
    </AllGroupsContext.Provider>
  );
}

export default AllGroupsWrapperProvider;
