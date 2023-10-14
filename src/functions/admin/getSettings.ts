import { ConstantKey, GameState } from "@/interfaces/Constants";
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

  const gameState: GameState =
    state === null
      ? { allowSignUp: true, isPaused: false, startdate: Date.now() }
      : JSON.parse(state.data);

  const circlesResult = await supabase().from("circles").select("*");

  const circles: Circle[] =
    circlesResult.data?.map((i) => ({ id: i.id, name: i.name })) || [];

  const { data } = await supabase().from("admins").select("email");
  const admins: string[] = data?.map((i) => i.email) || [];

  return {
    gameState,
    circles,
    admins,
    elevkaren: elevkaren?.data || "",
  };
}
