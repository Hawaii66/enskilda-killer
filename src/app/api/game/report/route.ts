import { supabase } from "@/functions/supabase";
import { trackWithUser } from "@/functions/tracking";
import { VerifyUser } from "@/functions/verifyUser";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const { email, id } = await VerifyUser();
  if (!email || !id) return NextResponse.json({}, { status: 400 });
  await trackWithUser("Report", id, {
    id,
    email,
  });

  const data: { isMurderer: boolean } = await request.json();
  await trackWithUser("Report", id, data);

  const status = data.isMurderer ? await Murder(id) : await Target(id);
  await trackWithUser("Report", id, status);

  return NextResponse.json({}, { status: status === true ? 200 : 400 });
};

const Murder = async (murderer: number) => {
  const result = await supabase()
    .from("pendingkills")
    .select("*")
    .eq("murderer", murderer)
    .single();
  //The target was first with reporting, confirm kill
  if (result.data) {
    await trackWithUser(
      "Murder",
      murderer,
      "Mördare klickade sist, processar killen, användare är murderer"
    );
    return await ProcessKill(murderer);
  } else {
    const targetResult = await supabase()
      .from("targets")
      .select("*")
      .eq("murderer", murderer)
      .single();
    if (targetResult.data) {
      const targetId = targetResult.data.target;
      await supabase().from("pendingkills").insert({
        murderer: murderer,
        target: targetId,
        orderdBy: "Murderer",
      });
      return true;
    }
  }

  return false;
};

const Target = async (target: number) => {
  const result = await supabase()
    .from("pendingkills")
    .select("*")
    .eq("target", target)
    .single();

  //The murderer was first with reporting, confirm kill
  if (result.data) {
    await trackWithUser(
      "Murder",
      target,
      "Target klickade sist, processar killen, användare är target"
    );
    return await ProcessKill(result.data.murderer);
  } else {
    const murdererResult = await supabase()
      .from("targets")
      .select("*")
      .eq("target", target)
      .single();
    if (murdererResult.data) {
      const murdererId = murdererResult.data.murderer;
      await supabase().from("pendingkills").insert({
        murderer: murdererId,
        target: target,
        orderdBy: "Target",
      });
      return true;
    }
  }

  return false;
};

const ProcessKill = async (murderer: number) => {
  await supabase().from("pendingkills").delete().eq("murderer", murderer);

  const circleData = await supabase()
    .from("usersincircle")
    .select("circle")
    .eq("user", murderer)
    .single();
  if (!circleData.data) {
    return false;
  }

  const circleId = circleData.data.circle;

  const targetData = await supabase()
    .from("targets")
    .select("target")
    .eq("murderer", murderer)
    .single();
  if (!targetData.data) {
    return false;
  }

  const targetId = targetData.data.target;

  await supabase().from("kills").insert({
    circle: circleId,
    murderer: murderer,
    target: targetId,
  });

  const nextTarget = await supabase()
    .from("targets")
    .select("target")
    .eq("murderer", targetId)
    .single();
  if (!nextTarget.data) {
    return false;
  }

  const nextTargetId = nextTarget.data.target;

  await supabase().from("targets").delete().eq("murderer", murderer);
  await supabase().from("targets").delete().eq("murderer", targetId);

  await supabase().from("targets").insert({
    murderer: murderer,
    target: nextTargetId,
  });

  await supabase().from("usersincircle").delete().eq("user", targetId);

  return true;
};
