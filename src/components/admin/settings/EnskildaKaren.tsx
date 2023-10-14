"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useApi } from "@/hooks/useApi";
import React, { useState } from "react";

type Props = {
  elevkaren: string;
  refresh: () => void;
};

function EnskildaKaren({ elevkaren: defaultText, refresh }: Props) {
  const [text, setText] = useState(defaultText);

  const apiFetch = useApi();

  const save = async () => {
    const response = await apiFetch("/api/admin/save/elevkaren", {
      method: "POST",
      body: text,
    });
    if (response.status === 200) {
      refresh();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Enskidakåren</CardTitle>
        <CardDescription>Vad ska stå på enskilda kårens sida</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        <Label>Text</Label>
        <Textarea
          className="h-48"
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <Separator />
        <Separator />
        <Label>Renderad</Label>
        <div
          className="text-center"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </CardContent>
      <CardFooter>
        <Button onClick={save}>Spara</Button>
      </CardFooter>
    </Card>
  );
}

export default EnskildaKaren;
