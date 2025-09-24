"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ClerkProvider,
  RedirectToSignIn,
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";

import React from "react";

export const revalidate = 0;
type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <div className="flex justify-center w-full">
          <Card className="w-11/12 md:w-2/3 lg:w-1/2">
            <CardHeader>
              <CardTitle>Logga in på din profil</CardTitle>
              <CardDescription>
                För att kunna se din profil måste du logga in
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="">
                Om du inte är med i killer men vill vara måste du klicka på
                &quot;Gå med&quot; efteråt för att anmäla dig
              </p>
            </CardContent>
            <CardFooter>
              <SignInButton>
                <Button className="bg-killer-blue text-white">
                  Logga in (Klicka på Gå Med efter du loggat in)
                </Button>
              </SignInButton>
            </CardFooter>
          </Card>
        </div>
      </SignedOut>
    </>
  );
}

export default Layout;
