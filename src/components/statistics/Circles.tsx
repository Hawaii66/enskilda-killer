"use client";

import { supabase } from "@/functions/supabase";
import React, { useContext, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { GetOptions } from "@/functions/statsOptions";
import { StatsContext } from "@/contexts/StatsContext";

type Props = {
  groups: Map<string, { circles: Map<number, number>; dead: number }>;
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Circles({ groups }: Props) {
  const { circles } = useContext(StatsContext);

  console.log(groups);

  const groupsSortedArray = Array.from(groups)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .sort((a, b) => a[0].length - b[0].length);

  const datasets = [
    ...Array.from(circles).map((circle) => ({
      label: circle[1].name,
      backgroundColor: circle[1].color,
      data: [
        ...groupsSortedArray.map(
          (group) => group[1].circles.get(circle[0]) || 0
        ),
      ],
      stack: "0",
    })),
    {
      label: "Döda",
      data: groupsSortedArray.map((g) => g[1].dead),
      backgroundColor: "#FF666696",
      stack: "0",
    },
  ];
  const labels = [...groupsSortedArray.map((i) => i[0])];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Antal levande</CardTitle>
        <CardDescription>
          Levande personer inkluderar alla personer som är med i en cirkel
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="hidden lg:block">
          <Bar
            options={GetOptions({ onlyIntegers: true, stacked: true })}
            data={{
              labels: labels,
              datasets: datasets,
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
                  stacked: true,
                },
                y: {
                  ticks: {
                    autoSkip: false,
                  },
                  stacked: true,
                },
              },
            }}
            data={{
              labels: labels,
              datasets: datasets,
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default Circles;
