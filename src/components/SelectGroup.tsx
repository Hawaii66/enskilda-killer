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

type Props = {
  onChangeGroup?: (group: string) => void;
  defaultGroup?: string;
  disabled?: boolean;
};

function SelectGroup({ defaultGroup, onChangeGroup, disabled }: Props) {
  const groups = useContext(AllGroupsContext);

  return (
    <Select
      onValueChange={(g) => {
        onChangeGroup && onChangeGroup(g);
      }}
      defaultValue={defaultGroup}
      disabled={disabled}
    >
      <SelectTrigger>
        <SelectValue placeholder="Välj klass" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroupInternal>
          <SelectLabel>Välj klass</SelectLabel>
          {groups.map((group) => (
            <SelectItem value={group}>{group}</SelectItem>
          ))}
        </SelectGroupInternal>
      </SelectContent>
    </Select>
  );
}

export default SelectGroup;
