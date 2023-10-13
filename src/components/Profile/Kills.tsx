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
        <div className="grid px-2" style={{ gridTemplateColumns: "1fr 10fr" }}>
          <div className="w-full border-l-4 h-full border-gray-300 flex flex-col justify-between gap-4">
            <div className="w-full  flex-grow  flex justify-center items-center">
              <div className="w-full h-2 bg-gray-300 flex justify-center items-center">
                <p className="font-bold text-gray-700 font-mono">4</p>
              </div>
            </div>
            <div className="w-full  flex-grow  flex justify-center items-center">
              <div className="w-full h-2 bg-gray-300 flex justify-center items-center">
                <p className="font-bold text-gray-700 font-mono">3</p>
              </div>
            </div>
            <div className="w-full  flex-grow  flex justify-center items-center">
              <div className="w-full h-2 bg-gray-300 flex justify-center items-center">
                <p className="font-bold text-gray-700 font-mono">2</p>
              </div>
            </div>
            <div className="w-full  flex-grow  flex justify-center items-center">
              <div className="w-full h-2 bg-gray-300 flex justify-center items-center">
                <p className="font-bold text-gray-700 font-mono">1</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <Kill />
            <Kill />
            <Kill />
            <Kill />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default Kills;
