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
        <div className="hidden lg:block">
          <Bar
            options={GetOptions({ onlyIntegers: true })}
            data={{
              labels: Array.from(kills)
                .filter((i) => (showAlive ? i[1].alive : true))
                .filter((_, i) => i < 10)
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
                    .filter((_, i) => i < 10)
                    .map((i) => i[1].kills),
                },
              ],
            }}
          />
        </div>
        <div className="lg:hidden h-96">
          <Bar
            options={{
              maintainAspectRatio: false,
              indexAxis: "y",
              scales: {
                x: {
                  beginAtZero: true,
                  ticks: {
                    callback: (i: any) => {
                      if (i % 1 === 0) {
                        return i;
                      }
                      return undefined;
                    },
                  },
                },
                y: {
                  ticks: {
                    autoSkip: false,
                  },
                },
              },
            }}
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
                  backgroundColor: Array.from(kills)
                    .filter((i) => (showAlive ? i[1].alive : true))
                    .map((i) => (i[1].alive ? "#A6FF9696" : "#FF666696")),
                },
              ],
            }}
          />
        </div>
      </CardContent>
      <CardFooter className="gap-4">
        <Label>Visa endast levande</Label>
        <Switch checked={showAlive} onCheckedChange={setShowAlive} />
      </CardFooter>
    </Card>
  );
}

export default MostKills;
