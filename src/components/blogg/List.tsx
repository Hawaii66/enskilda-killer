import React from "react";
import PostRenderer from "./PostRenderer";
import { GetPosts } from "@/functions/getPosts";
import BloggAd from "../ads/BloggAd";

async function List() {
  const posts = await GetPosts();

  return (
    <div className="md:w-2/3 blog:w-1/3 lg:w-1/2 w-11/12">
      <div className="text-center">
        <p className="font-semibold text-gray-800 mb-4">
          Håll utkik här för att se dagens uppdatering och information om spelet
        </p>
      </div>
      <div className="w-full flex gap-4 flex-col">
        {posts
          .sort((a, b) => b.createdAt - a.createdAt)
          .map((post) => (
            <>
              <PostRenderer key={post.createdAt} post={post} />
              <BloggAd />
            </>
          ))}
      </div>
    </div>
  );
}

export default List;
