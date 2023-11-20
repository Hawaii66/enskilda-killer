import { checkIsAdmin } from "@/functions/admin/checkIsAdmin";
import { supabase } from "@/functions/supabase";
import { Circle } from "@/interfaces/Circle";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const isAdmin = await checkIsAdmin(request);
  if (!isAdmin) return NextResponse.json({}, { status: 404 });

  var circles: Circle[] = await request.json();

  const { data: dbCircles } = await supabase().from("circles").select("id");

  circles = circles.filter((i) => !dbCircles?.map((i) => i.id).includes(i.id));

  await supabase()
    .from("circles")
    .insert(circles.map((i) => ({ name: i.name })));

  return NextResponse.json({});
};

export const PUT = async (request: NextRequest) => {
  const isAdmin = await checkIsAdmin(request);
  if (!isAdmin) return NextResponse.json({}, { status: 404 });

  var circle: Circle = await request.json();

  await supabase()
    .from("circles")
    .update({
      hidden: circle.hidden,
    })
    .eq("id", circle.id);

  return NextResponse.json({});
};
