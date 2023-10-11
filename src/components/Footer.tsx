import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <footer>
      <h3>Enskilda Killer </h3>
      <p>Just nu byggs denna hemsida om</p>
      <h3 className="text-lg text-black font-semibold">Contacts</h3>
      <div className="flex flex-row gap-12">
        <Link target="_blank" href={"mailto:hawaiilive@outlook.com"}>
          Website: <p className="text-blue-200">hawaiilive@outlook.com</p>
        </Link>
        <Link target="_blank" href={"mailto:hawaiilive@outlook.com"}>
          Killer:{" "}
          <p className="text-blue-200">
            neg_enskildakiller@nykopingsenskilda.com
          </p>
        </Link>
        <Link
          target="_blank"
          href={
            "https://github.com/Hawaii66/enskilda-killer/blob/master/README.md"
          }
        >
          Github: <p className="text-blue-200">För dig som vill se allt</p>
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
