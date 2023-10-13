import Circle from "@/components/Profile/Circle";
import Kills from "@/components/Profile/Kills";
import Litigations from "@/components/Profile/Litigations";
import Me from "@/components/Profile/Me";
import Top from "@/components/Top";
import React from "react";

function Page() {
  return (
    <div>
      <Top text="Profil" />
      <div className="w-full flex justify-center items-center">
        <div className="2xl:w-1/3 lg:w-2/3 w-11/12 flex justify-center items-center gap-8 pt-8 flex-col">
          <Me />
          <Circle />
          <Kills />
          <Litigations />
        </div>
      </div>
    </div>
  );
}

export default Page;
