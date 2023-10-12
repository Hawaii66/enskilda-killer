"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import SelectUser from "../SelectUser";
import { Textarea } from "../ui/textarea";

function Litigations() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Tvistemål</CardTitle>
        <CardDescription>Anmäl tvistemål här</CardDescription>
      </CardHeader>
      <CardContent>
        <Card>
          <CardHeader>
            <CardTitle>Jamal Tabara</CardTitle>
            <CardDescription>Vittne: Arvid Ingvarsson</CardDescription>
          </CardHeader>
          <CardContent>
            På en solig dag promenerade jag längs stranden, kände sanden mellan
            tårna och hörde vågornas sus i fjärran. Det var en fridfull stund
            när jag insåg att naturen har en unik förmåga att ge oss lugn och
            perspektiv. Solen sken klart på himlen och färgade vattnet i nyanser
            av blått och grönt. Fåglarna flög högt och skapade vackra
            formationer i skyn. Det var ett ögonblick av fullkomlig harmoni med
            den omgivande världen.
          </CardContent>
          <CardFooter>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant={"destructive"}>Ta bort</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogTitle>Är du säker?</AlertDialogTitle>
                <AlertDialogDescription>
                  Vill du ta bort detta tvistemål, killer utskottet kommer du
                  inte kolla på det
                </AlertDialogDescription>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardFooter>
        </Card>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Nytt tvistemål</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Skapa tvistemål</DialogTitle>
              <DialogDescription>
                Skapa ett nytt tvistemål, sök efter den tvistemålet är riktat
                mot samt ett vittne. Skriv även kort vad som hänt.
              </DialogDescription>
            </DialogHeader>
            <div
              className="grid gap-2 py-4"
              style={{ gridTemplateColumns: "1fr 3fr" }}
            >
              <Label>Inblandad</Label>
              <div className="flex w-full justify-start items-center">
                <SelectUser />
              </div>
              <Label>Vittne</Label>
              <div className="flex w-full justify-start items-center">
                <SelectUser />
              </div>
              <Label>Berätta mera</Label>
              <Textarea />
            </div>
            <DialogFooter className="w-full justify-between">
              <Button>Skicka</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}

export default Litigations;
