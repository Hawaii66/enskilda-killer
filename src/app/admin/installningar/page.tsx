"use client";

import Admins from "@/components/admin/settings/Admins";
import Circles from "@/components/admin/settings/Circles";
import ControlLevers from "@/components/admin/settings/ControlLevers";
import EnskildaKaren from "@/components/admin/settings/EnskildaKaren";
import Reset from "@/components/admin/settings/Reset";
import { Separator } from "@/components/ui/separator";

function Page() {
  return (
    <div className="w-full flex flex-col gap-4">
      <ControlLevers />
      <Circles />
      <Admins />
      <EnskildaKaren />
      <Separator />
      <Reset />
    </div>
  );
}

export default Page;
