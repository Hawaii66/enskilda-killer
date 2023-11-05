import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useApi } from "@/hooks/useApi";
import { useBasicToast } from "@/hooks/useBasicToast";
import React from "react";

function Debug() {
  const apiFetch = useApi();
  const { toast, toastTitle } = useBasicToast();

  const updateClerkIds = async () => {
    const response = await apiFetch("/api/admin/clerkids", { method: "POST" });
    if (response.status === 200) {
      toastTitle("Klart", "Info finns i konsolen");
      const result = await response.json();
      console.log(result);
    } else {
      toast("Kunde inte uppdatera clerk ids");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Debug Info</CardTitle>
        <CardDescription>
          Se info om killer, öppna konsolen för mera info
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={updateClerkIds}>Updatera Clerk Ids</Button>
      </CardContent>
    </Card>
  );
}

export default Debug;
