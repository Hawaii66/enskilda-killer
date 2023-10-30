"use client";

import { supabase } from "@/functions/supabase";
import React, { useState } from "react";
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

type Props = {
  circles: Map<string, { alive: number; dead: number }>;
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Circles({ circles }: Props) {
  const [order, setOrder] = useState(false);

  const datasets = [
    {
      label: "Levande",
      data: Array.from(circles)
        .sort((a, b) => a[0].localeCompare(b[0]))
        .sort((a, b) => a[0].length - b[0].length)
        .map((i) => i[1].alive),
      backgroundColor: "#A6FF9696",
      stack: "0",
    },
    {
      label: "Döda",
      data: Array.from(circles)
        .sort((a, b) => a[0].localeCompare(b[0]))
        .sort((a, b) => a[0].length - b[0].length)
        .map((i) => i[1].dead),
      backgroundColor: "#FF666696",
      stack: "0",
    },
  ];

  if (order) {
    datasets.reverse();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Antal levande</CardTitle>
        <CardDescription>
          Levande personer inkluderar alla personer som är med i en cirkel
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Bar
          options={GetOptions({ onlyIntegers: true })}
          data={{
            labels: Array.from(circles)
              .sort((a, b) => a[0].localeCompare(b[0]))
              .sort((a, b) => a[0].length - b[0].length)
              .map((i) => i[0]),
            datasets: datasets,
          }}
        />
      </CardContent>
      <CardFooter>
        <Button onClick={() => setOrder((s) => !s)}>Byt ordning</Button>
      </CardFooter>
    </Card>
  );
}

export default Circles;
