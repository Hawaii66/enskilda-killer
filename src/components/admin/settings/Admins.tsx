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
import { Separator } from "@/components/ui/separator";
import { useApi } from "@/hooks/useApi";
import React, { useState } from "react";

type Props = {
  admins: string[];
  refresh: () => void;
};

function Admins({ admins: defaultAdmins, refresh }: Props) {
  const [admins, setAdmins] = useState(defaultAdmins);
  const [name, setName] = useState("");

  const apiFetch = useApi();

  const newAdmin = () => {
    setAdmins((a) => [...a, name]);
  };

  const save = async () => {
    const response = await apiFetch("/api/admin/save/admins", {
      method: "POST",
      body: admins,
    });
    if (response.status === 200) {
      refresh();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Admins</CardTitle>
        <CardDescription>Vilka har tillgång till admin sidorna</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {admins.map((admin) => (
          <div className="flex flex-row gap-4 items-center">
            <p>{admin}</p>
            <Button
              onClick={() => setAdmins((e) => e.filter((i) => i !== admin))}
              variant={"destructive"}
            >
              <Icons.delete className="w-4 h-4" />
            </Button>
          </div>
        ))}
        <Separator />

        <div className="flex flex-row gap-4">
          <Label>Ny admin</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
          <Button onClick={newAdmin}>Ny admin</Button>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={save}>Spara</Button>
      </CardFooter>
    </Card>
  );
}

export default Admins;
