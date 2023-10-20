"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Avatar, AvatarFallback } from "../../ui/avatar";
import { useRouter } from "next/navigation";
import { Me } from "@/interfaces/Profile";
import { useApi } from "@/hooks/useApi";
import { useBasicToast } from "@/hooks/useBasicToast";
import { SignOutButton } from "@clerk/nextjs";

function MeRenderer() {
  const router = useRouter();

  const apiFetch = useApi();
  const { toast } = useBasicToast();

  const [me, setMe] = useState<Me | null>(null);

  const fetchMe = async () => {
    const result = await apiFetch("/api/user/me", { method: "GET" });
    if (result.status === 200) {
      setMe(await result.json());
    } else {
      toast("Kunde inte hämta din information");
    }
  };

  useEffect(() => {
    fetchMe();
  }, []);

  const logout = () => {
    router.push("/");
  };

  if (me === null) {
    return <p>Laddar</p>;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Information</CardTitle>
        <CardDescription>
          Något som är fel? Ta kontakt med killer utskottet
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-row gap-4">
          <Avatar>
            <AvatarFallback>
              {me.firstname.charAt(0)}
              {me.lastname.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3>
              {me.firstname} {me.lastname}
            </h3>
            <p>{me.email}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-between">
        <div className="flex flex-col gap-2">
          <p>Telefon: {me.phone}</p>
          <p>Klass: {me.group}</p>
          {!me.isMember && (
            <p>Du måste gå med i elevkåren: LÄNK TILL ELEVKÅREN</p>
          )}
        </div>
        <SignOutButton>
          <Button>Logga ut</Button>
        </SignOutButton>
      </CardFooter>
    </Card>
  );
}

export default MeRenderer;
