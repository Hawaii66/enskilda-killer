"use client";

import Circle from "@/components/Profile/Default/Circle";
import Kills from "@/components/Profile/Default/Kills";
import Litigations from "@/components/Profile/Default/Litigations";
import MeRenderer from "@/components/Profile/Default/MeRenderer";
import SignUp from "@/components/Profile/NotSignedUp/SignUp";
import ToLate from "@/components/Profile/NotSignedUp/ToLate";
import Temp from "@/components/Temp";
import Top from "@/components/Top";
import ProfilMulti from "@/components/ads/ProfilMulti";
import ProfilNormal from "@/components/ads/ProfilNormal";
import PostRenderer from "@/components/blogg/PostRenderer";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { GameStateContext } from "@/contexts/GameStateContext";
import { useApi } from "@/hooks/useApi";
import { Post } from "@/interfaces/Post";
import Link from "next/link";
import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

export const revalidate = 0;

function Page() {
  const [exists, setExists] = useState(false);
  const [loading, setLoading] = useState(true);

  const gameState = useContext(GameStateContext);

  const apiFetch = useApi();
  const { toast } = useToast();

  const fetchExists = async () => {
    const response = await apiFetch("/api/user/exists", { method: "GET" });
    if (response.status === 200) {
      setExists((await response.json()).exists);
      setLoading(false);
    } else {
      toast({
        title: "Något gick fel",
        description: "Kunde inte se om du finns eller inte :D, ladda om sidan",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchExists();
  }, []);

  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    console.log(ref.current?.clientWidth);
  });
  if (loading)
    return (
      <div>
        <Top text="Profil" />
        <p>Laddar</p>
      </div>
    );

  if (!exists) {
    if (gameState?.allowSignUp) {
      return <SignUp onJoin={fetchExists} />;
    }

    return <ToLate />;
  }

  return (
    <div className="w-full">
      <Top text="Profil" />
      <div className="w-full flex justify-center items-center">
        <div
          ref={ref}
          className="2xl:w-1/3 lg:w-2/3 w-11/12 flex justify-center items-center gap-8 pt-8 flex-col"
        >
          <MeRenderer />
          <ProfilNormal />
          <Circle />
          <ProfilNormal />
          <Kills />
          <ProfilMulti />
          <Litigations />
        </div>
      </div>
    </div>
  );
}

export default Page;
