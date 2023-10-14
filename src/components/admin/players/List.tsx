"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User } from "@/interfaces/User";
import React from "react";
import UserRenderer from "./UserRenderer";
import { PlayerInfo } from "@/interfaces/Admin";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SelectUser from "@/components/SelectUser";
import { Input } from "@/components/ui/input";

type Props = {
  users: PlayerInfo[];
};

function List({ users }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Alla spelare</CardTitle>
          <CardDescription>
            Filtrera spelarna eller visa alla anmälda personer
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg overflow-hidden ">
            <div
              className={`flex flex-row gap-4 py-2 px-2 bg-slate-100 underline`}
            >
              <p className="w-1/6">Id</p>
              <p className="w-2/6">Användare</p>
              <p className="w-2/6">Target</p>
              <div className="w-1/6 flex flex-row justify-end items-center">
                Ändra
              </div>
            </div>
            {users.map((user, idx) => (
              <UserRenderer key={user.user.id} index={idx} user={user} />
            ))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Genomför mord</CardTitle>
          <CardDescription>
            Genomför manuella mord för att till exempel lösa tvistemål
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Tabs defaultValue="murderer">
            <TabsList>
              <TabsTrigger value="murderer">Mördare mördar</TabsTrigger>
              <TabsTrigger value="ghost">Offret dör</TabsTrigger>
            </TabsList>
            <TabsContent className="flex flex-row gap-4" value="murderer">
              <Label className="flex justify-center items-center w-28">
                Mördare
              </Label>
              <SelectUser onChangeUser={() => {}} />
            </TabsContent>
            <TabsContent value="ghost"></TabsContent>
          </Tabs>
          <div className="flex flex-grow gap-4">
            <Label className="flex justify-center items-center w-28">
              Offer
            </Label>
            <SelectUser onChangeUser={() => {}} />
          </div>
          <div className="flex flex-grow gap-4">
            <Label className="flex justify-center items-center w-28">
              Cirkel
            </Label>
            <Input className="w-[200px]" />
          </div>
          <Button className="w-1/5" variant={"outline"}>
            Mörda
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default List;
