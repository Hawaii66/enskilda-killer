"use client";

import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./ui/command";
import { cn } from "@/lib/utils";

const users: { name: string; id: number; group: string }[] = [
  {
    id: 0,
    name: "Jamal",
    group: "1",
  },
  {
    id: 1,
    name: "123",
    group: "1",
  },
  {
    id: 2,
    name: "0123j1",
    group: "2",
  },
];

function SelectUser() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const groups = () => {
    const t = new Set<string>();
    users.forEach((i) => t.add(i.group));
    return Array.from(t);
  };

  console.log(value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <Button
          className="w-[200px] justify-between"
          variant={"outline"}
          role="combobox"
        >
          {value
            ? users.find((user) => user.id.toString() === value)?.name
            : "Välj person"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Command>
          <CommandInput placeholder="Välj person" />
          <CommandEmpty>Ingen person vald</CommandEmpty>
          <CommandGroup>
            <CommandItem onSelect={() => setValue("")}>
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  value === "" ? "opacity-100" : "opacity-0"
                )}
              />
              Ingen
            </CommandItem>
          </CommandGroup>
          {groups().map((group) => (
            <CommandGroup heading={group}>
              {users
                .filter((u) => u.group === group)
                .map((user) => (
                  <CommandItem
                    value={user.name}
                    onSelect={(c) => {
                      setValue(
                        users
                          .find(
                            (i) =>
                              i.group === group && i.name.toLowerCase() == c
                          )
                          ?.id.toString() || ""
                      );
                    }}
                    key={user.id.toString()}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === user.id.toString()
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {user.name}
                  </CommandItem>
                ))}
            </CommandGroup>
          ))}
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default SelectUser;
