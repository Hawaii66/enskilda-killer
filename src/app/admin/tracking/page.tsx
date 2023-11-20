import List from "@/components/admin/tracking/List";
import { getTracking } from "@/functions/tracking";
import React from "react";

async function Page() {
  const trackings = await getTracking();

  return <List trackings={trackings} />;
}

export default Page;
