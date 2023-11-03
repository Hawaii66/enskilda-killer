import { checkIsAdmin } from "@/functions/admin/checkIsAdmin";
import { supabase } from "@/functions/supabase";
import { Database } from "@/interfaces/database";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const isAdmin = await checkIsAdmin(request);
  if (!isAdmin) return NextResponse.json({}, { status: 404 });

  const data: { circle: number } = await request.json();

  const dataUsers = await supabase()
    .from("usersincircle")
    .select("user")
    .eq("circle", data.circle);

  const shuffledUsers = Shuffle(dataUsers.data?.map((i) => i.user) || []);

  await supabase().from("targets").delete().in("murderer", shuffledUsers);
  await supabase().from("targets").delete().in("target", shuffledUsers);

  const toInsert: Database["public"]["Tables"]["targets"]["Insert"][] =
    shuffledUsers.map((i, idx) => ({
      murderer: i,
      target:
        idx === shuffledUsers.length - 1
          ? shuffledUsers[0]
          : shuffledUsers[idx + 1],
    }));

  await supabase().from("targets").insert(toInsert);

  return NextResponse.json({});
};

function Shuffle<T>(array: T[]) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
