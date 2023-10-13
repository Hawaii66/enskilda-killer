import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Kill from "./Kill";

function Kills() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Se dina kills</CardTitle>
        <CardDescription>Följ vilka personer du mördat</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <p className="font-bold text-lg">Totalt har du dödat: 4 st</p>
        <div className="flex flex-col gap-4">
          <Kill />
          <Kill />
          <Kill />
          <Kill />
        </div>
      </CardContent>
    </Card>
  );
}

export default Kills;
