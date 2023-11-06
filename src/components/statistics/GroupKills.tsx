"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { GetOptions } from "@/functions/statsOptions";
import { Bar } from "react-chartjs-2";

type Props = {
  kills: Map<string, number>;
};

function GroupKills({ kills }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Antalet mord per klass</CardTitle>
        <CardDescription>
          Visar antalet mord i varje klass, alla mord räknas alltså i alla
          cirklar
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="hidden lg:block">
          <Bar
            options={GetOptions({ onlyIntegers: true })}
            data={{
              labels: Array.from(kills)
                .sort((a, b) => a[0].localeCompare(b[0]))
                .sort((a, b) => a[0].length - b[0].length)
                .map((i) => i[0]),
              datasets: [
                {
                  label: "Mord",
                  data: Array.from(kills)
                    .sort((a, b) => a[0].localeCompare(b[0]))
                    .sort((a, b) => a[0].length - b[0].length)
                    .map((i) => i[1]),
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
                .sort((a, b) => a[0].localeCompare(b[0]))
                .sort((a, b) => a[0].length - b[0].length)
                .map((i) => i[0]),
              datasets: [
                {
                  label: "Mord",
                  data: Array.from(kills)
                    .sort((a, b) => a[0].localeCompare(b[0]))
                    .sort((a, b) => a[0].length - b[0].length)
                    .map((i) => i[1]),
                },
              ],
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default GroupKills;
