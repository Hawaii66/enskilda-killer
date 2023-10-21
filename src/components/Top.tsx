import React from "react";

interface Props {
  text: string;
}

function Top({ text }: Props) {
  return (
    <div className="w-full bg-green-900 py-12 px-4 md:px-24 flex justify-center items-center">
      <div className="">
        <h1 className="px-2 md:px-8 text-5xl font-serif tracking-widest font-extrabold text-white border-white text-center py-8 border-8 rounded-lg">
          {text}
        </h1>
      </div>
    </div>
  );
}

export default Top;
