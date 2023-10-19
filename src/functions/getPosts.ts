import { Post } from "@/interfaces/Post";
import { supabase } from "./supabase";

export async function GetPosts() {
  const { data } = await supabase().from("posts").select("*");

  const posts: Post[] =
    data?.map((post) => ({
      createdAt: new Date(post.created_at).getTime(),
      header: post.header,
      image: post.image,
      miniheader: post.miniheader,
      text: post.text,
      id: post.id,
    })) || [];

  return posts;
}
