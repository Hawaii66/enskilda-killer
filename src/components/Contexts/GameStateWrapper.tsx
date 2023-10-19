import { GameStateContext } from "@/contexts/GameStateContext";
import { supabase } from "@/functions/supabase";
import { ConstantKey, GameState } from "@/interfaces/Constants";
import GameStateWrapperProvider from "./GameStateWrapperProvider";

type Props = {
  children: React.ReactNode;
};

export const revalidate = 0;

async function GetState(): Promise<GameState> {
  const query: ConstantKey = "GameState";

  const { data } = await supabase()
    .from("constants")
    .select("data")
    .eq("query", query)
    .single();

  if (!data) {
    return {
      allowSignUp: true,
      isPaused: false,
      startdate: Date.now(),
      info: {
        text: "Vi har problem med att hitta information från server, ladda om sidan",
        header: "Problem",
      },
    };
  }

  return JSON.parse(data.data);
}

async function GameStateWrapper({ children }: Props) {
  const gameState = await GetState();

  return (
    <GameStateWrapperProvider state={gameState}>
      {children}
    </GameStateWrapperProvider>
  );
}

export default GameStateWrapper;
