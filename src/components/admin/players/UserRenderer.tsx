import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { User as UserRenderer } from "@/interfaces/User";
import React from "react";

type Props = {
  user: UserRenderer;
  index: number;
};

function UserRenderer({ user, index }: Props) {
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
        <SheetHeader>
          <SheetTitle>
            {user.firstname} {user.lastname}
          </SheetTitle>
          <SheetDescription>
            Ändra användarens information, allt går att ändra :D
          </SheetDescription>
        </SheetHeader>
        <Separator />
        <div className="my-8">
          <Card>
            <CardHeader>
              <CardTitle>Information</CardTitle>
            </CardHeader>
            <CardContent
              className="grid gap-2"
              style={{ gridTemplateColumns: "1fr 3fr 1fr 3fr" }}
            >
              <Label className="flex justify-start items-center">Förnamn</Label>
              <Input />
              <Label className="flex justify-start items-center">
                Efternamn
              </Label>
              <Input />
              <Label className="flex justify-start items-center">Klass</Label>
              <Input />
              <Label className="flex justify-start items-center">Epost</Label>
              <Input />
              <Label className="flex justify-start items-center">Telefon</Label>
              <Input />
            </CardContent>
          </Card>
        </div>
        <Separator />
        <SheetFooter>
          <SheetClose>
            <Button>Spara</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default UserRenderer;
