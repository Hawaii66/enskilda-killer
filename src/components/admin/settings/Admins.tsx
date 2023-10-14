import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

const admins = ["seah21@nykopingsenskilda.se", "august@nykopingsenskilda.se"];

function Admins() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Admins</CardTitle>
        <CardDescription>Vilka har tillgång till admin sidorna</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {admins.map((admin) => (
          <div className="flex flex-row gap-4 items-center">
            <p>{admin}</p>
            <Button variant={"destructive"}>
              <Icons.delete className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button>Spara</Button>
      </CardFooter>
    </Card>
  );
}

export default Admins;
