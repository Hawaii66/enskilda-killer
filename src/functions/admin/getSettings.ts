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

  const gameState: GameState =
    state === null
      ? { allowSignUp: true, isPaused: false, startdate: Date.now() }
      : JSON.parse(state.data);

  const circlesResult = await supabase().from("circles").select("*");

  const circles: Circle[] =
    circlesResult.data?.map((i) => ({ id: i.id, name: i.name })) || [];

  return {
    gameState,
    circles,
  };
}
