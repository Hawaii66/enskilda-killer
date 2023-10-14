"use client";

import React, { useContext, useEffect, useState } from "react";
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
import { AllUsersContext } from "@/contexts/AllUsersContext";
import { TargetUser } from "@/interfaces/User";
import { ScrollArea } from "./ui/scroll-area";

type Props = {
  onChangeUser: (user: TargetUser | undefined) => void;
};

function SelectUser({ onChangeUser }: Props) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const users = useContext(AllUsersContext);

  const groups = () => {
    const t = new Set<string>();
    users.forEach((i) => t.add(i.group));
    return Array.from(t);
  };

  const getName = () => {
    const user = users.find((user) => user.id.toString() === value);
    if (!user) return "";

    return `${user.firstname} ${user.lastname}`;
  };

  useEffect(() => {
    const user = users.find((user) => user.id.toString() === value);
    onChangeUser(user);
  }, [value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <Button
          className="w-[200px] justify-between"
          variant={"outline"}
          role="combobox"
        >
          {value ? getName() : "Välj person"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <ScrollArea className="h-[300px]">
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
              <CommandGroup key={group} heading={group}>
                {users
                  .filter((u) => u.group === group)
                  .map((user) => (
                    <CommandItem
                      value={`${user.firstname} ${user.lastname}`}
                      onSelect={(c) => {
                        setValue(
                          users
                            .find(
                              (i) =>
                                i.group === group &&
                                `${i.firstname} ${i.lastname}`.toLowerCase() ==
                                  c
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
                      {`${user.firstname} ${user.lastname}`}
                    </CommandItem>
                  ))}
              </CommandGroup>
            ))}
          </Command>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}

export default SelectUser;
