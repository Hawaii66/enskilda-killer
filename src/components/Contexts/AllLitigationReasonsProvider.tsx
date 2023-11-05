"use client";

import { AllLitigationReasonsContext } from "@/contexts/AllLitigationReasons";
import React from "react";

type Props = {
  children: React.ReactNode;
  litigations: string[];
};

function AllLitigationReasonsProvider({ children, litigations }: Props) {
  return (
    <AllLitigationReasonsContext.Provider value={litigations}>
      {children}
    </AllLitigationReasonsContext.Provider>
  );
}

export default AllLitigationReasonsProvider;
