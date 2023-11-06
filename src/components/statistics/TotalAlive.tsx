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
              labels: [
                `Levande: ${Math.round(
                  (total.alive / (total.alive + total.dead)) * 100
                )}%`,
                `Döda: ${Math.round(
                  (total.dead / (total.alive + total.dead)) * 100
                )}%`,
              ],
              datasets: [
                {
                  label: "Antal",
                  backgroundColor: ["#A6FF9696", "#FF666696"],
                  data: [total.alive, total.dead],
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
