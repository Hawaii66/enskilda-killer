"use client";

import { GameStateContext } from "@/contexts/GameStateContext";
import React, { useContext } from "react";
import { Alert, AlertTitle, AlertDescription } from "./ui/alert";

function AlertHeader() {
  const state = useContext(GameStateContext);

  return (
    <>
      {state?.info.header && (
        <div className="py-4 w-11/12 md:w-2/3 lg:w-1/2">
          <Alert
            className={`${
              state.info.type === "info"
                ? "bg-killer-blue text-black"
                : "bg-red-500 text-black"
            }`}
          >
            <AlertTitle className="font-bold text-lg">
              {state.info.header}
            </AlertTitle>
            <AlertDescription>{state.info.text}</AlertDescription>
          </Alert>
        </div>
      )}
    </>
  );
}

export default AlertHeader;
