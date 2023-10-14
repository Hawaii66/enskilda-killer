import { GameState } from "@/interfaces/Constants";
import { createContext } from "react";

export const GameStateContext = createContext<GameState | undefined>(undefined);
