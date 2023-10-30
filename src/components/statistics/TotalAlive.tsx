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
import { Chart as ChartJS, ArcElement } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";

type Props = {
  total: {
    alive: number;
    dead: number;
  };
};

ChartJS.register(ArcElement);

function TotalAlive({ total }: Props) {
  const [inPercent, setInPercent] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Antalet levanade</CardTitle>
        <CardDescription>
          Levande inkluderar alla som befinner sig i en cirkel
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center items-center">
        <div className="md:w-1/2 w-full">
          <Pie
            data={{
              labels: ["Levande", "Döda"],
              datasets: [
                {
                  label: inPercent ? "Procent" : "Antal",
                  backgroundColor: ["#A6FF9696", "#FF666696"],
                  data: [
                    total.alive / (inPercent ? total.alive + total.dead : 1),
                    total.dead / (inPercent ? total.alive + total.dead : 1),
                  ].map((i) => (inPercent ? Math.round(i * 100) : i)),
                },
              ],
            }}
            options={{
              plugins: {
                tooltip: {
                  callbacks: inPercent
                    ? {
                        label: (e) => `${e.label}: ${e.raw}%`,
                      }
                    : undefined,
                },
              },
            }}
          />
        </div>
      </CardContent>
      <CardFooter className="gap-4">
        <Label>Visa procent</Label>
        <Switch checked={inPercent} onCheckedChange={setInPercent} />
      </CardFooter>
    </Card>
  );
}

export default TotalAlive;
