import { AllLitigationReasonsContext } from "@/contexts/AllLitigationReasons";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import React, { useContext } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectGroup as SelectGroupInternal,
} from "./ui/select";

type Props = {
  onChangeReason?: (reason: string) => void;
  defaultReason?: string;
};

function SelectLitigationReason({ defaultReason, onChangeReason }: Props) {
  const litigations = useContext(AllLitigationReasonsContext);

  return (
    <Select
      onValueChange={(g) => {
        onChangeReason && onChangeReason(g);
      }}
      defaultValue={defaultReason}
    >
      <SelectTrigger>
        <SelectValue placeholder="Välj anledning" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroupInternal>
          <ScrollArea className="h-[300px]">
            <SelectLabel>Välj anledning</SelectLabel>
            {litigations.map((lit) => (
              <SelectItem value={lit}>{lit}</SelectItem>
            ))}
          </ScrollArea>
        </SelectGroupInternal>
      </SelectContent>
    </Select>
  );
}

export default SelectLitigationReason;
