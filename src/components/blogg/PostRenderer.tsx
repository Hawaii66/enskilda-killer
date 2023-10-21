import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Post } from "@/interfaces/Post";

type Props = {
  post: Post;
};

function PostRenderer({ post }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{post.header}</CardTitle>
        <CardDescription>{post.miniheader}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col justify-center items-center">
        {post.image && (
          <img
            className="w-11/12 lg:w-2/3 rounded-lg"
            src={post.image}
            alt="Image for this day"
          />
        )}
        <div dangerouslySetInnerHTML={{ __html: post.text }} />
      </CardContent>
    </Card>
  );
}

export default PostRenderer;
