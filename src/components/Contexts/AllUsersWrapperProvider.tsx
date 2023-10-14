"use client";

import { AllUsersContext } from "@/contexts/AllUsersContext";
import { TargetUser } from "@/interfaces/User";
import React from "react";

type Props = {
  children: React.ReactNode;
  users: TargetUser[];
};

function AllUsersWrapperProvider({ children, users }: Props) {
  return (
    <AllUsersContext.Provider value={users}>
      {children}
    </AllUsersContext.Provider>
  );
}

export default AllUsersWrapperProvider;
