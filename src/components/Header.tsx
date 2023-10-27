"use client";

import Link from "next/link";
import React, { useState } from "react";
import AlertHeader from "./AlertHeader";
import { Button } from "./ui/button";
import { Icons } from "./Icons";

function Header() {
  const [expand, setExpand] = useState(false);

  return (
    <header className="w-full flex justify-center items-center flex-col">
      <div
        className={`w-full px-4  lg:px-12 flex ${
          expand ? "gap-4" : "gap-0"
        } lg:gap-0 flex-col lg:flex-row justify-between items-start lg:items-center`}
      >
        <div className="flex w-full justify-between items-center flex-row">
          <div className="flex justify-start items-center flex-row">
            <img src="/Logo.jpg" className="h-24" />
            <h1 className="px-8 flex-grow text-2xl  lg:text-5xl tracking-wide font-bold underline ">
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
          className={`flex lg:flex-row flex-col justify-end items-end lg:items-center gap-4 text-left lg:text-center w-full ${
            expand ? "overflow-visible" : "h-0 overflow-hidden"
          }`}
        >
          <Link className="text-lg underline font-serif" href="/">
            Startsida
          </Link>
          <Link className="text-lg underline font-serif" href="/statistik">
            Statistik
          </Link>
          <Link className="  text-lg underline font-serif" href="/regler">
            Regler
          </Link>
          <Link className="  text-lg underline font-serif" href="/begrepp">
            Begrepp
          </Link>
          <Link className="   text-lg underline font-serif" href="/profil">
            Profil
          </Link>
          <Link
            className="  text-lg underline font-serif"
            href="/enskildakaren"
          >
            Enskildakåren
          </Link>
        </nav>
      </div>
      <AlertHeader />
    </header>
  );
}

export default Header;
