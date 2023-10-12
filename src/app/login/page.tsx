"use client";

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
    <div>
      <button onClick={() => instance.loginRedirect()}>Sign in</button>
    </div>
  );
}

export default Page;
