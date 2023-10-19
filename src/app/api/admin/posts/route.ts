import { emailToId } from "@/functions/emailToId";
import { GetPosts } from "@/functions/getPosts";
import { supabase } from "@/functions/supabase";
import { VerifyWithEmail } from "@/functions/verifyToken";
import { Post } from "@/interfaces/Post";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const email = await VerifyWithEmail(request);
  const id = await emailToId(email);
  if (!email || !id) return NextResponse.json({}, { status: 400 });

  const posts = await GetPosts();

  return NextResponse.json(posts);
};

export const POST = async (request: NextRequest) => {
  const email = await VerifyWithEmail(request);
  const id = await emailToId(email);
  if (!email || !id) return NextResponse.json({}, { status: 400 });

  await supabase().from("posts").insert({
    header: "Titel",
    image: "",
    miniheader: "Miniheader",
    text: "Text att visa",
  });

  return NextResponse.json({});
};

export const DELETE = async (request: NextRequest) => {
  const email = await VerifyWithEmail(request);
  const id = await emailToId(email);
  if (!email || !id) return NextResponse.json({}, { status: 400 });

  const url = new URL(request.url);
  const postId = parseInt(url.searchParams.get("id") || "");
  if (isNaN(postId)) {
    return NextResponse.json({}, { status: 400 });
  }

  await supabase().from("posts").delete().eq("id", postId);

  return NextResponse.json({});
};

export const PUT = async (request: NextRequest) => {
  const email = await VerifyWithEmail(request);
  const id = await emailToId(email);
  if (!email || !id) return NextResponse.json({}, { status: 400 });

  const post: Post = await request.json();

  await supabase()
    .from("posts")
    .update({
      header: post.header,
      image: post.image,
      miniheader: post.miniheader,
      text: post.text,
    })
    .eq("id", post.id);

  return NextResponse.json({});
};
