"use client";

import { supabase } from "@/functions/supabase";
import { Post } from "@/interfaces/Post";
import React from "react";
import PostRenderer from "./PostRenderer";
import { Separator } from "../ui/separator";
import { GetPosts } from "@/functions/getPosts";

async function List() {
  const posts = await GetPosts();

  return (
    <div className="w-1/3">
      <div className="text-center">
        <h1 className="font-semibold text-lg text-gray-800">
          Ett flöde av alla de blogg inlägg vi gör
        </h1>
        <p className="font-semibold text-gray-600">
          Håll utkik här för att se dagens uppdatering och information om spelet
        </p>
      </div>
      <Separator className="my-4" />
      <div className="w-full flex gap-4 flex-col">
        {posts
          .sort((a, b) => b.createdAt - a.createdAt)
          .map((post) => (
            <PostRenderer key={post.createdAt} post={post} />
          ))}
      </div>
    </div>
  );
}

export default List;
