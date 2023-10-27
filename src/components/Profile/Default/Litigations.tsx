"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Label } from "../../ui/label";
import SelectUser from "../../SelectUser";
import { Textarea } from "../../ui/textarea";
import { Litigation } from "@/interfaces/Profile";
import { useApi } from "@/hooks/useApi";
import LitigationRenderer from "./LitigationRenderer";
import { Icons } from "@/components/Icons";
import { useBasicToast } from "@/hooks/useBasicToast";

const LITIGATION_MAX_TEXT_LENGTH = 150;

function Litigations() {
  const [litigations, setLitigations] = useState<Litigation[] | null>(null);
  const [info, setInfo] = useState<{
    with: number;
    witness: number | undefined;
    text: string;
  }>({ text: "", with: 0, witness: 0 });
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const apiFetch = useApi();
  const { toast, toastSave } = useBasicToast();

  const fetchLitigations = async () => {
    const response = await apiFetch("/api/user/litigations", { method: "GET" });
    if (response.status === 200) {
      setLitigations(await response.json());
    } else {
      toast("Kunde inte hämta dina tvistemål");
    }
  };

  const deleteLitigation = async (id: number) => {
    const response = await apiFetch(`/api/user/litigations?litigation=${id}`, {
      method: "DELETE",
    });
    if (response.status === 200) {
      setLitigations((old) => old?.filter((i) => i.id !== id) || []);
      toastSave("Tog bort tvistemålet");
    } else {
      toast("Kunde inte ta bort tvistemålet");
    }
  };

  const createLitigation = async () => {
    setLoading(true);
    const response = await apiFetch("/api/user/litigations", {
      method: "POST",
      body: info,
    });
    if (response.status === 200) {
      await fetchLitigations();
      toastSave("Skapade ett nytt tvistemål");
    } else {
      toast("Kunde inte skapa ett nytt tvistemål");
    }

    setLoading(false);
    setOpen(false);
  };

  useEffect(() => {
    fetchLitigations();
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Tvistemål</CardTitle>
        <CardDescription>Anmäl tvistemål här</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {litigations && litigations.length > 0 ? (
          litigations.map((i) => (
            <LitigationRenderer
              deleteMe={() => deleteLitigation(i.id)}
              key={i.id}
              litigation={i}
            />
          ))
        ) : (
          <p>Inga aktiva tvistemål</p>
        )}
      </CardContent>
      <CardFooter className="flex justify-end">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Nytt tvistemål</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Skapa tvistemål</DialogTitle>
              <DialogDescription>
                Skapa ett nytt tvistemål, sök efter den tvistemålet är riktat
                mot samt ett vittne. Skriv även kort vad som hänt.
              </DialogDescription>
            </DialogHeader>
            {loading ? (
              <div className="w-full mt-4">
                <Icons.spinner className="w-24 h-24 animate-spin" />
              </div>
            ) : (
              <div
                className="grid gap-2 py-4"
                style={{ gridTemplateColumns: "1fr 3fr" }}
              >
                <Label>Inblandad</Label>
                <div className="flex w-full justify-start items-center">
                  <SelectUser
                    onChangeUser={(u) =>
                      setInfo({ ...info, with: u?.id || -1 })
                    }
                  />
                </div>
                <Label>Vittne</Label>
                <div className="flex w-full justify-start items-center">
                  <SelectUser
                    onChangeUser={(u) =>
                      setInfo({
                        ...info,
                        witness: u === undefined ? undefined : u.id,
                      })
                    }
                  />
                </div>
                <Label>Berätta mera</Label>
                <div>
                  <Textarea
                    maxLength={LITIGATION_MAX_TEXT_LENGTH}
                    value={info.text}
                    onChange={(e) => setInfo({ ...info, text: e.target.value })}
                  />
                  <Label>
                    {info.text.length} / {LITIGATION_MAX_TEXT_LENGTH}
                  </Label>
                </div>
              </div>
            )}
            <DialogFooter className="w-full justify-between">
              <Button
                onClick={createLitigation}
                disabled={info.text === "" || info.with === -1}
              >
                Skicka
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}

export default Litigations;
