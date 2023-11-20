import { Track } from "@/interfaces/Track";
import { supabase } from "./supabase";

export const trackWithUser = async <T>(
  key: string,
  user: number,
  data: string | T
) => {
  await supabase()
    .from("tracking")
    .insert({
      data: typeof data === "string" ? data : JSON.stringify(data),
      name: key,
      user: user,
    });
};

export const track = async <T>(key: string, data: string | T) => {
  await supabase()
    .from("tracking")
    .insert({
      data: typeof data === "string" ? data : JSON.stringify(data),
      name: key,
    });
};

export const getTracking = async (): Promise<Track[]> => {
  const result = await supabase()
    .from("tracking")
    .select("id,created_at,name,data, users (id,firstname,lastname,email)");

  return (
    result.data?.map((track) => ({
      createdAt: new Date(track.created_at).getTime(),
      data: track.data === null ? undefined : track.data,
      id: track.id,
      name: track.name,
      user:
        track.users === null
          ? undefined
          : {
              email: track.users?.email || "",
              firstname: track.users?.firstname || "",
              id: track.users?.id || -1,
              lastname: track.users?.lastname || "",
            },
    })) || []
  );
};
