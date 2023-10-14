import { supabase } from "../supabase";

export const MurdererMurder = async (
  murderer: number,
  target: number,
  circel: number
) => {
  await supabase().from("pendingkills").delete().eq("murderer", murderer);
  await supabase().from("pendingkills").delete().eq("murderer", target);

  await supabase()
    .from("usersincircle")
    .delete()
    .eq("user", target)
    .eq("circle", circel);

  await supabase().from("targets").delete().eq("murderer", murderer);
  await supabase().from("targets").delete().eq("target", target);

  const nextTargetData = await supabase()
    .from("targets")
    .select("target")
    .eq("murderer", target)
    .single();

  if (nextTargetData.data) {
    await supabase().from("targets").insert({
      murderer: murderer,
      target: nextTargetData.data.target,
    });
  }

  await supabase().from("kills").insert({
    circle: circel,
    murderer: murderer,
    target: target,
  });
};

export const GhostMurder = async (target: number, circel: number) => {
  await supabase().from("pendingkills").delete().eq("murderer", target);
  await supabase().from("pendingkills").delete().eq("target", target);

  await supabase()
    .from("usersincircle")
    .delete()
    .eq("user", target)
    .eq("circle", circel);

  await supabase().from("targets").delete().eq("murderer", target);
  await supabase().from("targets").delete().eq("target", target);
};
