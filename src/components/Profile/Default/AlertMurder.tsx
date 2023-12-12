import React, { useState } from "react";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../ui/alert-dialog";
import { TargetUser } from "@/interfaces/User";
import SelectUser from "@/components/SelectUser";

type Props = {
  onClick: (user?: TargetUser) => void;
  showSelect?: boolean;
  isMurderer?: boolean;
};

function AlertMurder({ onClick, showSelect, isMurderer }: Props) {
  const [selectedUser, setSelectedUser] = useState<TargetUser | undefined>(
    undefined
  );

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Är du säker?</AlertDialogTitle>
        <AlertDialogDescription>
          Mordet kommer gå igenom om den andra personen också klickar på
          knappen. När du klickat på knappen har du godkänt mordet, inget
          tvistemål kan då startas
        </AlertDialogDescription>

        {showSelect && (
          <>
            <AlertDialogDescription className="text-center">
              {isMurderer ? `Välj vem du mördade` : `Välj vem som mördade dig`}
            </AlertDialogDescription>
            <SelectUser
              onChangeUser={setSelectedUser}
              defaultUser={selectedUser}
            />
          </>
        )}
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Avbryt</AlertDialogCancel>
        <AlertDialogAction
          disabled={showSelect ? selectedUser === undefined : false}
          onClick={() => {
            if (selectedUser || !showSelect) {
              onClick(selectedUser);
            }
          }}
        >
          Fortsätt
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}

export default AlertMurder;
