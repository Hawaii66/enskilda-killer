"use client";

import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Track } from "@/interfaces/Track";
import { compareAsc, format, isSameDay } from "date-fns";
import React, { useState } from "react";
import { prettyPrintJson } from "pretty-print-json";

type Props = {
  trackings: Track[];
};

function List({ trackings }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [dates, setDates] = useState<Date[] | undefined>([new Date()]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Allt som händer</CardTitle>
        <CardDescription>
          Se allt som händer på hemsidan, ex raportera mord
        </CardDescription>
      </CardHeader>
      <CardContent>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/pretty-print-json@2.0/dist/css/pretty-print-json.css"
        />
        <div>
          <Input
            placeholder="Sök "
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Calendar
            mode="multiple"
            selected={dates}
            onSelect={(e) => setDates(e)}
            initialFocus
          />
        </div>
        <div className="w-full flex flex-col pt-8">
          <h1>
            OBS: vissa tider kan vara fel med 1h åt ena eller andra hållet (ex
            02:00 kan vara 01:00 eller 03:00)
          </h1>
          <div className={`w-full flex flex-row gap-4 px-4 py-2 bg-slate-100`}>
            <p className="font-bold w-1/6">Typ </p>
            <p className="font-bold w-1/6">Datum</p>
            <p className="font-bold">Namn på användare</p>
          </div>
          {trackings
            .filter((i) => filterOnSearch(searchQuery, i))
            .filter((i) => filterOnDays(dates, i))
            .sort((a, b) =>
              compareAsc(new Date(a.createdAt), new Date(b.createdAt))
            )
            .map((track, index) => (
              <Sheet key={track.id}>
                <SheetTrigger asChild>
                  <div
                    className={`w-full flex flex-row gap-4 px-4 py-2 cursor-pointer ${
                      index % 2 === 0 ? "bg-slate-200" : "bg-slate-100"
                    }`}
                  >
                    <p className="font-bold w-1/6">{track.name} </p>
                    <p className=" w-1/6">
                      {format(new Date(track.createdAt), "yyyy-MM-dd HH:mm")}
                    </p>
                    <p>
                      {track.user &&
                        `${track.user.firstname} ${track.user.lastname}`}
                    </p>
                  </div>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>{track.name}</SheetTitle>
                  </SheetHeader>
                  {format(new Date(track.createdAt), "yyyy-MM-dd HH:mm")}
                  <Separator className="my-2" />
                  {track.user && (
                    <div>
                      <p>
                        {track.user.id}: {track.user.firstname}{" "}
                        {track.user.lastname}
                      </p>
                      <p>{track.user.email}</p>
                    </div>
                  )}
                  <Separator className="my-2" />
                  <div
                    dangerouslySetInnerHTML={{
                      __html: prettyPrintJson.toHtml(
                        JSON.parse(track.data || "")
                      ),
                    }}
                  />
                </SheetContent>
              </Sheet>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}

const filterOnSearch = (query: string, track: Track) => {
  const lower = query
    .toLowerCase()
    .split(" ")
    .filter((i) => i !== "");

  if (lower.length === 0) return true;

  const toCheck = [
    track.name,
    ...(track.data === undefined ? [] : [track.data?.toString()]),
    ...(track.user === undefined
      ? []
      : [track.user.email, `${track.user.firstname} ${track.user.lastname}`]),
    format(new Date(track.createdAt), "yyyy-MM-dd HH:mm"),
  ];

  const filtered = toCheck.filter(
    (i) => lower.filter((j) => i.includes(j)).length > 0
  );
  return filtered.length > 0;
};

const filterOnDays = (days: Date[] | undefined, track: Track) => {
  const temp = days?.filter((date) =>
    isSameDay(new Date(track.createdAt), date)
  );
  console.log(temp);
  if (temp === undefined) return true;
  return temp.length !== 0;
};

export default List;
