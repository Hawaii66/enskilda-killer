"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { Skeleton } from "../ui/skeleton";
import { Separator } from "../ui/separator";
import { AlertDialog, AlertDialogTrigger } from "../ui/alert-dialog";
import AlertMurder from "./AlertMurder";
import { Circle } from "@/interfaces/Profile";
import { useApi } from "@/hooks/useApi";

function Circle() {
  const [showTarget, setShowTarget] = useState(false);
  const [circle, setCircle] = useState<Circle | null>(null);

  const apiFetch = useApi();

  const fetchCircle = async () => {
    const response = await apiFetch("/api/user/circle", { method: "GET" });
    if (response.status === 200) {
      setCircle(await response.json());
    }
  };

  useEffect(() => {
    fetchCircle();
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
          <Separator />
          {circle.status === "alive" && (
            <div className="flex gap-4 flex-col">
              <div className="flex items-center gap-2">
                <Switch checked={showTarget} onCheckedChange={setShowTarget} />
                <Label>Visa offer</Label>
              </div>
              {showTarget ? (
                <div className="flex flex-row gap-4">
                  <Avatar>
                    <AvatarFallback>
                      {circle.target.firstname.charAt(0)}{" "}
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
              ) : (
                <div className="flex flex-row gap-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div>
                    <Skeleton className="h-4 mb-2 w-36" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter className="justify-evenly gap-4">
          <AlertDialog>
            <AlertDialogTrigger>
              <Button
                variant={"outline"}
                className="text-red-500 border-red-500 hover:text-red-800 hover:border-red-800 hover:bg-white"
              >
                Jag har blivit mördad
              </Button>
            </AlertDialogTrigger>
            <AlertMurder />
          </AlertDialog>
          <AlertDialog>
            <AlertDialogTrigger>
              <Button className="bg-green-500 text-black hover:bg-green-800">
                Jag har mördat någon
              </Button>
            </AlertDialogTrigger>
            <AlertMurder />
          </AlertDialog>
        </CardFooter>
      </CardHeader>
    </Card>
  );
}

export default Circle;
