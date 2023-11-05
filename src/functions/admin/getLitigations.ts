import { FullLitigation } from "@/interfaces/Admin";
import { getPlayerContactInfos } from "../getPlayerContactInfo";
import { supabase } from "../supabase";

export async function GetLitigations() {
  const { data } = await supabase().from("litigations").select("*");

  if (data === null) return [];

  const uniqueUsersIds = new Set<number>();

  data.forEach((d) => {
    uniqueUsersIds.add(d.user);
    uniqueUsersIds.add(d.with);
    if (d.witness) {
      uniqueUsersIds.add(d.witness);
    }
  });

  const uniqueUsers = (
    await getPlayerContactInfos(Array.from(uniqueUsersIds))
  ).filter(filterUndefined);

  const investigatorsData = await supabase()
    .from("admins")
    .select("*")
    .in(
      "id",
      data.map((i) => i.investigator).filter((i) => i !== null)
    );
  const helperData = await supabase()
    .from("admins")
    .select("*")
    .in(
      "id",
      data.map((i) => i.helper).filter((i) => i !== null)
    );

  const litigations: Partial<FullLitigation>[] = data.map((litigation) => ({
    text: litigation.text,
    id: litigation.id,
    reason: litigation.reason,
    user: uniqueUsers.find((i) => i.id === litigation.user),
    with: uniqueUsers.find((i) => i.id === litigation.with),
    witness: uniqueUsers.find((i) => i.id === litigation.witness),
    investigator: litigation.investigator
      ? {
          email:
            investigatorsData.data?.find(
              (i) => i.id === litigation.investigator
            )?.email || "",
          name:
            investigatorsData.data?.find(
              (i) => i.id === litigation.investigator
            )?.name || "",
        }
      : undefined,
    helper: litigation.helper
      ? {
          email:
            helperData.data?.find((i) => i.id === litigation.helper)?.email ||
            "",
          name:
            helperData.data?.find((i) => i.id === litigation.helper)?.name ||
            "",
        }
      : undefined,
  }));

  return litigations.filter(filterPartial);
}

const filterUndefined = <T>(t: T | undefined): t is T => {
  return t !== undefined;
};

const filterPartial = (t: Partial<FullLitigation>): t is FullLitigation => {
  return (
    t.id !== undefined &&
    t.text !== undefined &&
    t.user !== undefined &&
    t.with !== undefined
  );
};
