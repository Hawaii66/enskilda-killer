"use client";

import React, { useContext } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { format } from "date-fns";
import { GetOptions } from "@/functions/statsOptions";
import { StatsContext } from "@/contexts/StatsContext";
type Props = {
  kills: Map<number, Map<number, number>>;
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function TransformNull(arr: (number | null)[]) {
  var right = arr.length - 1;
  var maxRight = 0;

  while (right > 0) {
    if (arr[right] !== null) {
      maxRight = right;
      break;
    }

    right -= 1;
  }

  var i = 0;
  var hasSeenNumber = false;
  while (i < maxRight) {
    if (hasSeenNumber) {
      if (arr[i] === null) {
        arr[i] = 0;
      }
    } else {
      if (arr[i] !== null) {
        hasSeenNumber = true;
      }
    }

    i += 1;
  }

  return arr;
}

function KillsPerDay({ kills }: Props) {
  const { circles } = useContext(StatsContext);

  const datasets = Array.from(circles).map((circle) => ({
    label: circle[1].name,
    backgroundColor: circle[1].color,
    borderColor: circle[1].color,
    data: TransformNull(
      Array.from(kills).map((day) => day[1].get(circle[0]) || null)
    ),
  }));

  const labels = Array.from(kills).map((day) => format(day[0], "dd/MM"));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mord per dag</CardTitle>
        <CardDescription>
          Antalet mord per dag sedan Killer startade
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Line
          options={{
            ...GetOptions({ onlyIntegers: true }),
          }}
          data={{
            labels,
            datasets,
          }}
        />
      </CardContent>
    </Card>
  );
}

export default KillsPerDay;

/*

{
            labels: Array.from(kills).map((i) => format(i[0], "MM/dd")),
            datasets: [
              {
                data: Array.from(kills).map((i) => i[1].get(1)),
                label: "Kills per dag",
                backgroundColor: "#FF666696",
                borderColor: "#FF666696",
              },
            ],
          }}

*/
