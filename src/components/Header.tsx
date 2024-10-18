"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import AlertHeader from "./AlertHeader";
import { Button } from "./ui/button";
import { Icons } from "./Icons";
import { useRouter } from "next/navigation";

function Header() {
  const [expand, setExpand] = useState(false);
  const router = useRouter();

  useEffect(() => {
    document.onkeydown = (e) => {
      if (e.key === "a" || e.key === "A") {
        if (e.target === document.querySelector("body")) {
          router.push("/admin");
        }
      }
    };
  }, []);

  return (
    <header className="flex flex-col justify-center items-center w-full">
      <div
        className={`w-full px-4  lg:px-12 flex ${
          expand ? "gap-4" : "gap-0"
        } lg:gap-0 flex-col lg:flex-row justify-between items-start lg:items-center`}
      >
        <div className="flex flex-row justify-between items-center w-full">
          <div className="flex flex-row justify-start items-center">
            <img
              src="/Logo.jpg"
              className="my-2 rounded-md h-16 object-contain"
            />
            <h1 className="flex-grow px-8 font-bold text-2xl lg:text-5xl tracking-wide">
              Killer {new Date(Date.now()).getFullYear()}
            </h1>
          </div>
          <Button
            onClick={() => setExpand((e) => !e)}
            className={`flex flex-row gap-2 lg:hidden overflow-auto`}
            variant={"outline"}
          >
            <p>Meny</p>
            <Icons.expand className="w-4 h-4" />
          </Button>
        </div>
        <nav
          className={`flex lg:flex-row flex-col justify-end items-end lg:items-center gap-4 text-left lg:text-center lg:overflow-visible w-full ${
            expand ? "overflow-visible" : "h-0 overflow-hidden"
          }`}
        >
          <Link className="font-serif text-lg underline" href="/">
            Startsida
          </Link>
          <Link className="font-serif text-lg underline" href="/statistik">
            Statistik
          </Link>
          <Link className="font-serif text-lg underline" href="/regler">
            Regler
          </Link>
          <Link className="font-serif text-lg underline" href="/begrepp">
            Begrepp
          </Link>
          <Link className="font-serif text-lg underline" href="/profil">
            Profil
          </Link>
          <Link className="font-serif text-lg underline" href="/enskildakaren">
            Enskildakåren
          </Link>
        </nav>
      </div>
      <AlertHeader />
    </header>
  );
}

export default Header;
