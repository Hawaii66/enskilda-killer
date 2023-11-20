"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
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
import { StatsContext } from "@/contexts/StatsContext";
import { Slider } from "../ui/slider";

type Props = {
  kills: Map<string, { alive: boolean; kills: Map<number, number> }>;
};

function MostKills({ kills }: Props) {
  const { circles } = useContext(StatsContext);
  const [count, setCount] = useState([10]);
  const [showAlive, setShowAlive] = useState(false);
  const [activeCircle, setActiveCircles] = useState(
    Array.from(circles).map((i) => ({
      enabled: !i[1].hidden,
      circle: i[1],
    }))
  );

  const compareSortKills = (a: Map<number, number>, b: Map<number, number>) => {
    var totalA = 0;
    var totalB = 0;
    Array.from(a).forEach((circle) => {
      if (activeCircle.find((i) => i.circle.id === circle[0])?.enabled) {
        totalA += circle[1];
      }
    });
    Array.from(b).forEach((circle) => {
      if (activeCircle.find((i) => i.circle.id === circle[0])?.enabled) {
        totalB += circle[1];
      }
    });

    return totalB - totalA;
  };

  const filteredUsers = Array.from(kills)
    .filter((i) => (showAlive ? i[1].alive : true))
    .map((user) => {
      const newKills: Map<number, number> = new Map();
      Array.from(user[1].kills).map((circle) => {
        if (activeCircle.find((i) => i.circle.id === circle[0])?.enabled) {
          newKills.set(circle[0], circle[1]);
        }
      });

      const u: typeof user = [
        user[0],
        {
          alive: user[1].alive,
          kills: newKills,
        },
      ];

      return u;
    })
    .filter((i) => i[1].kills.size > 0)
    .sort((a, b) => compareSortKills(a[1].kills, b[1].kills));

  const labels = filteredUsers.map((i) => i[0]).filter((_, i) => i < count[0]);

  const datasets = Array.from(circles)
    .filter((c) => activeCircle.find((i) => i.circle.id === c[1].id)?.enabled)
    .map((circle) => ({
      label: circle[1].name,
      backgroundColor: circle[1].color,
      stack: "0",
      data: filteredUsers.map((user) => user[1].kills.get(circle[0]) ?? 0),
    }))
    .filter((_, i) => i < count[0]);

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
            options={{
              ...GetOptions({ onlyIntegers: true }),
              plugins: {
                legend: {
                  display: false,
                },
              },
            }}
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
                },
                y: {
                  ticks: {
                    autoSkip: false,
                  },
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
      <CardFooter className="gap-4 flex flex-col justify-center items-start">
        <div className="flex flex-row gap-4">
          <Label>Visa endast levande</Label>
          <Switch checked={showAlive} onCheckedChange={setShowAlive} />
        </div>
        {activeCircle.map((circle) => {
          return (
            <div className="flex flex-row gap-4">
              <Label>{circle.circle.name}</Label>
              <Switch
                color={circle.circle.color}
                checked={circle.enabled}
                onCheckedChange={(s) =>
                  setActiveCircles((old) =>
                    old.map((c) => {
                      if (c.circle.name === circle.circle.name) {
                        return {
                          ...c,
                          enabled: s,
                        };
                      }
                      return c;
                    })
                  )
                }
              />
            </div>
          );
        })}
        <Label>Antalet personer: {count}</Label>
        <Slider
          className="flex-grow"
          min={5}
          max={15}
          step={1}
          defaultValue={count}
          onValueChange={setCount}
        />
      </CardFooter>
    </Card>
  );
}

export default MostKills;

/*
{
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
            }

*/
