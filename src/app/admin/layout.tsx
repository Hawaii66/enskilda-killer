"use client";

import { useIsAuthed } from "@/hooks/useIsAuthed";

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  const isAuthed = useIsAuthed("admin");

  if (!isAuthed) {
    return;
  }

  return (
    <div>
      <h1 className="text-blue-500">Admin</h1>
      {children}
    </div>
  );
}

export default Layout;
