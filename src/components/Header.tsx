import Link from "next/link";
import React from "react";
import AlertHeader from "./AlertHeader";

function Header() {
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <div className="w-full px-12 flex flex-row justify-between items-center">
        <div className="flex justify-start items-center flex-row">
          <img src="/Logo.jpg" className="h-24" />
          <h1 className="px-8 text-5xl tracking-wide font-bold underline ">
            Killer {new Date(Date.now()).getFullYear()}
          </h1>
        </div>
        <nav className="flex md:flex-row flex-col justify-end items-center gap-4">
          <Link className=" text-lg underline font-serif" href="/">
            Startsida{" "}
          </Link>
          <Link className=" text-lg underline font-serif" href="/statistik">
            Statistik
          </Link>
          <Link className=" text-lg underline font-serif" href="/regler">
            Regler
          </Link>
          <Link className=" text-lg underline font-serif" href="/begrepp">
            Begrepp
          </Link>
          <Link className=" text-lg underline font-serif" href="/profil">
            Profil
          </Link>
          <Link className=" text-lg underline font-serif" href="/enskildakaren">
            Enskildakåren
          </Link>
        </nav>
      </div>
      <AlertHeader />
    </header>
  );
}

export default Header;
