import { Database } from "./database";

export type PendingKill = {
  targetid: number;
  murdererid: number;
  orderdBy: Database["public"]["Enums"]["OrderedBy"];
};
