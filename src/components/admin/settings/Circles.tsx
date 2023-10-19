import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useApi } from "@/hooks/useApi";
import { useBasicToast } from "@/hooks/useBasicToast";
import { Circle } from "@/interfaces/Circle";
import React, { useState } from "react";

type Props = {
  refresh: () => void;
  circles: Circle[];
};

function Circles({ circles, refresh }: Props) {
  const [name, setName] = useState("");

  const apiFetch = useApi();
  const { toast, toastSave } = useBasicToast();

  const addCircle = async () => {
    const response = await apiFetch("/api/admin/save/circles", {
      method: "POST",
      body: [...circles, { name: name }],
    });
    if (response.status === 200) {
      refresh();
      toastSave(
        "Cirkeln har sparats, ladda om sidan för att se den nya cirkeln"
      );
    } else {
      toast("Kunde inte spara den nya cirkeln");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cirklar</CardTitle>
        <CardDescription>
          Skapa cirklar som spelare mördas inom.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div>
          {circles.map((circle) => (
            <p>• {circle.name}</p>
          ))}
        </div>
        <Separator />
        <div className="grid grid-cols-2 gap-4 w-1/2">
          <Label>Skapa cirkel</Label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ny cirkels namn"
          />
          <Button onClick={addCircle}>Skapa</Button>{" "}
          <p>Ladda om sidan efteråt</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default Circles;
