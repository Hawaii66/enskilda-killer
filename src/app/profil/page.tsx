"use client";

import Circle from "@/components/Profile/Default/Circle";
import Kills from "@/components/Profile/Default/Kills";
import Litigations from "@/components/Profile/Default/Litigations";
import MeRenderer from "@/components/Profile/Default/MeRenderer";
import SignUp from "@/components/Profile/NotSignedUp/SignUp";
import ToLate from "@/components/Profile/NotSignedUp/ToLate";
import Top from "@/components/Top";
import PostRenderer from "@/components/blogg/PostRenderer";
import { Separator } from "@/components/ui/separator";
import { GameStateContext } from "@/contexts/GameStateContext";
import { useApi } from "@/hooks/useApi";
import { Post } from "@/interfaces/Post";
import React, { useContext, useEffect, useState } from "react";

export const revalidate = 0;

function Page() {
  const [exists, setExists] = useState(false);
  const [loading, setLoading] = useState(true);
  const [latestPost, setLatestPost] = useState<Post>();

  const gameState = useContext(GameStateContext);

  const apiFetch = useApi();

  const fetchExists = async () => {
    const response = await apiFetch("/api/user/exists", { method: "GET" });
    if (response.status === 200) {
      setExists((await response.json()).exists);
      setLoading(false);
    }
  };

  const fetchLatestPost = async () => {
    const response = await apiFetch("/api/post", { method: "GET" });
    if (response.status === 200) {
      setLatestPost(await response.json());
    }
  };

  useEffect(() => {
    fetchExists();
    fetchLatestPost();
  }, []);

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
    <div>
      <Top text="Profil" />
      <div className="w-full flex justify-center items-center">
        <div className="2xl:w-1/3 lg:w-2/3 w-11/12 flex justify-center items-center gap-8 pt-8 flex-col">
          {latestPost && (
            <div className="w-full">
              <PostRenderer post={latestPost} />
            </div>
          )}
          <Separator className="my-4" />
          <MeRenderer />

          <Circle />
          <Kills />
          <Litigations />
        </div>
      </div>
    </div>
  );
}

export default Page;
