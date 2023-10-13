import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Avatar, AvatarFallback } from "../ui/avatar";

function Kill() {
  return (
    <Card className="w-full">
      <CardContent className="pt-4 flex justify-between pr-4">
        <div className="flex flex-row gap-4">
          <Avatar>
            <AvatarFallback>{"SA"}</AvatarFallback>
          </Avatar>
          <div>
            <h3>Sebastian Ahlman</h3>
            <p>Na21B</p>
          </div>
        </div>
        <div>
          <p>2023-10-12 09:15</p>
          <p>Levande</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default Kill;
