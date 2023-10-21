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

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <div className="w-full flex justify-center ">
          <Card className="md:w-2/3 lg:w-1/2 w-11/12">
            <CardHeader>
              <CardTitle>Logga in på din profil</CardTitle>
              <CardDescription>
                För att kunna se din profil måste du logga in
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Klicka på knappen "Logga in", följ instruktionerna och logga in
                med din skol mail.
              </p>
              <p>
                Om du inte är med i killer men vill vara måste du klicka på "Gå
                med" efteråt för att anmäla dig
              </p>
            </CardContent>
            <CardFooter>
              <SignInButton>
                <Button className="bg-green-800 text-white">Logga in</Button>
              </SignInButton>
            </CardFooter>
          </Card>
        </div>
      </SignedOut>
    </>
  );
}

export default Layout;
