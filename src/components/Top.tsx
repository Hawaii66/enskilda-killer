import React from "react";

interface Props {
  text: string;
}

function Top({ text }: Props) {
  return (
    <div className="w-full bg-green-900 py-24 px-24 flex justify-center items-center">
      <div className="w-1/3">
        <h1 className="text-5xl font-serif tracking-widest font-extrabold text-white border-white text-center py-16 border-8 rounded-lg">
          {text}
        </h1>
      </div>
    </div>
  );
}

export default Top;
