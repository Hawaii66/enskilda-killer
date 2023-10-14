"use client";

import { GetSettings } from "@/functions/admin/getSettings";
import { Separator } from "@radix-ui/react-separator";
import React, { useState } from "react";
import Admins from "./Admins";
import Circles from "./Circles";
import ControlLevers from "./ControlLevers";
import EnskildaKaren from "./EnskildaKaren";
import Reset from "./Reset";
import { useApi } from "@/hooks/useApi";

type Props = {
  info: Awaited<ReturnType<typeof GetSettings>>;
};

function SettingsWrapper({ info: defaultInfo }: Props) {
  const [info, setInfo] = useState(defaultInfo);

  const apiFetch = useApi();

  const refresh = async () => {
    const response = await apiFetch("/api/admin/settings", { method: "GET" });
    if (response.status === 200) {
      setInfo(await response.json());

      alert("Sparat");
    }
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <ControlLevers refresh={refresh} gameState={info.gameState} />
      <Circles refresh={refresh} circles={info.circles} />
      <Admins />
      <EnskildaKaren />
      <Separator />
      <Reset />
    </div>
  );
}

export default SettingsWrapper;
