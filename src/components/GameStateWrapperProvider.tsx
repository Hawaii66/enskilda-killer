"use client";

import { GameStateContext } from "@/contexts/GameStateContext";
import { GameState } from "@/interfaces/Constants";
import React from "react";

type Props = {
  state: GameState;
  children: React.ReactNode;
};

function GameStateWrapperProvider({ state, children }: Props) {
  return (
    <GameStateContext.Provider value={state}>
      {children}
    </GameStateContext.Provider>
  );
}

export default GameStateWrapperProvider;
