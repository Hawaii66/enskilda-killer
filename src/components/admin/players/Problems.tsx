import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useApi } from "@/hooks/useApi";
import { useBasicToast } from "@/hooks/useBasicToast";
import React, { useEffect, useState } from "react";

function Problems() {
  const [targetProblems, setTargetProblems] = useState<number[]>([]);

  const apiFetch = useApi();
  const { toast } = useBasicToast();

  const fetchProblems = async () => {
    const response = await apiFetch("/api/admin/problems", { method: "GET" });
    if (response.status === 200) {
      setTargetProblems(await response.json());
    } else {
      toast("Cant fetch problems");
    }
  };

  useEffect(() => {
    fetchProblems();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Problem</CardTitle>
        <CardDescription>Visar problem som finns</CardDescription>
      </CardHeader>
      <CardContent>
        {targetProblems.map((user) => (
          <p>{user}</p>
        ))}
        {targetProblems.length === 0 && <p>Inga problem just nu</p>}
      </CardContent>
    </Card>
  );
}

export default Problems;
