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
    <Card className="pb-4">
      <CardHeader>
        <CardTitle>{post.header}</CardTitle>
        <CardDescription>{post.miniheader}</CardDescription>
      </CardHeader>
      <CardContent className="h-full">
        {post.image && (
          <img
            className="w-full md:w-1/3 md:float-right rounded-lg"
            src={post.image}
            alt="Image for this day"
          />
        )}
        <div
          className="h-full"
          dangerouslySetInnerHTML={{
            __html: post.text,
          }}
        />
      </CardContent>
    </Card>
  );
}

export default PostRenderer;
