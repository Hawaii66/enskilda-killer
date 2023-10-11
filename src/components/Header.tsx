import React from "react";

function Header() {
  return (
    <header className="py-8">
      <h1 className="text-3xl text-red-500 font-bold">
        Enskilda Killer {new Date(Date.now()).getFullYear()}
      </h1>
      <h2>Anmälan öppnar: 16/10 2023</h2>
      <h2>Killer startar: 6/11 2023</h2>
    </header>
  );
}

export default Header;
