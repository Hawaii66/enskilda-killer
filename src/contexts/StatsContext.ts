import { Circle } from "@/interfaces/Circle";
import { createContext } from "react";

type IStatsContext = {
  circles: Map<number, Circle>;
};

export const StatsContext = createContext<IStatsContext>({
  circles: new Map(),
});
