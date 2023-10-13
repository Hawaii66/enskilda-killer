"use client";

import { useIsAuthed } from "@/hooks/useIsAuthed";
import React from "react";

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  const isAuthed = useIsAuthed("profil");

  /*if (!isAuthed) {
    return;
  }*/

  return <>{children} </>;
}

export default Layout;
