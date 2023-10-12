"use client";

import { useIsAuthed } from "@/hooks/useIsAuthed";

type Props = {
  children: React.ReactNode;
};

function layout({ children }: Props) {
  const isAuthed = useIsAuthed();

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

export default layout;
