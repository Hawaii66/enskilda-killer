import { Litigation } from "@/interfaces/Profile";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "../../ui/alert-dialog";
import React from "react";
import { AlertDialogFooter } from "../../ui/alert-dialog";
import { Button } from "../../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../../ui/card";

type Props = {
  litigation: Litigation;
  deleteMe: () => void;
};

function LitigationRenderer({ litigation, deleteMe }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {litigation.with.firstname} {litigation.with.lastname}
        </CardTitle>
        {litigation.witness && (
          <CardDescription>
            Vittne: {litigation.witness.firstname} {litigation.witness.lastname}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>{litigation.text}</CardContent>
      <CardFooter>
        <p className="text-gray-500 text-sm">
          Ditt tvistemål undersöks nu av Killer utskottet. Vi återkommer med
          svar via sms på telefon numret då anget ovan :D
        </p>
      </CardFooter>
    </Card>
  );
}

export default LitigationRenderer;
