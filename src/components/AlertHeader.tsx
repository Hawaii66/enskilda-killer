"use client";

import { GameStateContext } from "@/contexts/GameStateContext";
import React, { useContext } from "react";
import { Alert, AlertTitle, AlertDescription } from "./ui/alert";

function AlertHeader() {
  const state = useContext(GameStateContext);

  return (
    <>
      {state?.info.header && (
        <div className="w-1/2 py-4">
          <Alert>
            <AlertTitle>{state.info.header}</AlertTitle>
            <AlertDescription>{state.info.text}</AlertDescription>
          </Alert>
        </div>
      )}
    </>
  );
}

export default AlertHeader;
