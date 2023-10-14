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
import { useApi } from "@/hooks/useApi";
import { Rule } from "@/interfaces/Constants";
import React, { useState } from "react";

type Props = {
  rules: Rule[];
};

function Rules({ rules: defaultRules }: Props) {
  const [rules, setRules] = useState(
    defaultRules.sort((a, b) => b.index - a.index)
  );

  const apiFetch = useApi();

  const updateRule = (rule: Rule, index: number) => {
    const old = [...rules];
    old[index] = rule;
    setRules(old);
  };

  const save = async () => {
    const response = await apiFetch("/api/admin/save/rules", {
      method: "POST",
      body: rules,
    });
    if (response.status === 200) {
      const updatedRules = await apiFetch("/api/admin/rules", {
        method: "GET",
      });
      setRules(await updatedRules.json());
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Regler</CardTitle>
        <CardDescription>Ändra och skapa nya regler</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {rules.map((rule, idx) => (
          <Card key={idx}>
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
                <Button
                  onClick={() => setRules(rules.filter((_, i) => i !== idx))}
                  variant={"outline"}
                  className="flex flex-row gap-2"
                >
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
        <Button
          onClick={() =>
            setRules([...rules, { header: "", index: 0, rule: "" }])
          }
        >
          Ny regel
        </Button>
        <Button onClick={save}>Spara</Button>
      </CardFooter>
    </Card>
  );
}

export default Rules;
