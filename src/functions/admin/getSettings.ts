import { ConstantKey, GameState } from "@/interfaces/Constants";
import { supabase } from "../supabase";

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

  return {
    gameState,
  };
}
