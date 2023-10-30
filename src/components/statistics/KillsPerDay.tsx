"use client";

import React from "react";
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
type Props = {
  kills: Map<number, number>;
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

function KillsPerDay({ kills }: Props) {
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
          options={GetOptions({ onlyIntegers: true })}
          data={{
            labels: Array.from(kills).map((i) => format(i[0], "MM/dd")),
            datasets: [
              {
                data: Array.from(kills).map((i) => i[1]),
                label: "Kills per dag",
                backgroundColor: "#FF666696",
                borderColor: "#FF666696",
              },
            ],
          }}
        />
      </CardContent>
    </Card>
  );
}

export default KillsPerDay;
