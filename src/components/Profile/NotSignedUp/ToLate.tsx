import Top from "@/components/Top";
import React from "react";

function ToLate() {
  return (
    <div>
      <Top text="Profil" />
      <div className="flex flex-col justify-center items-center mt-12">
        <h3 className="text-lg text-black font-bold tracking-wide">
          Killer har startat
        </h3>
        <p className="text-md text-gray-500 font-semibold">
          Du är inte med i Killer
        </p>
      </div>
    </div>
  );
}

export default ToLate;
