import { Database } from "@/interfaces/database";
import { supabase } from "./supabase";

export const BackupTable = async (name: keyof Database["public"]["Tables"]) => {
  const { data } = await supabase().from(name).select("*");
  return data;
};

export const BackupTables = async (manual?: boolean) => {
  const tables = [
    "admins",
    "circles",
    "concepts",
    "constants",
    "kills",
    "litigations",
    "pendingkills",
    "posts",
    "rules",
    "targets",
    "users",
    "usersincircle",
  ] as const;
  const promises: Promise<any>[] = [];
  tables.forEach((i) => promises.push(BackupTable(i)));
  const result = await Promise.all(promises);

  const blob: { [name: string]: any } = {};

  result.forEach((result, idx) => {
    blob[tables[idx]] = result;
  });

  await supabase()
    .storage.from("backup")
    .upload(
      `backup-${manual ? "manual" : "automatic"}-${Date.now()}`,
      JSON.stringify(blob)
    );
};
