import React from "react";
import PostRenderer from "./PostRenderer";
import { GetPosts } from "@/functions/getPosts";

async function List() {
  const posts = await GetPosts();

  return (
    <div className="w-11/12 blog:w-1/3 md:w-2/3 lg:w-1/2">
      <div className="text-center">
        <p className="mb-4 font-semibold text-gray-800">
          Håll utkik här för att se KillerBloggen och uppdateringar samt
          information
        </p>
      </div>
      <div className="flex flex-col gap-4 w-full">
        {posts
          .sort((a, b) => b.createdAt - a.createdAt)
          .map((post, idx) => (
            <PostRenderer key={post.createdAt} post={post} />
          ))}
      </div>
    </div>
  );
}

export default List;
