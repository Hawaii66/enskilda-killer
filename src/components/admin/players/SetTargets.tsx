"use client";

import SelectCircle from "@/components/SelectCircle";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useApi } from "@/hooks/useApi";
import { useBasicToast } from "@/hooks/useBasicToast";
import React, { useState } from "react";

type Props = {
  refresh: () => void;
};

function SetTargets({ refresh }: Props) {
  const [circle, setCircle] = useState<number>();

  const apiFetch = useApi();
  const { toast, toastTitle } = useBasicToast();

  const assignNewTargets = async () => {
    if (circle === undefined) {
      toast("Välj en cirkel först");
      return;
    }

    const response = await apiFetch("/api/admin/targets", {
      method: "POST",
      body: {
        circle: circle,
      },
    });
    if (response.status === 200) {
      toastTitle("Nya offer", "Alla i cirklen har fått nya offer");
      refresh();
    } else {
      toast("Kunde inte skapa nya offer");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Skapa offer</CardTitle>
        <CardDescription>
          Ge alla i en cirkel ett nytt offer, offren kommer gå i en cirkel
        </CardDescription>
      </CardHeader>
      <CardContent className="w-1/3">
        <SelectCircle onChangeCircle={(c) => setCircle(c.id)} />
      </CardContent>
      <CardFooter>
        <Button onClick={assignNewTargets}>Skapa nya offer</Button>
      </CardFooter>
    </Card>
  );
}

export default SetTargets;
