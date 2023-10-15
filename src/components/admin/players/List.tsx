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
import React, { useState } from "react";
import UserRenderer from "./UserRenderer";
import { PlayerInfo } from "@/interfaces/Admin";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SelectUser from "@/components/SelectUser";
import { Input } from "@/components/ui/input";
import { useApi } from "@/hooks/useApi";
import { TargetUser } from "@/interfaces/User";
import SelectCircle from "@/components/SelectCircle";

type Props = {
  users: PlayerInfo[];
};

function List({ users: defaultUsers }: Props) {
  const [users, setUsers] = useState(defaultUsers);
  const [murderMode, setMurderMode] = useState<"ghost" | "murderer">(
    "murderer"
  );
  const [murderer, setMurderer] = useState<TargetUser>();
  const [target, setTarget] = useState<TargetUser>();
  const [circle, setCircle] = useState(1);

  const apiFetch = useApi();

  const updateUsers = async () => {
    const response = await apiFetch("/api/admin/players", { method: "GET" });
    if (response.status === 200) {
      setUsers(await response.json());
    }
  };

  const murder = async () => {
    if (!target) return;
    const data =
      murderer === undefined
        ? {
            target: target.id,
            circle,
          }
        : {
            target: target.id,
            circle,
            murderer: murderer.id,
          };

    const response = await apiFetch("/api/admin/murder", {
      method: "POST",
      body: data,
    });
    if (response.status === 200) {
      await updateUsers();
      alert("Kill confirmed");
    }
  };

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
              <div className="w-1/6 flex flex-row justify-between">
                <p>Id</p>
                <p>Status</p>
              </div>
              <p className="w-2/6">Användare</p>
              <p className="w-2/6">Target</p>
              <div className="w-1/6 flex flex-row justify-end items-center">
                Ändra
              </div>
            </div>
            {users
              .sort((a, b) => a.user.id - b.user.id)
              .map((user, idx) => (
                <UserRenderer
                  refresh={() => updateUsers()}
                  key={user.user.id}
                  index={idx}
                  user={user}
                />
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
          <Tabs
            onValueChange={(tab) => setMurderMode(tab as any)}
            defaultValue={"murderer"}
          >
            <TabsList>
              <TabsTrigger value="murderer">Mördare mördar</TabsTrigger>
              <TabsTrigger value="ghost">Offret dör</TabsTrigger>
            </TabsList>
            <TabsContent className="flex flex-row gap-4" value="murderer">
              <Label className="flex justify-center items-center w-28">
                Mördare
              </Label>
              <SelectUser onChangeUser={setMurderer} />
            </TabsContent>
            <TabsContent value="ghost">
              <p>Mördaren till offret kommer inte få ett nytt offer</p>
            </TabsContent>
          </Tabs>
          <div className="flex flex-grow gap-4">
            <Label className="flex justify-center items-center w-28">
              Offer
            </Label>
            <SelectUser onChangeUser={setTarget} />
          </div>
          <div className="flex flex-grow gap-4">
            <Label className="flex justify-center items-center w-28">
              Cirkel
            </Label>
            <div className="w-[200px]">
              <SelectCircle onChangeCircle={(c) => setCircle(c.id)} />
            </div>
          </div>
          <Button onClick={murder} className="w-1/5" variant={"outline"}>
            Mörda
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default List;
