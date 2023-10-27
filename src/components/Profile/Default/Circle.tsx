"use client";

import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Button } from "../../ui/button";
import { Avatar, AvatarFallback } from "../../ui/avatar";
import { Switch } from "../../ui/switch";
import { Label } from "../../ui/label";
import { Skeleton } from "../../ui/skeleton";
import { Separator } from "../../ui/separator";
import { AlertDialog, AlertDialogTrigger } from "../../ui/alert-dialog";
import AlertMurder from "./AlertMurder";
import { Circle } from "@/interfaces/Profile";
import { useApi } from "@/hooks/useApi";
import { Icons } from "@/components/Icons";
import { GameStateContext } from "@/contexts/GameStateContext";
import { useBasicToast } from "@/hooks/useBasicToast";

function Circle() {
  const [circle, setCircle] = useState<Circle | null>(null);
  const [hasActiveCase, setHasActiveCase] = useState(false);

  const gameState = useContext(GameStateContext);

  const apiFetch = useApi();
  const { toast, toastTitle } = useBasicToast();

  const fetchCircle = async () => {
    const response = await apiFetch("/api/user/circle", { method: "GET" });
    if (response.status === 200) {
      setCircle(await response.json());
    } else {
      toast("Kunde inte hämta cirkeln");
    }
  };

  const fetchCase = async () => {
    const response = await apiFetch("/api/user/case", { method: "GET" });
    if (response.status === 200) {
      setHasActiveCase((await response.json()).hasCase);
    } else {
      toast("Kunde inte hämta om du har mördat eller har dött");
    }
  };

  const reportDeath = async (isMurderer: boolean) => {
    const response = await apiFetch("/api/game/report", {
      method: "POST",
      body: { isMurderer },
    });
    if (response.status === 200) {
      await fetchCase();
    } else {
      toast("Kunde inte rapportera mordet");
    }
  };

  const deleteDeath = async () => {
    const response = await apiFetch("/api/user/case", { method: "DELETE" });
    if (response.status === 200) {
      await fetchCase();
    } else {
      toast("Kunde inte rapportera att du dött");
    }
  };

  const update = async () => {
    await fetchCase();
    await fetchCircle();

    toastTitle("Uppdaterad", "Status är uppdaterad");
  };

  useEffect(() => {
    fetchCircle();
    fetchCase();
  }, []);

  if (!circle) {
    return <p>Laddar</p>;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Cirkel</CardTitle>
        <CardDescription>
          Se information om din aktiva cirkel och offer
        </CardDescription>
        <CardContent className="flex gap-4 flex-col">
          <div>
            <h3 className="font-bold text-lg">
              Status:{" "}
              <span
                className={`${
                  circle.status === "alive" ? "text-green-500" : "text-red-500"
                }`}
              >
                {circle.status === "alive" ? "Levande" : "Död"}
              </span>
            </h3>
            {circle.status === "alive" && (
              <p className="font-bold text-md">
                Cirkel: <span className="text-green-500">{circle.circle}</span>
              </p>
            )}
          </div>
          {circle.status === "alive" && <Separator />}
          {circle.status === "alive" && (
            <div className="flex gap-4 flex-col">
              <div className="flex flex-row justify-between items-start">
                <div className="flex flex-row gap-4">
                  <Avatar>
                    <AvatarFallback>
                      {circle.target.firstname.charAt(0)}
                      {circle.target.lastname.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3>
                      {circle.target.firstname} {circle.target.lastname}
                    </h3>
                    <p>{circle.target.group}</p>
                  </div>
                </div>
                <Button
                  onClick={update}
                  variant={"ghost"}
                  className="flex flex-row gap-2"
                >
                  <Icons.refresh className="w-4 h-4" /> Uppdatera
                </Button>
              </div>
            </div>
          )}
        </CardContent>
        {gameState?.isPaused ? (
          <CardFooter>
            <p className="text-lg font-bold text-gray-800">Spelet är pausat</p>
          </CardFooter>
        ) : (
          <>
            {circle.status === "alive" && (
              <CardFooter className="justify-evenly gap-4">
                {hasActiveCase ? (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant={"outline"}
                        className="text-red-500 w-1/2 border-red-500 border-2 hover:text-red-800 hover:border-red-800 hover:bg-white"
                      >
                        Rensa mord
                      </Button>
                    </AlertDialogTrigger>
                    <AlertMurder onClick={deleteDeath} />
                  </AlertDialog>
                ) : (
                  <>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant={"outline"}
                          className="text-red-500 border-red-500 hover:text-red-800 hover:border-red-800 hover:bg-white"
                        >
                          Jag har blivit mördad
                        </Button>
                      </AlertDialogTrigger>
                      <AlertMurder onClick={() => reportDeath(false)} />
                    </AlertDialog>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button className="bg-green-500 text-black hover:bg-green-800">
                          Jag har mördat någon
                        </Button>
                      </AlertDialogTrigger>
                      <AlertMurder onClick={() => reportDeath(true)} />
                    </AlertDialog>
                  </>
                )}
              </CardFooter>
            )}
          </>
        )}
      </CardHeader>
    </Card>
  );
}

export default Circle;
