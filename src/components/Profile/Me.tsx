"use client";

import React from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Avatar, AvatarFallback } from "../ui/avatar";

function Me() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Information</CardTitle>
        <CardDescription>
          Något som är fel? Ta kontakt med killer utskotet
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-row gap-4">
          <Avatar>
            <AvatarFallback>{"SA"}</AvatarFallback>
          </Avatar>
          <div>
            <h3>Sebastian Ahlman</h3>
            <p>seah21@nykopingsenskilda.se</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-between">
        <div className="flex flex-col gap-2">
          <p>Telefon: 070 545 3110</p>
          <p>Klass: Na21B</p>
        </div>
        <Button onClick={() => {}}>Logga ut</Button>
      </CardFooter>
    </Card>
  );
}

export default Me;
