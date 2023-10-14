"use client";

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
import { Textarea } from "@/components/ui/textarea";
import { Rule } from "@/interfaces/Constants";
import React, { useState } from "react";

type Props = {
  rules: Rule[];
};

function Rules({ rules: defaultRules }: Props) {
  const [rules, setRules] = useState(
    defaultRules.sort((a, b) => b.index - a.index)
  );

  const updateRule = (rule: Rule, index: number) => {
    const old = [...rules];
    old[index] = rule;
    setRules(old);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Regler</CardTitle>
        <CardDescription>Ändra och skapa nya regler</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {rules.map((rule, idx) => (
          <Card key={rule.header}>
            <CardContent className="grid grid-cols-2 gap-2 my-4">
              <Label>Titel</Label>
              <Input
                value={rule.header}
                onChange={(e) =>
                  updateRule({ ...rule, header: e.target.value }, idx)
                }
              />
              <Label>
                Index (för att placera reglerna i en specifik ordning)
              </Label>
              <Input
                value={rule.index}
                onChange={(e) =>
                  updateRule(
                    { ...rule, index: parseInt(e.target.value) || 0 },
                    idx
                  )
                }
              />
              <Label>Beskrivning</Label>
              <Textarea
                value={rule.rule}
                onChange={(e) =>
                  updateRule({ ...rule, rule: e.target.value }, idx)
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
        <Button>Ny regel</Button>
        <Button>Spara</Button>
      </CardFooter>
    </Card>
  );
}

export default Rules;
