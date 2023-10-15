"use client";

import SelectCircle from "@/components/SelectCircle";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { AllCirclesContext } from "@/contexts/AllCirclesContext";
import { BulkMoveInfo, MovePlayersCriterie } from "@/interfaces/Admin";
import { Circle } from "@/interfaces/Circle";
import React, { useContext, useState } from "react";
import CriteriaRenderer from "./CriteriaRenderer";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useApi } from "@/hooks/useApi";

type Props = {
  refresh: () => void;
};

function MovePlayers({ refresh }: Props) {
  const [activeCircle, setActiveCircle] = useState<Circle>();
  const [endCircle, setEndCircle] = useState<Circle>();
  const [criterias, setCriterias] = useState<MovePlayersCriterie[]>([]);
  const [newCriteriaType, setNewCriteriaType] =
    useState<MovePlayersCriterie["key"]>("maxKills");

  const apiFetch = useApi();

  const changeCriteria = (c: MovePlayersCriterie, idx: number) => {
    const old = [...criterias];
    old[idx] = c;
    setCriterias(old);
  };

  const newCriteria = () => {
    switch (newCriteriaType) {
      case "maxKills":
        setCriterias((o) => [...o, { key: "maxKills", number: 0 }]);
        break;
      case "minKills":
        setCriterias((o) => [...o, { key: "minKills", number: 0 }]);
        break;
      default:
        const _: never = newCriteriaType;
    }
  };

  const move = async () => {
    const toSend: BulkMoveInfo = {
      criterias: criterias,
      from: activeCircle?.id,
      to: endCircle?.id,
    };
    const response = await apiFetch("/api/admin/move", {
      method: "POST",
      body: toSend,
    });
    if (response.status === 200) {
      alert("Successfull move");
      refresh();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bulk flytta spelare</CardTitle>
        <CardDescription>Flytta spelare till cirklar</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="grid gap-4" style={{ gridTemplateColumns: "1fr 3fr" }}>
          <Label>Start cirkel</Label>
          <SelectCircle
            includeEmpty
            onChangeCircle={setActiveCircle}
            defaultCircle={activeCircle}
          />
          <Label>Slut cirkel</Label>
          <SelectCircle
            includeEmpty
            onChangeCircle={setEndCircle}
            defaultCircle={endCircle}
          />
        </div>
        <div>
          <p>Kriterier</p>
          <div className="flex flex-col my-4 w-1/2 gap-2">
            {criterias.map((c, idx) => (
              <CriteriaRenderer
                criteria={c}
                onChange={(updatedC) => changeCriteria(updatedC, idx)}
              />
            ))}
          </div>
          <div className="flex flex-row w-1/3 gap-4">
            <Button className="w-1/2" onClick={newCriteria}>
              Nytt kriterie
            </Button>
            <Select
              defaultValue="maxKills"
              onValueChange={(e) => setNewCriteriaType(e as any)}
            >
              <SelectTrigger>
                <SelectValue>{newCriteriaType}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="minKills">Min kills</SelectItem>
                  <SelectItem value="maxKills">Max kills</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button onClick={move} variant={"destructive"} className="w-1/3">
          Bulk flytta
        </Button>
      </CardContent>
    </Card>
  );
}

export default MovePlayers;
