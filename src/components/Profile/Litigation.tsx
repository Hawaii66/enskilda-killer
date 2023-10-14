import { Litigation as LitigationRenderer } from "@/interfaces/Profile";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@radix-ui/react-alert-dialog";
import React from "react";
import { AlertDialogFooter } from "../ui/alert-dialog";
import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";

type Props = {
  litigation: LitigationRenderer;
};

function LitigationRenderer({ litigation }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {litigation.with.firstname} {litigation.with.lastname}
        </CardTitle>
        {litigation.witness && (
          <CardDescription>
            Vittne: {litigation.witness.firstname} {litigation.with.lastname}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>{litigation.text}</CardContent>
      <CardFooter>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant={"destructive"}>Ta bort</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogTitle>Är du säker?</AlertDialogTitle>
            <AlertDialogDescription>
              Vill du ta bort detta tvistemål, killer utskottet kommer du inte
              kolla på det
            </AlertDialogDescription>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}

export default LitigationRenderer;
