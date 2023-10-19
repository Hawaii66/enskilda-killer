"use client";

import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AllGroupsContext } from "@/contexts/AllGroupsContext";
import { useApi } from "@/hooks/useApi";
import { useBasicToast } from "@/hooks/useBasicToast";
import React, { useContext, useState } from "react";

function Groups() {
  const defaultGroups = useContext(AllGroupsContext);

  const [groups, setGroups] = useState(defaultGroups);
  const [groupName, setGroupName] = useState("");

  const apiFetch = useApi();
  const { toast, toastSave } = useBasicToast();

  const save = async () => {
    const response = await apiFetch("/api/admin/save/groups", {
      method: "POST",
      body: groups,
    });
    if (response.status === 200) {
      toastSave("Sparade klasserna, ladda om sidan för att se resultaten");
    } else {
      toast("Kunde inte spara klasserna");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Klasser</CardTitle>
        <CardDescription>Vilka klasser kan anmäla sig</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <ul className="gap-4 flex flex-col">
          {groups.map((group) => (
            <li className="flex flex-row gap-4">
              <p className="w-24">• {group}</p>
              <Button
                className="h-6"
                variant={"destructive"}
                onClick={() =>
                  setGroups((old) => old.filter((i) => i !== group))
                }
              >
                <Icons.delete className="w-4 h-4" />
              </Button>
            </li>
          ))}
        </ul>
        <div className="grid grid-cols-2 gap-4 w-1/2">
          <Label>Skapa klass</Label>
          <Input
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="Ny cirkels namn"
          />
          <Button onClick={() => setGroups((o) => [...o, groupName])}>
            Skapa
          </Button>
        </div>
      </CardContent>
      <CardFooter className="gap-4">
        <Button onClick={save}>Spara</Button>
        <p>När du sparar klasser måste du ladda om sidan!</p>
      </CardFooter>
    </Card>
  );
}

export default Groups;
