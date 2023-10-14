import { TargetUser } from "@/interfaces/User";
import { createContext } from "react";

export const AllUsersContext = createContext<TargetUser[]>([]);
