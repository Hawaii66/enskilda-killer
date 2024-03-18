"use client";

import List from "@/components/backup/List";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { GameStateContext } from "@/contexts/GameStateContext";
import { AllowedBackup } from "@/interfaces/Constants";
import { format, getDayOfYear, set } from "date-fns";
import { LoaderIcon } from "lucide-react";
import React, { useContext, useState } from "react";

function Page() {
  const [loading, setLoading] = useState(false);
  const [backups, setBackups] = useState<AllowedBackup[]>([]);
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const currentDay = backups[currentDayIndex + currentTime / 60];

  const state = useContext(GameStateContext);

  const fetchData = async () => {
    setLoading(true);

    var offset = 0;
    while (true) {
      const result = await fetch(
        `/api/backup/get?offset=${offset}&year=${"2023"}`
      );
      const data: AllowedBackup[] = await result.json();
      console.log(data);
      if (data.length === 0) {
        break;
      }

      offset += 1;

      setBackups((backups) =>
        backups
          .concat(data.filter((i) => i.time > state?.startdate!))
          .toSorted((a, b) => a.time - b.time)
      );
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="text-center py-8 px-12 w-1/2">
        <h1 className="text-4xl font-bold">Tidigare</h1>
        <p>
          En backup har gjorts varje timme sedan Killer startades. Här kan du
          välja år och tid för att följa Killer genom backupsen. Du kan se vem
          din mördare var varje timme under hela Killer.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-8">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Inställningar</CardTitle>
            <CardDescription>
              Välj vilket år och vilken tidpunkt du vill se
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <div
              className="grid gap-4"
              style={{ gridTemplateColumns: "1fr 3fr 3fr" }}
            >
              <Label className="grid place-items-center">År</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue
                    defaultValue={"2023"}
                    placeholder="Välj ett år"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Years</SelectLabel>
                    <SelectItem value="2023">2023</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Label className="grid place-items-center">
                Välj vilket år du vill se
              </Label>
            </div>
          </CardContent>
          <CardFooter>
            <Button disabled={loading} onClick={fetchData}>
              Hämta ny data
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex flex-row justify-between items-center">
              Visning {loading && <LoaderIcon className="animate-spin" />}
            </CardTitle>
            <CardDescription>Vad ska visas?</CardDescription>
          </CardHeader>
          <CardContent>
            {backups.length > 0 ? (
              <>
                <div className="flex flex-row justify-between items-center font-bold text-lg">
                  <p>{format(backups[0].time, "dd/MM")}</p>
                  <p>{format(backups[backups.length - 1].time, "dd/MM")}</p>
                </div>
                <Slider
                  min={0}
                  max={backups.length}
                  onValueChange={(v) => setCurrentDayIndex(v[0])}
                  value={[currentDayIndex]}
                  step={24}
                  className="my-4"
                />
                <p>Vald dag: {format(currentDay.time, "dd/MM")}</p>
                <Separator className="my-4" />
                <div className="flex flex-row justify-between items-center font-bold text-lg">
                  <p>00:00</p>
                  <p>23:00</p>
                </div>
                <Slider
                  min={0}
                  max={23 * 60}
                  onValueChange={(v) => setCurrentTime(v[0])}
                  value={[currentTime]}
                  step={60}
                  className="my-4"
                />
                <p>
                  Vald tid:{" "}
                  {format(
                    set(currentDay.time, {
                      hours: Math.floor(currentTime / 60),
                      minutes: Math.floor((currentTime % 60) / 60),
                      seconds: currentTime % 60,
                    }),
                    "HH:mm"
                  )}
                </p>
                <Separator className="my-4" />
                <p>
                  Just nu visas backupen som togs:{" "}
                  <b className="font-bold">
                    {format(
                      set(currentDay.time, {
                        hours: Math.floor(currentTime / 60),
                        minutes: Math.floor((currentTime % 60) / 60),
                        seconds: currentTime % 60,
                      }),
                      "dd/MM HH:mm"
                    )}
                  </b>
                </p>
              </>
            ) : (
              <p>Hämta data till vänster först</p>
            )}
          </CardContent>
        </Card>
      </div>
      {currentDay && <List backup={currentDay} />}
      <p className="pt-8">
        <b>Ej fungerande just nu:</b> Flera offer och mördare visas inte (en
        väljs slumpvis). Konstiga saker kan hända på helger eller utanför
        speltiden då cirkeln görs om och testas
      </p>
    </div>
  );
}

export default Page;
