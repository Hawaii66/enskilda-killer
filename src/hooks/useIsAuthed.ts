import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useIsAuthed = () => {
  const isAuthenticated = useIsAuthenticated();
  const router = useRouter();

  const { inProgress, accounts } = useMsal();

  useEffect(() => {
    if (inProgress == "none" && !isAuthenticated) {
      router.push("/login?return=admin");
    }
  }, [isAuthenticated, inProgress, accounts]);

  if (inProgress !== "none") {
    return false;
  }

  if (!isAuthenticated) {
    return false;
  }

  return true;
};
