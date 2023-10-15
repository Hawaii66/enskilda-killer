import { Circle } from "@/interfaces/Circle";
import { createContext } from "react";

export const AllCirclesContext = createContext<Circle[]>([]);
