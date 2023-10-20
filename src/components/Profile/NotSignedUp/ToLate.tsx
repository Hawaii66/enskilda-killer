import Top from "@/components/Top";
import { Button } from "@/components/ui/button";
import { SignOutButton } from "@clerk/nextjs";
import React from "react";

function ToLate() {
  return (
    <div>
      <Top text="Profil" />
      <div className="flex flex-col gap-2 justify-center items-center mt-12">
        <h3 className="text-lg text-black font-bold tracking-wide">
          Killer har startat
        </h3>
        <p className="text-md text-gray-500 font-semibold">
          Du är inte med i Killer
        </p>
        <SignOutButton>
          <Button variant={"outline"}>Logga ut</Button>
        </SignOutButton>
      </div>
    </div>
  );
}

export default ToLate;
