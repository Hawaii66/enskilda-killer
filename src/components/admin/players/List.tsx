import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User } from "@/interfaces/User";
import React from "react";
import UserRenderer from "./UserRenderer";

type Props = {
  users: User[];
};

function List({ users }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Alla spelare</CardTitle>
        <CardDescription>
          Filtrera spelarna eller visa alla anmälda personer
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className={`flex flex-row gap-4 py-2 px-2 bg-slate-100 underline`}>
          <p className="w-1/6">Id</p>
          <p className="w-2/6">Användare</p>
          <p className="w-2/6">Target</p>
          <div className="w-1/6 flex flex-row justify-end items-center">
            Ändra
          </div>
        </div>
        {users.map((user, idx) => (
          <UserRenderer index={idx} user={user} />
        ))}
      </CardContent>
      <CardFooter>
        <Button>Spara</Button>
      </CardFooter>
    </Card>
  );
}

export default List;
