import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Kills } from "@/interfaces/Profile";
import { format } from "date-fns";

type Props = {
  kill: Kills[number];
};

function Kill({ kill }: Props) {
  return (
    <Card className="w-full">
      <CardContent className="pt-4 flex justify-between pr-4">
        <div className="flex flex-row gap-4">
          <Avatar>
            <AvatarFallback>
              {kill.target.firstname.charAt(0)} {kill.target.lastname.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3>
              {kill.target.firstname} {kill.target.lastname}
            </h3>
            <p>{kill.target.group}</p>
          </div>
        </div>
        <div>
          <p>{format(kill.time, "yyyy-MM-dd HH:mm")}</p>
          <p>{kill.circle}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default Kill;
