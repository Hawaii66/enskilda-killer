import PostRenderer from "@/components/blogg/PostRenderer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Post } from "@/interfaces/Post";
import { format } from "date-fns";
import React, { useState } from "react";

type Props = {
  post: Post;
  save: (post: Post) => void;
  deletePost: () => void;
};

function EditPostRenderer({ post: defaultPost, save, deletePost }: Props) {
  const [post, setPost] = useState(defaultPost);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Id: {post.id}</CardTitle>
        <CardDescription>
          {format(post.createdAt, "yyyy-MM-dd HH:mm")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Label>Title</Label>
        <Input
          value={post.header}
          onChange={(e) => setPost({ ...post, header: e.target.value })}
        />
        <Label>Miniheader</Label>
        <Input
          value={post.miniheader}
          onChange={(e) => setPost({ ...post, miniheader: e.target.value })}
        />
        <Label>Bild</Label>
        <div className="h-12 flex flex-row gap-4">
          <Input
            value={post.image}
            onChange={(e) => setPost({ ...post, image: e.target.value })}
            placeholder="Kopiera bildens länk"
          />
          {post.image && <img alt="cant load image" src={post.image} />}
        </div>
        <Label>Text</Label>
        <Textarea
          value={post.text}
          onChange={(e) => setPost({ ...post, text: e.target.value })}
          className="h-48"
        />
      </CardContent>
      <CardFooter className="gap-4">
        <Button onClick={() => save(post)}>Spara</Button>
        <Button variant={"destructive"} onClick={deletePost}>
          Ta bort
        </Button>
      </CardFooter>
    </Card>
  );
}

export default EditPostRenderer;
