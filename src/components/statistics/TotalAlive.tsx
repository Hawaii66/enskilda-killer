"use client";

import React, { useContext, useState } from "react";
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
import { StatsContext } from "@/contexts/StatsContext";

type Props = {
  total: {
    circles: Map<number, number>;
    dead: number;
  };
};

ChartJS.register(ArcElement);

function TotalAlive({ total }: Props) {
  const { circles } = useContext(StatsContext);

  const labels = ["Döda", ...Array.from(circles).map((i) => i[1].name)];
  const data = [
    total.dead,
    ...Array.from(circles).map(
      (i) => Array.from(total.circles).find((j) => j[0] === i[0])?.[1] || 0
    ),
  ];

  const colors = ["#FF666696", ...Array.from(circles).map((i) => i[1].color)];

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
              labels,
              datasets: [
                {
                  label: "Antal",
                  backgroundColor: colors,
                  data,
                },
              ],
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default TotalAlive;
