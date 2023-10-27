import Link from "next/link";
import React from "react";
import { Separator } from "./ui/separator";
import { supabase } from "@/functions/supabase";

async function GetAdminNames() {
  const names = await supabase().from("admins").select("name");

  return names.data?.map((i) => i.name) ?? [];
}

async function Footer() {
  const names = await GetAdminNames();

  return (
    <footer className="mb-16 mt-12 px-4">
      <Separator className="mb-4" />
      <p>
        Kontakt killer:{" "}
        <Link
          className="text-blue-300 tracking-wider underline"
          href={"https://www.instagram.com/enskildakaren/"}
          target="_blank"
        >
          EnskildaKåren
        </Link>{" "}
        (Instagram)
      </p>
      <p>
        Kontakt hemsidan:{" "}
        <Link
          className="text-blue-300 tracking-wider underline"
          href={"mailto:hawaiilive@outlook.com"}
        >
          hawaiilive@outlook.com
        </Link>{" "}
        (Sebastian Ahlman Na21B)
      </p>
      <p>Vi som ordnar Killer</p>
      <div className="grid grid-cols-2">
        {names.map((i) => (
          <p className="pl-4">• {i}</p>
        ))}
      </div>
    </footer>
  );
}

export default Footer;
