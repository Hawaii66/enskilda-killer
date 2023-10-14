"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import SelectUser from "../SelectUser";
import { Textarea } from "../ui/textarea";
import { Litigation } from "@/interfaces/Profile";
import { useApi } from "@/hooks/useApi";
import LitigationRenderer from "./Litigation";

function Litigations() {
  const [litigations, setLitigations] = useState<Litigation[] | null>(null);

  const apiFetch = useApi();

  const fetchLitigations = async () => {
    const response = await apiFetch("/api/user/litigations", { method: "GET" });
    if (response.status === 200) {
      setLitigations(await response.json());
    }
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
      <CardContent>
        {litigations && litigations.length > 0 ? (
          litigations.map((i) => <LitigationRenderer litigation={i} />)
        ) : (
          <p>Inga aktiva tvistemål</p>
        )}
      </CardContent>
      <CardFooter className="flex justify-end">
        <Dialog>
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
            <div
              className="grid gap-2 py-4"
              style={{ gridTemplateColumns: "1fr 3fr" }}
            >
              <Label>Inblandad</Label>
              <div className="flex w-full justify-start items-center">
                <SelectUser />
              </div>
              <Label>Vittne</Label>
              <div className="flex w-full justify-start items-center">
                <SelectUser />
              </div>
              <Label>Berätta mera</Label>
              <Textarea />
            </div>
            <DialogFooter className="w-full justify-between">
              <Button>Skicka</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}

export default Litigations;
