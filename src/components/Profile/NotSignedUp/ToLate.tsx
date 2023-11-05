"use client";

import Top from "@/components/Top";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useApi } from "@/hooks/useApi";
import { useBasicToast } from "@/hooks/useBasicToast";
import { SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import React, { useState } from "react";

function ToLate() {
  const [email, setEmail] = useState("");

  const apiFetch = useApi();
  const { toast, toastSave } = useBasicToast();

  const fetchEmail = async () => {
    const response = await apiFetch("/api/user/email", { method: "GET" });
    if (response.status === 200) {
      setEmail((await response.json()).email);
    } else {
      toast("Kunde inte hitta din email");
    }
  };

  return (
    <div>
      <Top text="Profil" />
      <div className="flex flex-col gap-2 justify-center items-center mt-12">
        <h3 className="text-lg text-black font-bold tracking-wide">
          Killer har startat
        </h3>
        <p className="text-md text-gray-500 font-semibold">
          Du är inte med i Killer
        </p>
        <p>Du är inloggad som: {email}</p>
        <SignOutButton>
          <Button variant={"outline"}>Logga ut</Button>
        </SignOutButton>
        <Separator />

        <Card>
          <CardHeader>
            <CardTitle>Fel email?</CardTitle>
            <CardDescription>
              Testa att först logga ut från microsoft
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4 gap-2 flex flex-col">
            <p>
              Fel email? Logga ut från microsoft först uppe till höger på
              länken:
            </p>
            <Link target="_blank" href="https://account.microsoft.com/">
              <Button variant={"outline"}>Logga ut (Microsoft)</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default ToLate;
