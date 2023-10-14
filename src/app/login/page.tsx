"use client";

import Top from "@/components/Top";
import { Button } from "@/components/ui/button";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

function Page() {
  const isAuthenticated = useIsAuthenticated();
  const router = useRouter();
  const searchParams = useSearchParams();

  const { instance } = useMsal();

  const back = () => {
    const url = searchParams.get("return");
    if (url === null) {
      router.push("/");
      return;
    }
    router.push(`/${url}`);
    return;
  };

  useEffect(() => {
    if (isAuthenticated) {
      back();
      return;
    }
  }, [isAuthenticated]);

  return (
    <div className="w-full">
      <Top text="Logga in" />
      <div className="flex w-full flex-col gap-4 justify-center mt-12 items-center">
        <p className="text-lg">Logga in nedan för att se denna sida</p>
        <Button
          onClick={() => instance.loginRedirect()}
          className="w-1/5 h-24 text-3xl font-extrabold tracking-wider rounded-3xl"
        >
          Logga in
        </Button>
      </div>
    </div>
  );
}

export default Page;
