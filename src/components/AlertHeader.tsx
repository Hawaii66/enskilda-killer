"use client";

import { GameStateContext } from "@/contexts/GameStateContext";
import React, { useContext } from "react";
import { Alert, AlertTitle, AlertDescription } from "./ui/alert";

function AlertHeader() {
  const state = useContext(GameStateContext);

  return (
    <>
      {state?.info.header && (
        <div className="md:w-2/3 lg:w-1/2 w-11/12 py-4">
          <Alert
            className={`${
              state.info.type === "info"
                ? "bg-green-800 text-black"
                : "bg-yellow-300 text-black"
            }`}
          >
            <AlertTitle className="text-lg font-bold">
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
