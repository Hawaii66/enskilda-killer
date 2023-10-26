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
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import SelectGroup from "@/components/SelectGroup";
import { Icons } from "@/components/Icons";

function MeRenderer() {
  const router = useRouter();

  const apiFetch = useApi();
  const { toast } = useBasicToast();

  const [me, setMe] = useState<Me | null>(null);
  const [editedMe, setEditedMe] = useState<Me | undefined>(undefined);
  const [loadingSave, setLoadingSave] = useState(false);
  const [openSaveDialog, setOpenDialog] = useState(false);

  const fetchMe = async () => {
    const result = await apiFetch("/api/user/me", { method: "GET" });
    if (result.status === 200) {
      const me: Me = await result.json();
      setMe(me);
      setEditedMe(me);
    } else {
      toast("Kunde inte hämta din information");
    }
  };

  const saveMe = async () => {
    setLoadingSave(true);

    const response = await apiFetch("/api/user/me", {
      method: "POST",
      body: editedMe,
    });
    if (response.status === 200) {
      await fetchMe();
      setLoadingSave(false);
      setOpenDialog(false);
    } else {
      toast("Kunde inte spara ändringar");
      setLoadingSave(false);
      setEditedMe(me ?? undefined);
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
          Något som är fel? Klicka på "Ändra" nedan
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
            <Link
              className=" underline underline-offset-4"
              href="https://accounts.enskildakiller.se/user"
              target="_blank"
            >
              <h3>
                {me.firstname} {me.lastname}
              </h3>
            </Link>
            <p>{me.email}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-start flex-col items-start gap-4 md:flex-row md:justify-between">
        <div className="flex flex-col gap-2">
          <p>Telefon: {me.phone}</p>
          <p>Klass: {me.group}</p>
          {!me.isMember && (
            <>
              <Separator />
              <span className="flex flex-row gap-4">
                <p>Har du glömt att bli medlem i kåren?: </p>
                <Link
                  className="text-blue-300 underline underline-offset-4"
                  href="https://www.instagram.com/enskildakaren/"
                >
                  Instagram
                </Link>
              </span>
              <p>
                När du blivit medlem kan du klicka på "Ändra" och klicka i att
                du är medlem
              </p>
            </>
          )}
        </div>
        <div className="flex flex-row justify-end items-center gap-4">
          {editedMe && (
            <Dialog
              open={openSaveDialog}
              onOpenChange={(e) => {
                if (!e) {
                  setEditedMe(me);
                }
                setOpenDialog(e);
              }}
            >
              <DialogTrigger asChild>
                <Button variant={"outline"}>Ändra</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogHeader>Ändra information</DialogHeader>
                  <DialogDescription>
                    Ändra informationen om något är fel
                  </DialogDescription>
                </DialogHeader>
                {loadingSave ? (
                  <div className="flex justify-center items-center">
                    <Icons.spinner className="animate-spin w-8 h-8" />
                  </div>
                ) : (
                  <div
                    className="grid gap-4"
                    style={{ gridTemplateColumns: "1fr 3fr" }}
                  >
                    <Label>Förnamn</Label>
                    <Input
                      value={editedMe.firstname}
                      onChange={(e) =>
                        setEditedMe({ ...editedMe, firstname: e.target.value })
                      }
                    />
                    <Label>Efternamn</Label>
                    <Input
                      value={editedMe.lastname}
                      onChange={(e) =>
                        setEditedMe({ ...editedMe, lastname: e.target.value })
                      }
                    />
                    <Label>Telefon</Label>
                    <Input
                      value={editedMe.phone}
                      onChange={(e) =>
                        setEditedMe({ ...editedMe, phone: e.target.value })
                      }
                    />
                    <Label>Medlem i kåren</Label>
                    <Switch
                      checked={editedMe.isMember}
                      onCheckedChange={(e) =>
                        setEditedMe({ ...editedMe, isMember: e })
                      }
                    />
                    <Label>Klass</Label>
                    <SelectGroup
                      onChangeGroup={(e) =>
                        setEditedMe({ ...editedMe, group: e })
                      }
                      defaultGroup={editedMe.group}
                    />
                  </div>
                )}
                <DialogFooter>
                  <Button onClick={saveMe}>Spara</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}

          <SignOutButton>
            <Button>Logga ut</Button>
          </SignOutButton>
        </div>
      </CardFooter>
    </Card>
  );
}

export default MeRenderer;
