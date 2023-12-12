import { Admin, ConstantKey, GameState } from "@/interfaces/Constants";
import { supabase } from "../supabase";
import { Circle } from "@/interfaces/Circle";

export async function GetSettings() {
  const key: ConstantKey = "GameState";
  const { data: state } = await supabase()
    .from("constants")
    .select("*")
    .eq("query", key)
    .single();

  const key2: ConstantKey = "Enskildakaren";
  const { data: elevkaren } = await supabase()
    .from("constants")
    .select("data")
    .eq("query", key2)
    .single();

  const key3: ConstantKey = "LitigationReasons";
  const { data: litigations } = await supabase()
    .from("constants")
    .select("data")
    .eq("query", key3)
    .single();

  const gameState: GameState =
    state === null
      ? {
          allowSignUp: true,
          isPaused: false,
          startdate: Date.now(),
          info: {
            header: "Problem",
            text: "Hittade ingen information från servern",
          },
        }
      : JSON.parse(state.data);

  const circlesResult = await supabase().from("circles").select("*");

  const circles: Circle[] =
    circlesResult.data?.map((i) => ({
      id: i.id,
      name: i.name,
      color: i.color,
      hidden: i.hidden,
      multipleTargets: i.multipleTargets,
    })) || [];

  const { data } = await supabase().from("admins").select("*");
  const admins: Admin[] =
    data?.map((i) => ({
      email: i.email,
      name: i.name,
    })) || [];

  return {
    gameState,
    circles,
    admins,
    elevkaren: elevkaren?.data || "",
    litigationReasons: JSON.parse(litigations?.data || "[]") as string[],
  };
}
