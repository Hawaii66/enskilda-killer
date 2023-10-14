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
import React from "react";

const circles = ["Normal", "De dödas cirkel"];

function Circles() {
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
            <p>• {circle}</p>
          ))}
        </div>
        <Separator />
        <div className="grid grid-cols-2 gap-4 w-1/2">
          <Label>Skapa cirkel</Label>
          <Input placeholder="Ny cirkels namn" />
          <Button>Skapa</Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default Circles;
