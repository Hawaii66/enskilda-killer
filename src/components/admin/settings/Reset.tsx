import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

function Reset() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Återställ</CardTitle>
        <CardDescription>
          Återställ killer till 0. Detta går inte att ångra. Ge pågående killer
          ett namn för att spara statistik
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 w-1/2 gap-4">
        <Label>Namn</Label>
        <Input />
        <AlertDialog>
          <AlertDialogTrigger>
            <Button variant={"destructive"}>Återställ</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogTitle>Återställ Killer</AlertDialogTitle>
            <AlertDialogDescription>
              Du kommer nu att återställa all killer data. Om du har gett denna
              killer ett namn kommer statistiken att sparas. Det går inte att
              ångra.
            </AlertDialogDescription>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction className="bg-red-500 hover:bg-red-800 ">
                Reset
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
}

export default Reset;
