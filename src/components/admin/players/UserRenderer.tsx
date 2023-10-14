"use client";

import { Icons } from "@/components/Icons";
import SelectUser from "@/components/SelectUser";
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
import { PlayerInfo } from "@/interfaces/Admin";
import { format } from "date-fns";
import React from "react";

type Props = {
  user: PlayerInfo;
  index: number;
};

function UserRenderer({ user: { kills, user }, index }: Props) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div
          className={`group cursor-pointer flex flex-row gap-4 py-2 px-2 ${
            index % 2 === 0 ? "bg-slate-200" : "bg-slate-100"
          }`}
        >
          <p className="w-1/6">{user.id}</p>
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
                <Input />
                <Label className="flex justify-start items-center">
                  Efternamn
                </Label>
                <Input />
                <Label className="flex justify-start items-center">Klass</Label>
                <Input />
                <Label className="flex justify-start items-center">Epost</Label>
                <Input />
                <Label className="flex justify-start items-center">
                  Telefon
                </Label>
                <Input />
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
                <Input />
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
                  <SelectUser onChangeUser={() => {}} />
                </div>
                <div
                  className="grid gap-2"
                  style={{ gridTemplateColumns: "1fr 3fr 1fr 3fr" }}
                >
                  <Label className="flex justify-start items-center">
                    Förnamn
                  </Label>
                  <Input disabled className="bg-slate-100" />
                  <Label className="flex justify-start items-center">
                    Efternamn
                  </Label>
                  <Input disabled className="bg-slate-100" />
                  <Label className="flex justify-start items-center">
                    Klass
                  </Label>
                  <Input disabled className="bg-slate-100" />
                  <Label className="flex justify-start items-center">Id</Label>
                  <Input disabled className="bg-slate-100" />
                </div>
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
                        {format(kill.time, "yyyy-MM-dd HH:mm")} {kill.circle}
                      </p>
                    </div>
                    <div>
                      <Button
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
            <Button>Spara</Button>
          </SheetFooter>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

export default UserRenderer;
