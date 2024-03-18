import React, { useContext } from "react";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { orderByKeyToString, showOnlyKeyToString } from "@/functions/filter";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Filters } from "@/interfaces/Filters";
import { AllCirclesContext } from "@/contexts/AllCirclesContext";
import { AllGroupsContext } from "@/contexts/AllGroupsContext";

type Props = {
  setFilters: (filters: Filters) => void;
  filters: Filters;
  setTargetFilters: (filters: Filters) => void;
  targetFilters: Filters;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};

function FilterSelect({
  filters,
  setFilters,
  setTargetFilters,
  targetFilters,
  searchQuery,
  setSearchQuery,
}: Props) {
  const circles = useContext(AllCirclesContext);
  const groups = useContext(AllGroupsContext);

  return (
    <div className="rounded-lg overflow-hidden ">
      <div className="w-1/4 flex flex-row gap-4 mt-2 mb-4">
        <Label className="w-1/2 grid place-items-center">Sortera efter</Label>
        <Select
          defaultValue="target"
          onValueChange={(s) => setFilters({ ...filters, orderBy: s as any })}
        >
          <SelectTrigger>
            <SelectValue>{orderByKeyToString(filters.orderBy)}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sortera efter</SelectLabel>
              <SelectItem value="id">Id</SelectItem>
              <SelectItem value="forename">Förnamn</SelectItem>
              <SelectItem value="lastname">Efternamn</SelectItem>
              <SelectItem value="kills">Mord</SelectItem>
              <SelectItem value="group">Klass</SelectItem>
              <SelectItem value="target">Offer</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="w-1/2 flex flex-row gap-4 mb-4">
        <div className="w-1/2 flex flex-row gap-4">
          <Label className="w-1/2 grid place-items-center">Visa endast</Label>
          <Select
            onValueChange={(s) => {
              if (s.startsWith("main-")) {
                setFilters({
                  ...filters,
                  onlyShow: s.replace("main-", "") as any,
                });
              }
              if (s.startsWith("group-")) {
                setFilters({
                  ...filters,
                  onlyShow: {
                    group: s.replace("group-", ""),
                  },
                });
              }
              if (s.startsWith("circle-")) {
                setFilters({
                  ...filters,
                  onlyShow: {
                    circle: s.replace("circle-", ""),
                  },
                });
              }
            }}
          >
            <SelectTrigger>
              <SelectValue>
                {showOnlyKeyToString(filters.onlyShow, circles)}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <ScrollArea className="h-[40vh]">
                <SelectGroup>
                  <SelectLabel>- Stora -</SelectLabel>
                  <SelectItem value="main-all">Alla</SelectItem>
                  <SelectItem value="main-alive">Levande</SelectItem>
                  <SelectItem value="main-dead">Döda</SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>- Cirkel - </SelectLabel>
                  {circles.map((circle) => (
                    <SelectItem value={`circle-${circle.id}`}>
                      {circle.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>- Klass -</SelectLabel>
                  {groups.map((group) => (
                    <SelectItem value={`group-${group}`}>{group}</SelectItem>
                  ))}
                </SelectGroup>
              </ScrollArea>
            </SelectContent>
          </Select>
        </div>
        <div className="w-1/2 flex flex-row gap-4 mb-4">
          <Label className="w-1/2 grid place-items-center">
            Visa endast (target)
          </Label>
          <Select
            onValueChange={(s) => {
              if (s.startsWith("main-")) {
                setTargetFilters({
                  ...filters,
                  onlyShow: s.replace("main-", "") as any,
                });
              }
              if (s.startsWith("group-")) {
                setTargetFilters({
                  ...filters,
                  onlyShow: {
                    group: s.replace("group-", ""),
                  },
                });
              }
              if (s.startsWith("circle-")) {
                setTargetFilters({
                  ...filters,
                  onlyShow: {
                    circle: s.replace("circle-", ""),
                  },
                });
              }
            }}
          >
            <SelectTrigger>
              <SelectValue>
                {showOnlyKeyToString(targetFilters.onlyShow, circles)}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <ScrollArea className="h-[40vh]">
                <SelectGroup>
                  <SelectLabel>- Stora -</SelectLabel>
                  <SelectItem value="main-all">Alla</SelectItem>
                  <SelectItem value="main-alive">Levande</SelectItem>
                  <SelectItem value="main-dead">Döda</SelectItem>
                  <SelectItem value="main-notMember">
                    Inte medlem i kåren
                  </SelectItem>
                  <SelectItem value="main-seeMurderer">
                    Kan se mördare
                  </SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>- Cirkel - </SelectLabel>
                  {circles.map((circle) => (
                    <SelectItem value={`circle-${circle.id}`}>
                      {circle.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>- Klass -</SelectLabel>
                  {groups.map((group) => (
                    <SelectItem value={`group-${group}`}>{group}</SelectItem>
                  ))}
                </SelectGroup>
              </ScrollArea>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="w-1/4 flex flex-row gap-4 mb-4">
        <Label className="w-1/2 grid place-items-center">Sök</Label>
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  );
}

export default FilterSelect;
