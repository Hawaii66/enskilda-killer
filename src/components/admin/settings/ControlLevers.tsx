"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useApi } from "@/hooks/useApi";
import { GameState } from "@/interfaces/Constants";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React, { useState } from "react";

type Props = {
  gameState: GameState;
  refresh: () => void;
};

function ControlLevers({ gameState: defaultGameState, refresh }: Props) {
  const [state, setState] = useState(defaultGameState);

  const apiFetch = useApi();

  const save = async () => {
    const response = await apiFetch("/api/admin/save/state", {
      method: "POST",
      body: state,
    });
    if (response.status === 200) {
      refresh();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Styr spakar</CardTitle>
        <CardDescription>
          Styr i vilket läge spelet befinner sig
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 mb-4 grid-cols-3">
          <Label>Pausa</Label>
          <Switch
            checked={state.isPaused}
            onCheckedChange={(s) => setState({ ...state, isPaused: s })}
          />
          <Label>Om spelet är pausat kan ingen mörda</Label>
          <Label>Tillåt registrering</Label>
          <Switch
            checked={state.allowSignUp}
            onCheckedChange={(s) => setState({ ...state, allowSignUp: s })}
          />
          <Label>Nya spelar kan skapa ett konto</Label>
          <Label>Killer Startade</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[280px] justify-start text-left font-normal",
                  !state.startdate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {state ? (
                  format(state.startdate, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-white z-40 border">
              <Calendar
                mode="single"
                selected={new Date(state.startdate)}
                onSelect={(e) =>
                  setState({ ...state, startdate: e?.getTime() || Date.now() })
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Label>Den först dagen mord kan ske</Label>
        </div>
        <Separator />
      </CardContent>
      <CardFooter>
        <Button onClick={save}>Spara</Button>
      </CardFooter>
    </Card>
  );
}

export default ControlLevers;
