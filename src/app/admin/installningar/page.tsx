import SettingsWrapper from "@/components/admin/settings/SettingsWrapper";
import { GetSettings } from "@/functions/admin/getSettings";

export const revalidate = 0;

async function Page() {
  const info = await GetSettings();

  return <SettingsWrapper info={info} />;
}

export default Page;
