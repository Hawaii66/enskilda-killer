"use client";

import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Concept, Rule } from "@/interfaces/Constants";
import React, { useState } from "react";

type Props = {
  concepts: Concept[];
};

function Concepts({ concepts: defaultConcepts }: Props) {
  const [concepts, setConcepts] = useState(
    defaultConcepts.sort((a, b) => b.index - a.index)
  );

  const updateRule = (rule: Concept, index: number) => {
    const old = [...concepts];
    old[index] = rule;
    setConcepts(old);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Begrepp</CardTitle>
        <CardDescription>Ändra och skapa nya begrepp</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {concepts.map((concept, idx) => (
          <Card key={idx}>
            <CardContent className="grid grid-cols-2 gap-2 my-4">
              <Label>
                Index (för att placera begreppen i en specifik ordning)
              </Label>
              <Input
                value={concept.index}
                onChange={(e) =>
                  updateRule(
                    { ...concept, index: parseInt(e.target.value) || 0 },
                    idx
                  )
                }
              />
              <Label>Beskrivning</Label>
              <Textarea
                value={concept.concept}
                onChange={(e) =>
                  updateRule({ ...concept, concept: e.target.value }, idx)
                }
                className="h-36"
              />
              <div className="w-1/2">
                <Button variant={"outline"} className="flex flex-row gap-2">
                  <Icons.delete className="w-4 h-4" /> <p>Ta bort</p>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        <Separator />
        <div></div>
      </CardContent>
      <CardFooter className="flex flex-row gap-4">
        <Button>Nytt begrepp</Button>
        <Button>Spara</Button>
      </CardFooter>
    </Card>
  );
}

export default Concepts;
