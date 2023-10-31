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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

type Props = {
  litigations: FullLitigation[];
  admins: { email: string; name: string }[];
};

function List({ litigations: defaultLitigations, admins }: Props) {
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

  const saveLitigation = async (litigation: FullLitigation) => {
    const response = await apiFetch("/api/admin/litigations", {
      method: "POST",
      body: {
        id: litigation.id,
        helper: litigation.helper?.email,
        investigator: litigation.investigator?.email,
      },
    });
    if (response.status === 200) {
      toastSave("Tvistemålet sparades bort");
    } else {
      toast("Kunde inte spara tvistemålet");
    }
  };

  const removeAdmin = (id: number, isHelper: boolean) => {
    setLitigations((old) => {
      return old.map((lit) => {
        if (lit.id === id) {
          return {
            ...lit,
            helper: isHelper ? undefined : lit.helper,
            investigator: isHelper ? lit.investigator : undefined,
          };
        } else {
          return lit;
        }
      });
    });
  };

  const addAdmin = (id: number, isHelper: boolean, admin: string) => {
    setLitigations((old) => {
      return old.map((lit) => {
        if (lit.id === id) {
          return {
            ...lit,
            helper: isHelper
              ? {
                  email: admin,
                  name: admins.find((i) => i.email === admin)?.name || "",
                }
              : lit.helper,
            investigator: isHelper
              ? lit.investigator
              : {
                  email: admin,
                  name: admins.find((i) => i.email === admin)?.name || "",
                },
          };
        } else {
          return lit;
        }
      });
    });
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
              <div className="flex flex-row gap-8 justify-start items-center">
                {litigation.investigator ? (
                  <div className="p-4 border rounded-lg flex flex-col gap-4">
                    <p className="text-lg font-semibold underline">Utredare</p>
                    <div>
                      <p>{litigation.investigator.email}</p>
                      <p>{litigation.investigator.name}</p>
                    </div>
                    <Button
                      onClick={() => removeAdmin(litigation.id, false)}
                      variant={"outline"}
                    >
                      Ta bort
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Select
                      onValueChange={(e) => addAdmin(litigation.id, false, e)}
                    >
                      <SelectTrigger className="gap-2">
                        Välj utredare
                      </SelectTrigger>
                      <SelectContent>
                        {admins.map((admin) => (
                          <SelectItem value={admin.email}>
                            {admin.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                {litigation.helper ? (
                  <div className="p-4 border rounded-lg flex flex-col gap-4">
                    <p className="text-lg font-semibold underline">Hjälpreda</p>
                    <div>
                      <p>{litigation.helper.email}</p>
                      <p>{litigation.helper.name}</p>
                    </div>
                    <Button
                      onClick={() => removeAdmin(litigation.id, true)}
                      variant={"outline"}
                    >
                      Ta bort
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Select
                      onValueChange={(e) => addAdmin(litigation.id, true, e)}
                    >
                      <SelectTrigger className="gap-2">
                        Välj hjälpare
                      </SelectTrigger>
                      <SelectContent>
                        {admins.map((admin) => (
                          <SelectItem value={admin.email}>
                            {admin.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
              <Separator />
              <div className="flex flex-row gap-4">
                <Button
                  onClick={() => saveLitigation(litigation)}
                  className="flex flex-row gap-4"
                >
                  Spara
                </Button>
                <Button
                  onClick={() => deleteLitigation(litigation.id)}
                  className="flex flex-row gap-2"
                  variant={"outline"}
                >
                  <Icons.delete className="w-4 h-4" />
                  Ta bort
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
}

export default List;
