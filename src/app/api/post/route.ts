import { emailToId } from "@/functions/emailToId";
import { supabase } from "@/functions/supabase";
import { VerifyWithEmail } from "@/functions/verifyToken";
import { Post } from "@/interfaces/Post";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const { data } = await supabase()
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (!data) {
    return NextResponse.json({}, { status: 400 });
  }

  const post: Post = {
    createdAt: new Date(data.created_at).getTime(),
    header: data.header,
    id: data.id,
    image: data.image,
    miniheader: data.miniheader,
    text: data.text,
  };

  return NextResponse.json(post);
};
