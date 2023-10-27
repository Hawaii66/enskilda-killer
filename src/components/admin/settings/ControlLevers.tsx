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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useApi } from "@/hooks/useApi";
import { useBasicToast } from "@/hooks/useBasicToast";
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
  const [showAlert, setShowAlert] = useState(!!defaultGameState.info);

  const apiFetch = useApi();
  const { toast, toastSave } = useBasicToast();

  const save = async () => {
    const response = await apiFetch("/api/admin/save/state", {
      method: "POST",
      body: state,
    });
    if (response.status === 200) {
      refresh();
      toastSave("Sparade styrspakarna");
    } else {
      toast("Kunde inte spara styrspakarna");
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
          <Label>Visa alert</Label>
          <Switch
            checked={showAlert}
            onCheckedChange={(s) => {
              if (!s) {
                setState({
                  ...state,
                  info: { header: "", text: "", type: "info" },
                });
              }
              setShowAlert(s);
            }}
          />
          <Label>Visa en alert på hela hemsidan med viktig information</Label>
          {showAlert && (
            <>
              <Label className="pl-4">Titel</Label>
              <Input
                value={state.info.header}
                onChange={(e) =>
                  setState({
                    ...state,
                    info: { ...state.info, header: e.target.value },
                  })
                }
              />
              <Label>Titel på alerten</Label>
              <Label className="pl-4">Text</Label>
              <Input
                value={state.info.text}
                onChange={(e) =>
                  setState({
                    ...state,
                    info: { ...state.info, text: e.target.value },
                  })
                }
              />
              <Label>Text på alerten</Label>
              <Label className="pl-4">Typ</Label>
              <Select
                value={state.info.type}
                onValueChange={(e) =>
                  setState({
                    ...state,
                    info: { ...state.info, type: e as any },
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue defaultValue={state.info.type} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="info">Info</SelectItem>
                    <SelectItem value="warning">Varning</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Label>Vilken typ av alert är det</Label>
            </>
          )}
        </div>
        <Separator />
      </CardContent>
      <CardFooter className="gap-4">
        <Button onClick={save}>Spara</Button>
        <p>OBS: om du ändrar alerten måste du ladda om sidan</p>
      </CardFooter>
    </Card>
  );
}

export default ControlLevers;
