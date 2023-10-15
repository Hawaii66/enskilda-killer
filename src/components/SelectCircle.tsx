import { useContext, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectGroup as SelectGroupInternal,
} from "./ui/select";
import { AllGroupsContext } from "@/contexts/AllGroupsContext";
import { Circle } from "@/interfaces/Circle";
import { AllCirclesContext } from "@/contexts/AllCirclesContext";
import { Separator } from "./ui/separator";

type Props =
  | {
      onChangeCircle?: (circle: Circle) => void;
      defaultCircle?: Circle;
      disabled?: boolean;
      includeEmpty?: false;
      emptyText?: "";
    }
  | {
      onChangeCircle?: (circle: Circle | undefined) => void;
      defaultCircle?: Circle;
      disabled?: boolean;
      includeEmpty: true;
      emptyText?: string;
    };

function SelectCircle({
  defaultCircle,
  onChangeCircle,
  disabled,
  includeEmpty = false,
  emptyText = "",
}: Props) {
  const circles = useContext(AllCirclesContext);

  return (
    <Select
      onValueChange={(g) => {
        const c = circles.find((i) => i.id.toString() === g);
        if (includeEmpty) {
          onChangeCircle && onChangeCircle(c as Circle);
        } else {
          onChangeCircle && c && onChangeCircle(c);
        }
      }}
      defaultValue={
        defaultCircle === undefined ? "-1" : defaultCircle.id.toString()
      }
      disabled={disabled}
    >
      <SelectTrigger>
        <SelectValue placeholder="Välj cirkel" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroupInternal className="flex flex-col gap-4">
          <SelectLabel>Välj Cirkel</SelectLabel>
          {includeEmpty && (
            <>
              <SelectItem value={"-1"}>
                {emptyText === "" ? "Ingen cirkel" : emptyText}
              </SelectItem>
              <Separator />
            </>
          )}
          <div>
            {circles.map((c) => (
              <SelectItem value={c.id.toString()}>{c.name}</SelectItem>
            ))}
          </div>
        </SelectGroupInternal>
      </SelectContent>
    </Select>
  );
}

export default SelectCircle;
