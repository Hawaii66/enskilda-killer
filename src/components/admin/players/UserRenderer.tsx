"use client";

import { Icons } from "@/components/Icons";
import SelectCircle from "@/components/SelectCircle";
import SelectGroup from "@/components/SelectGroup";
import SelectUser from "@/components/SelectUser";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useApi } from "@/hooks/useApi";
import { PlayerInfo } from "@/interfaces/Admin";
import { User } from "@/interfaces/User";
import { format } from "date-fns";
import React, { useState } from "react";

type Props = {
  user: PlayerInfo;
  index: number;
  refresh: () => void;
};

function UserRenderer({
  user: { kills: defaultKills, user: defaultUser },
  index,
  refresh,
}: Props) {
  const [user, setUser] = useState(defaultUser);
  const [kills, setKills] = useState(defaultKills);
  const [open, setOpen] = useState(false);

  const changeOpenState = (state: boolean) => {
    setOpen(state);

    if (state === false) {
      setUser(defaultUser);
      setKills(defaultKills);
    }
  };

  const apiFetch = useApi();

  const save = async () => {
    const responseUser = await apiFetch("/api/admin/save/user", {
      method: "POST",
      body: user,
    });
    const responseKills = await apiFetch("/api/admin/save/kills", {
      method: "POST",
      body: { kills, user: user.id },
    });

    if (responseUser.status === 200 && responseKills.status === 200) {
      refresh();
      setOpen(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={changeOpenState}>
      <SheetTrigger asChild>
        <div
          className={`group cursor-pointer flex flex-row gap-4 py-2 px-2 ${
            index % 2 === 0 ? "bg-slate-200" : "bg-slate-100"
          }`}
        >
          <div className="w-1/6 flex flex-row justify-between items-center">
            <p>{user.id}</p>
            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger>
                  <Badge
                    className={`w-12 grid place-items-center ${
                      user.circle ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {kills.length}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Röd: död (ingen cirkel)</p>
                  <p>Grön: levande (har en cirkel)</p>
                  <p>Nummer: antal kills</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <p className="w-2/6 group-hover:font-bold">
            {user.firstname} {user.lastname} {user.group}
          </p>
          <p className="w-2/6">
            {user.target &&
              `${user.target.firstname} ${user.target.lastname} ${user.target.group}`}
          </p>
          <div className="w-1/6 flex flex-row justify-end items-center">
            <button>
              <Icons.edit className="w-4 h-4" />
            </button>
          </div>
        </div>
      </SheetTrigger>
      <SheetContent className="w-[1200px] sm:w-[1200px]!important sm:max-w-none">
        <ScrollArea className="h-full pr-4">
          <SheetHeader>
            <SheetTitle>
              {user.firstname} {user.lastname}
            </SheetTitle>
            <SheetDescription>
              Ändra användarens information, allt går att ändra :D
            </SheetDescription>
          </SheetHeader>
          <Separator />
          <div className="my-8 flex flex-col gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Information</CardTitle>
              </CardHeader>
              <CardContent
                className="grid gap-2"
                style={{ gridTemplateColumns: "1fr 3fr 1fr 3fr" }}
              >
                <Label className="flex justify-start items-center">
                  Förnamn
                </Label>
                <Input
                  value={user.firstname}
                  onChange={(e) =>
                    setUser({ ...user, firstname: e.target.value })
                  }
                />
                <Label className="flex justify-start items-center">
                  Efternamn
                </Label>
                <Input
                  value={user.lastname}
                  onChange={(e) =>
                    setUser({ ...user, lastname: e.target.value })
                  }
                />
                <Label className="flex justify-start items-center">Klass</Label>
                <SelectGroup
                  defaultGroup={user.group}
                  onChangeGroup={(g) => setUser({ ...user, group: g })}
                />
                <Label className="flex justify-start items-center">Epost</Label>
                <Input
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
                <Label className="flex justify-start items-center">
                  Telefon
                </Label>
                <Input
                  value={user.phone}
                  onChange={(e) => setUser({ ...user, phone: e.target.value })}
                />
                <Label className="flex justify-start items-center">
                  Kåren medlem
                </Label>
                <Switch
                  checked={user.isMember}
                  onCheckedChange={(e) => setUser({ ...user, isMember: e })}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Cirkel</CardTitle>
                <CardDescription>
                  Vilken cirkel är denna spelare i
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-row gap-4">
                <Label className="flex justify-center items-center">
                  Cirkel
                </Label>
                <SelectCircle
                  includeEmpty
                  defaultCircle={user.circle}
                  onChangeCircle={(e) => setUser({ ...user, circle: e })}
                />
                {/*<Input
                  value={user.circle?.id.toString()}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      circle: isNaN(parseInt(e.target.value))
                        ? undefined
                        : {
                            id: parseInt(e.target.value),
                            name: "",
                          },
                    })
                  }
                />*/}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Offer</CardTitle>
                <CardDescription>
                  Ändra vem personen har som offer
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="flex flex-row gap-4">
                  <Label className="flex justify-center items-center">
                    Välj offer
                  </Label>
                  <SelectUser
                    defaultUser={user.target}
                    onChangeUser={(target) => setUser({ ...user, target })}
                  />
                </div>
                {user.target && (
                  <div
                    className="grid gap-2"
                    style={{ gridTemplateColumns: "1fr 3fr 1fr 3fr" }}
                  >
                    <Label className="flex justify-start items-center">
                      Förnamn
                    </Label>
                    <Input
                      value={user.target.firstname}
                      disabled
                      className="bg-slate-100"
                    />
                    <Label className="flex justify-start items-center">
                      Efternamn
                    </Label>
                    <Input
                      value={user.target.lastname}
                      disabled
                      className="bg-slate-100"
                    />
                    <Label className="flex justify-start items-center">
                      Klass
                    </Label>
                    <Input
                      value={user.target.group}
                      disabled
                      className="bg-slate-100"
                    />
                    <Label className="flex justify-start items-center">
                      Id
                    </Label>
                    <Input
                      value={user.target.id}
                      disabled
                      className="bg-slate-100"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Mord</CardTitle>
                <CardDescription>
                  Godkända mord denna person har genomfört
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                {kills.map((kill) => (
                  <div className="border px-4 py-2 flex flex-row justify-between items-center">
                    <div>
                      <p>
                        {kill.target.group} {kill.target.firstname}{" "}
                        {kill.target.lastname}
                      </p>
                      <p>
                        {format(kill.time, "yyyy-MM-dd HH:mm")}{" "}
                        {kill.circle.name}
                      </p>
                    </div>
                    <div>
                      <Button
                        onClick={() =>
                          setKills((k) =>
                            k.filter((i) => i.target.id !== kill.target.id)
                          )
                        }
                        className="flex flex-row gap-2"
                        variant={"outline"}
                      >
                        <Icons.delete className="w-4 h-4" /> <span>Delete</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
          <Separator />
          <SheetFooter>
            <Button onClick={save}>Spara</Button>
          </SheetFooter>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

export default UserRenderer;
