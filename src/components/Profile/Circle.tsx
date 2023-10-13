"use client";

import React, { useState } from "react";
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

const isAlive = true;

function Circle() {
  const [showTarget, setShowTarget] = useState(false);

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
                className={`${isAlive ? "text-green-500" : "text-red-500"}`}
              >
                {isAlive ? "Levande" : "Död"}
              </span>
            </h3>
            <p className="font-bold text-md">
              Cirkel: <span className="text-green-500">Stora</span>
            </p>
          </div>
          <Separator />
          {isAlive && (
            <div className="flex gap-4 flex-col">
              <div className="flex items-center gap-2">
                <Switch checked={showTarget} onCheckedChange={setShowTarget} />
                <Label>Visa offer</Label>
              </div>
              {showTarget ? (
                <div className="flex flex-row gap-4">
                  <Avatar>
                    <AvatarFallback>KA</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3>Karar Asheer</h3>
                    <p>Na21B</p>
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
