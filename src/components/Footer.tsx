import Link from "next/link";
import React from "react";
import { Separator } from "./ui/separator";

function Footer() {
  return (
    <footer className="mb-16 mt-12 px-4">
      <Separator className="mb-4" />
      <p>
        Kontakt killer:{" "}
        <Link
          className="text-blue-300 tracking-wider underline"
          href={"https://www.instagram.com/enskildakaren/"}
          target="_blank"
        >
          EnskildaKåren
        </Link>{" "}
        (Instagram)
      </p>
      <p>
        Kontakt hemsidan:{" "}
        <Link
          className="text-blue-300 tracking-wider underline"
          href={"mailto:hawaiilive@outlook.com"}
        >
          hawaiilive@outlook.com
        </Link>{" "}
        (Sebastian Ahlman Na21B)
      </p>
    </footer>
  );
}

export default Footer;
