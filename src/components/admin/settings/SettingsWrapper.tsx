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
import Groups from "./Groups";
import { useBasicToast } from "@/hooks/useBasicToast";
import LitigationReasons from "./LitigationReasons";

type Props = {
  info: Awaited<ReturnType<typeof GetSettings>>;
};

function SettingsWrapper({ info: defaultInfo }: Props) {
  const [info, setInfo] = useState(defaultInfo);

  const apiFetch = useApi();
  const { toast, toastSave } = useBasicToast();

  const refresh = async () => {
    const response = await apiFetch("/api/admin/settings", { method: "GET" });
    if (response.status === 200) {
      setInfo(await response.json());
    } else {
      toast("Kunde inte ladda om inställningar");
    }
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <ControlLevers refresh={refresh} gameState={info.gameState} />
      <Circles refresh={refresh} circles={info.circles} />
      <Groups />
      <Admins admins={info.admins} refresh={refresh} />
      <LitigationReasons refresh={refresh} reasons={info.litigationReasons} />
      <EnskildaKaren elevkaren={info.elevkaren} refresh={refresh} />
      <Separator />
      <Reset />
    </div>
  );
}

export default SettingsWrapper;
