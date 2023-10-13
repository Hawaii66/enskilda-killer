import Link from "next/link";
import React from "react";

function Header() {
  return (
    <header className="pt-8 w-full flex justify-center items-center flex-col">
      <div className="1/2">
        <h1 className="text-3xl text-red-500 font-bold">
          Enskilda Killer {new Date(Date.now()).getFullYear()}
        </h1>
        <h2>Anmälan öppnar: 16/10 2023</h2>
        <h2>Killer startar: 6/11 2023</h2>
      </div>
      <div className="w-full px-12 flex flex-row justify-between items-center">
        <div className="flex justify-start items-center flex-row">
          <img src="/Logo.jpg" className="h-24" />
          <h1 className="px-8 text-5xl tracking-wide font-bold">
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
    </header>
  );
}

export default Header;
