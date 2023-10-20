"use client";

import { Button } from "@/components/ui/button";
import { useApi } from "@/hooks/useApi";
import { useBasicToast } from "@/hooks/useBasicToast";
import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
};

const tabs: { name: string; href: string }[] = [
  {
    href: "/admin/spelare",
    name: "Spelare",
  },
  {
    href: "/admin/tvistemal",
    name: "Tvistemål",
  },
  {
    href: "/admin/blogg",
    name: "Blogg",
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
  const [isAdmin, setIsAdmin] = useState(false);

  const t = usePathname();

  const apiFetch = useApi();
  const { toastTitle } = useBasicToast();

  const checkIsAdmin = async () => {
    const response = await apiFetch("/api/game/admin", { method: "POST" });
    if (response.status === 200) {
      setIsAdmin(true);
    } else {
      toastTitle(
        "Du är inte admin",
        "Du är inte en admin och har därför inte tillgång till dessa ställen",
        true
      );
    }
  };
  useEffect(() => {
    checkIsAdmin();
  }, []);

  return (
    <>
      <SignedIn>
        {isAdmin ? (
          <div className="px-8">
            <h1 className="text-green-800 font-bold uppercase underline">
              Admin
            </h1>
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
        ) : (
          <>
            <p>Hämtar admin status...</p>
            <SignOutButton>
              <Button variant={"outline"}>Logga ut</Button>
            </SignOutButton>
          </>
        )}
      </SignedIn>
      <SignedOut>
        <p>Du är inte inloggad</p>
        <SignInButton>
          <Button>Logga in</Button>
        </SignInButton>
      </SignedOut>
    </>
  );
}

export default Layout;
