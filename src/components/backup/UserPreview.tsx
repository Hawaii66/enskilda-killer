import { AllowedBackup } from "@/interfaces/Constants";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import {
  GetCircle,
  GetOneTarget,
  GetUser,
  IsAlive,
} from "@/functions/allowedBackup";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import SelectCircle from "../SelectCircle";
import SelectUser from "../SelectUser";
import { PlayerInfo } from "@/interfaces/Admin";
import { format } from "date-fns";
import { ScrollArea } from "../ui/scroll-area";

type Props = {
  user: AllowedBackup["users"][number];
  backup: AllowedBackup;
  idx: number;
};

function UserPreview({ backup, user, idx }: Props) {
  const targetID = backup.targets.find((i) => i.murderer === user.id)?.target;
  const target = targetID ? GetUser(targetID, backup) : undefined;

  const circle = backup.usersincircle.find((j) => j.user === user.id);

  const killInfo = backup.kills.filter((i) => i.murderer === user.id);
  const userInfo: PlayerInfo = {
    user: {
      clerkId: "",
      email: user.email,
      firstname: user.firstname,
      group: user.group,
      id: user.id,
      lastname: user.lastname,
      phone: "",
      isMember: true,
      kills: {},
      showMurderer: user.showMurderer,
      circle:
        circle === undefined
          ? undefined
          : backup.circles.find((c) => c.id === circle.circle)!,
      target: GetOneTarget(user.id, backup),
    },
    kills: killInfo.map((kill) => ({
      id: kill.id,
      circle: backup.circles.find((i) => i.id === kill.circle)!,
      target: backup.users.find((i) => i.id === kill.target)!,
      time: kill.created_at,
    })),
  };

  const murdererID = circle && backup.targets.find((i) => i.target === user.id);
  const murderer =
    murdererID && backup.users.find((i) => i.id === murdererID.murderer);

  return (
    <Sheet>
      <SheetTrigger>
        <li
          className={`grid text-left py-2 px-4 ${
            idx % 2 === 0 ? "bg-gray-200" : "bg-gray-100"
          }`}
          style={{ gridTemplateColumns: "1fr 1fr 5fr 5fr" }}
        >
          <p>{user.id}</p>
          <div
            className={"rounded-lg w-4 h-4"}
            style={{
              backgroundColor: IsAlive(user.id, backup)
                ? GetCircle(user.id, backup)?.color ?? "rgb(166,255,150)"
                : "red",
            }}
          />
          <p>
            {user.firstname} {user.lastname} {user.group}
          </p>
          <p>
            {target
              ? `${target.firstname} ${target.lastname} ${target.group}`
              : ""}
          </p>
        </li>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            {user.firstname} {user.lastname} - {user.group}
          </SheetTitle>
          <SheetDescription>{user.email}</SheetDescription>
        </SheetHeader>
        <Separator className="my-4" />
        <ScrollArea className="h-full pr-4 pb-24">
          <div className="flex flex-col gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Information</CardTitle>
              </CardHeader>
              <CardContent>
                <Label>Namn</Label>
                <Input disabled value={user.firstname + " " + user.lastname} />
                <Label>Klass</Label>
                <Input disabled value={user.group} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Cirkel</CardTitle>
                <CardDescription>
                  Vilken cirkel {user.firstname} tillhör
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SelectCircle disabled defaultCircle={userInfo.user.circle} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Offer och Mördare</CardTitle>
                <CardDescription>
                  Vem ska {user.firstname} mörda och vem ska mörda{" "}
                  {user.firstname}
                </CardDescription>
              </CardHeader>
              <CardContent
                className="grid gap-2"
                style={{ gridTemplateColumns: "1fr 2fr" }}
              >
                <Label className="flex justify-center items-center">
                  Offer
                </Label>
                <SelectUser
                  disabled
                  defaultUser={userInfo.user.target}
                  onChangeUser={() => {}}
                />
                <Label className="flex justify-center items-center">
                  Mördare
                </Label>
                <SelectUser
                  disabled
                  defaultUser={murderer}
                  onChangeUser={() => {}}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Mord</CardTitle>
                <CardDescription>
                  Alla mord {user.firstname} har lyckats med
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                {userInfo.kills.map((kill) => (
                  <div className="border px-4 py-2 rounded-md">
                    <p>
                      {kill.target.group} {kill.target.firstname}{" "}
                      {kill.target.lastname}
                    </p>
                    <p>
                      {format(kill.time, "yyyy-MM-dd HH:mm")} {kill.circle.name}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

export default UserPreview;
