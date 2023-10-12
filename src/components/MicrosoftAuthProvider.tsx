"use client";

import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import React from "react";

const pca = new PublicClientApplication({
  auth: {
    clientId: "1bb9414f-49c6-470f-9d66-a130fed92097",
  },
});
type Props = {
  children: React.ReactNode;
};

function MicrosoftAuthProvider({ children }: Props) {
  return <MsalProvider instance={pca}>{children}</MsalProvider>;
}

export default MicrosoftAuthProvider;
