"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FullLitigation } from "@/interfaces/Admin";
import React, { useState } from "react";
import ContactInfo from "./ContactInfo";
import { Separator } from "@/components/ui/separator";
import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { useApi } from "@/hooks/useApi";
import { useBasicToast } from "@/hooks/useBasicToast";

type Props = {
  litigations: FullLitigation[];
};

function List({ litigations: defaultLitigations }: Props) {
  const [litigations, setLitigations] = useState(defaultLitigations);

  const apiFetch = useApi();
  const { toast, toastSave } = useBasicToast();

  const deleteLitigation = async (id: number) => {
    const response = await apiFetch(`/api/admin/litigations?litigation=${id}`, {
      method: "DELETE",
    });
    if (response.status === 200) {
      setLitigations((t) => t.filter((i) => i.id !== id));
      toastSave("Tvistemålet togs bort");
    } else {
      toast("Kunde inte ta bort tvistemålet");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Aktiva tvistemål</CardTitle>
        <CardDescription>Se aktiva tvistemål som måste lösas</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {litigations.map((litigation) => (
          <Card>
            <CardHeader>
              <CardTitle>
                {litigation.user.firstname} {litigation.user.lastname}{" "}
                {litigation.user.group}
              </CardTitle>
              <CardDescription>
                {litigation.with.firstname} {litigation.with.lastname}{" "}
                {litigation.with.group}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div
                className={`grid ${
                  litigation.witness ? "grid-cols-3" : "grid-cols-2"
                }`}
              >
                <ContactInfo
                  header="Jag anmälde"
                  contactInfo={litigation.user}
                />
                <ContactInfo
                  header="Jag är 'problemet'"
                  contactInfo={litigation.with}
                />
                {litigation.witness && (
                  <ContactInfo
                    header="Jag är vittnet"
                    contactInfo={litigation.witness}
                  />
                )}
              </div>
              <Separator />
              <p>{litigation.text}</p>
              <Separator />
              <Button
                onClick={() => deleteLitigation(litigation.id)}
                className="flex flex-row gap-4"
                variant={"outline"}
              >
                <Icons.delete className="w-4 h-4" />
                Ta bort
              </Button>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
}

export default List;
