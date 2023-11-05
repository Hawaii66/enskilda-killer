import { Icons } from "@/components/Icons";
import SelectGroup from "@/components/SelectGroup";
import Top from "@/components/Top";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { Switch } from "@/components/ui/switch";
import { isSchoolEmail } from "@/functions/isSchoolEmail";
import { useApi } from "@/hooks/useApi";
import { useBasicToast } from "@/hooks/useBasicToast";
import { SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Info = {
  firstname: string;
  lastname: string;
  phone: string;
  group: string;
  isMember: boolean;
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
    isMember: false,
  });
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    fetchEmail();
  }, []);

  const join = async () => {
    setLoading(true);

    const toSend: typeof info = {
      firstname: info.firstname.trim(),
      group: info.group,
      isMember: info.isMember,
      lastname: info.lastname.trim(),
      phone: info.phone.trim(),
    };

    const response = await apiFetch("/api/user/join", {
      method: "POST",
      body: toSend,
    });
    if (response.status === 200) {
      onJoin();
      toastSave("Du är nu med i Killer");
    } else {
      toast("Du kunde inte gå med i spelet, testa igen D:");
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
    <div className="w-full flex flex-col items-center">
      <div className="md:w-2/3 lg:w-1/2 w-11/12 flex flex-col justify-center items-center mt-12 gap-4">
        <div className="text-center text-xl font-bold text-black mb-8">
          <h1>
            Hej <span className="text-green-800 underline">{email}</span>!
          </h1>
          {isSchoolEmail(email) ? (
            <p>Vi hittade inte din email bland de anmälda personerna</p>
          ) : (
            <>
              <p>Du måste använda din skol mail @nykopingsenskilda.se</p>
              <p>Just nu har du mailen: {email}</p>
            </>
          )}
        </div>

        {isSchoolEmail(email) && (
          <>
            <p className="text-lg font-bold text-black">
              Vill du vara med i årets killer?
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-green-800 hover:bg-green-700 hover:text-black text-white px-12 py-8 text-2xl tracking-wide font-bold">
                  Gå med i Killer
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
                  <Label className="flex justify-start items-center">
                    Förnamn
                  </Label>
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
                    onChange={(e) =>
                      setInfo({ ...info, lastname: e.target.value })
                    }
                  />
                  <Separator />
                  <Separator />
                  <Label className="flex justify-start items-center">
                    Klass
                  </Label>
                  <SelectGroup
                    defaultGroup={info.group}
                    onChangeGroup={(e) => setInfo({ ...info, group: e })}
                  />
                  <Label className="flex justify-start items-center">
                    Telefon
                  </Label>
                  <Input
                    type="tel"
                    value={info.phone}
                    onChange={(e) =>
                      setInfo({ ...info, phone: e.target.value })
                    }
                  />
                  <Separator />
                  <Separator />
                  <p className="col-span-2 text-sm text-gray-400">
                    Du kan göra detta senare
                  </p>
                  <Label className="flex justify-start items-center">
                    Medlem i kåren
                  </Label>
                  <Switch
                    onCheckedChange={(e) => setInfo({ ...info, isMember: e })}
                    checked={info.isMember}
                  />
                  <Link
                    className="text-blue-300 underline underline-offset-4"
                    href={"https://www.instagram.com/enskildakaren/"}
                    target="_blank"
                  >
                    Bli medlem här
                  </Link>
                  <p className="col-span-2">
                    Följ länken i bion på instagram och kom tillbaka hit sen för
                    att slutföra din anmälan
                  </p>
                  <Separator />
                  <Separator />
                  <Label className="flex justify-start items-center">
                    Email
                  </Label>
                  <Input value={email} disabled />
                </div>
                <DialogFooter className="w-full justify-center items-center">
                  <Button onClick={join}>Gå med</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </>
        )}
        <Card>
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
        <SignOutButton>
          <Button>Logga ut</Button>
        </SignOutButton>
      </div>
    </div>
  );
}

export default SignUp;
