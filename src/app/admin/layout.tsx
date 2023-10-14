"use client";

import { Button } from "@/components/ui/button";
import { useIsAuthed } from "@/hooks/useIsAuthed";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

const tabs: { name: string; href: string }[] = [
  {
    href: "/admin/spelare",
    name: "Spelare",
  },
  {
    href: "/admin/begrepp",
    name: "Begrepp",
  },
  {
    href: "/admin/regler",
    name: "Regler",
  },
  {
    href: "/admin/installningar",
    name: "Inställningar",
  },
];

function Layout({ children }: Props) {
  const isAuthed = useIsAuthed("admin");

  const t = usePathname();

  console.log(t);

  if (!isAuthed) {
    return;
  }

  return (
    <div className="px-8">
      <h1 className="text-green-800 font-bold uppercase underline">Admin</h1>
      <nav>
        {tabs.map((tab) => (
          <Link href={tab.href}>
            <Button
              variant={"link"}
              className={`${t === tab.href ? "underline " : ""}`}
            >
              {tab.name}
            </Button>
          </Link>
        ))}
      </nav>
      <div>{children}</div>
    </div>
  );
}

export default Layout;
