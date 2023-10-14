import React from "react";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../ui/alert-dialog";

function AlertMurder() {
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Är du säker?</AlertDialogTitle>
        <AlertDialogDescription>
          Mordet kommer gå igenom om den andra personen också klickar på
          knappen. När du klickat på knappen har du godkänt mordet, inget
          tvistemål kan då startas
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Avbryt</AlertDialogCancel>
        <AlertDialogAction>Fortsätt</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}

export default AlertMurder;
