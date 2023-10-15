"use client";

import SelectCircle from "@/components/SelectCircle";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AllCirclesContext } from "@/contexts/AllCirclesContext";
import { MovePlayersCriterie } from "@/interfaces/Admin";
import React, { useContext } from "react";

type Props = {
  criteria: MovePlayersCriterie;
  onChange: (data: MovePlayersCriterie) => void;
};

function CriteriaRenderer({ criteria, onChange }: Props) {
  const circles = useContext(AllCirclesContext);

  if (criteria.key === "maxKills") {
    return (
      <div className="flex flex-row justify-start items-center gap-2">
        <Label className="w-1/3">Du får max ha mördat</Label>
        <Input
          value={criteria.number.toString()}
          onChange={(e) =>
            onChange({
              ...criteria,
              number: isNaN(parseInt(e.target.value))
                ? 0
                : parseInt(e.target.value),
            })
          }
        />
        <SelectCircle
          defaultCircle={circles.find((i) => i.id === criteria.circle)}
          includeEmpty
          emptyText="Alla cirklar"
          onChangeCircle={(s) => onChange({ ...criteria, circle: s?.id })}
        />
      </div>
    );
  }

  if (criteria.key === "minKills") {
    return (
      <div className="flex flex-row justify-start items-center gap-2">
        <Label className="w-1/3">Du måste minst ha mördat</Label>
        <Input
          value={criteria.number.toString()}
          onChange={(e) =>
            onChange({
              ...criteria,
              number: isNaN(parseInt(e.target.value))
                ? 0
                : parseInt(e.target.value),
            })
          }
        />
        <SelectCircle
          defaultCircle={circles.find((i) => i.id === criteria.circle)}
          includeEmpty
          emptyText="Alla cirklar"
          onChangeCircle={(s) => onChange({ ...criteria, circle: s?.id })}
        />
      </div>
    );
  }
}

export default CriteriaRenderer;
