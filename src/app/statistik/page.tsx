import Top from "@/components/Top";
import React from "react";

function page() {
  return (
    <>
      <Top text="Statistik" />
      <div className="w-full flex justify-center items-center mt-4">
        <div className="md:w-2/3 lg:grid lg:w-full lg:grid-cols-2 w-11/12 lg:px-8 flex flex-col gap-4">
          <div className="text-center lg:col-span-2">
            <h1 className="text-xl underline font-bold text-black">
              Statistik för Killer
            </h1>
            <p className="text-md font-bold text-gray-600">
              Statistiken göms då student poäng avgörs fredag 1/dec
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
