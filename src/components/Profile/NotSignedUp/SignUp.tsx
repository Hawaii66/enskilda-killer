import { Icons } from "@/components/Icons";
import Top from "@/components/Top";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useApi } from "@/hooks/useApi";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type Info = {
  firstname: string;
  lastname: string;
  phone: string;
  group: string;
};

type Props = {
  onJoin: () => void;
};

function SignUp({ onJoin }: Props) {
  const [email, setEmail] = useState("");
  const [info, setInfo] = useState<Info>({
    firstname: "",
    group: "",
    lastname: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);

  const apiFetch = useApi();
  const router = useRouter();

  const fetchEmail = async () => {
    const response = await apiFetch("/api/user/email", { method: "GET" });
    if (response.status === 200) {
      setEmail((await response.json()).email);
    }
  };

  useEffect(() => {
    fetchEmail();
  }, []);

  const join = async () => {
    setLoading(true);

    console.log(info);
    const response = await apiFetch("/api/user/join", {
      method: "POST",
      body: info,
    });
    if (response.status === 200) {
      onJoin();
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="w-full">
        <Top text="Profil" />
        <div className="w-full flex flex-col justify-center items-center mt-12 gap-4">
          <Icons.spinner className="w-24 h-24 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Top text="Profil" />
      <div className="w-full flex flex-col justify-center items-center mt-12 gap-4">
        <p className="text-lg font-bold text-black">
          Vill du vara med i årets killer?
        </p>
        <p>Du är inte anmälen ännu</p>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-green-800 text-white px-12 py-8 text-2xl tracking-wide font-bold">
              Gå med
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Information</DialogTitle>
              <DialogDescription>
                Vi behöver veta lite mer om dig
              </DialogDescription>
            </DialogHeader>
            <div
              className="grid gap-4"
              style={{ gridTemplateColumns: "1fr 2fr" }}
            >
              <Label className="flex justify-start items-center">Förnamn</Label>
              <Input
                value={info.firstname}
                onChange={(e) =>
                  setInfo({ ...info, firstname: e.target.value })
                }
              />
              <Label className="flex justify-start items-center">
                Efternamn
              </Label>
              <Input
                value={info.lastname}
                onChange={(e) => setInfo({ ...info, lastname: e.target.value })}
              />
              <Separator />
              <Separator />
              <Label className="flex justify-start items-center">Klass</Label>
              <Input
                value={info.group}
                onChange={(e) => setInfo({ ...info, group: e.target.value })}
              />
              <Label className="flex justify-start items-center">Telefon</Label>
              <Input
                type="tel"
                value={info.phone}
                onChange={(e) => setInfo({ ...info, phone: e.target.value })}
              />
              <Separator />
              <Separator />
              <Label className="flex justify-start items-center">Email</Label>
              <Input value={email} disabled />
            </div>
            <DialogFooter className="w-full justify-center items-center">
              <Button onClick={join}>Gå med</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default SignUp;
