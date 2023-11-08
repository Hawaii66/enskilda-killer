"use client";

import React, { useContext } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { GetOptions } from "@/functions/statsOptions";
import { Bar } from "react-chartjs-2";
import { StatsContext } from "@/contexts/StatsContext";

type Props = {
  kills: Map<string, Map<number, number>>;
};

function GroupKills({ kills }: Props) {
  const { circles } = useContext(StatsContext);

  const labels = Array.from(kills).map((i) => i[0]);
  const datasets = Array.from(circles).map((circle) => ({
    label: circle[1].name,
    backgroundColor: circle[1].color,
    data: Array.from(kills).map((group) => group[1].get(circle[0]) || 0),
  }));

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
            options={GetOptions({ onlyIntegers: true, stacked: true })}
            data={{
              labels,
              datasets,
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
            data={{ labels, datasets }}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default GroupKills;
