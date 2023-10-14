"use client";

import { GameStateContext } from "@/contexts/GameStateContext";
import { supabase } from "@/functions/supabase";
import { ConstantKey, GameState } from "@/interfaces/Constants";
import { NextResponse } from "next/server";
import React, { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
};

export const revalidate = 0;

async function GetState(): Promise<GameState> {
  const query: ConstantKey = "GameState";

  const { data } = await supabase()
    .from("constants")
    .select("data")
    .eq("query", query)
    .single();

  if (!data) {
    return {
      allowSignUp: true,
      isPaused: false,
      startdate: Date.now(),
    };
  }

  return JSON.parse(data.data);
}

async function GameStateWrapper({ children }: Props) {
  const gameState = await GetState();

  return (
    <GameStateContext.Provider value={gameState}>
      {children}
    </GameStateContext.Provider>
  );
}

export default GameStateWrapper;
