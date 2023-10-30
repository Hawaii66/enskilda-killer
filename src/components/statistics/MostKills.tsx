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
import { Bar } from "react-chartjs-2";
import { GetOptions } from "@/functions/statsOptions";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";

type Props = {
  kills: Map<string, { alive: boolean; kills: number }>;
};

function MostKills({ kills }: Props) {
  const [showAlive, setShowAlive] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personer med flest mord</CardTitle>
        <CardDescription>
          Visar de 10 personer som har mördat flest personer, inkluderar döda
          och levande
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Bar
          options={GetOptions({ onlyIntegers: true })}
          data={{
            labels: Array.from(kills)
              .filter((i) => (showAlive ? i[1].alive : true))
              .map((i) => i[0]),
            datasets: [
              {
                label: `Mord (${
                  showAlive
                    ? "visar endast personer i en cirkel"
                    : "visar även döda personer"
                })`,
                data: Array.from(kills)
                  .filter((i) => (showAlive ? i[1].alive : true))
                  .map((i) => i[1].kills),
              },
            ],
          }}
        />
      </CardContent>
      <CardFooter className="gap-4">
        <Label>Visa endast levande</Label>
        <Switch checked={showAlive} onCheckedChange={setShowAlive} />
      </CardFooter>
    </Card>
  );
}

export default MostKills;
