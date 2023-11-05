import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useApi } from "@/hooks/useApi";
import { useBasicToast } from "@/hooks/useBasicToast";
import React, { useState } from "react";

type Props = {
  reasons: string[];
  refresh: () => void;
};

function LitigationReasons({ reasons, refresh }: Props) {
  const [litigations, setLitigations] = useState(reasons);
  const [newLitigation, setNewLitigation] = useState("");

  const apiFetch = useApi();
  const { toast, toastTitle } = useBasicToast();

  const save = async () => {
    const response = await apiFetch("/api/admin/save/litigations", {
      method: "POST",
      body: litigations,
    });
    if (response.status === 200) {
      toastTitle("Sparade", "Tvistemålen har sparats");
      refresh();
    } else {
      toast("Kunde inte spara");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tvistemåls anledningar</CardTitle>
        <CardDescription>
          Vilka anledningar kan man anmäla tvistemål för
        </CardDescription>
      </CardHeader>
      <CardContent>
        {litigations.map((lit) => (
          <div className="flex flex-row gap-4">
            <p>• {lit}</p>
            <Button
              onClick={() =>
                setLitigations((old) => old.filter((i) => i !== lit))
              }
              variant={"destructive"}
            >
              <Icons.delete className="w-4 h-4" />
            </Button>
          </div>
        ))}
        <div className="flex flex-row gap-4">
          <Label>Ny anledning</Label>
          <Input
            value={newLitigation}
            onChange={(e) => setNewLitigation(e.target.value)}
          />
          <Button
            onClick={() => {
              setLitigations((old) => [...old, newLitigation]);
              setNewLitigation("");
            }}
          >
            Ny
          </Button>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={save}>Spara</Button>
      </CardFooter>
    </Card>
  );
}

export default LitigationReasons;
