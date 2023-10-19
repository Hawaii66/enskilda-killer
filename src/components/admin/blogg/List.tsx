"use client";

import { useApi } from "@/hooks/useApi";
import { Post } from "@/interfaces/Post";
import React, { useEffect, useState } from "react";
import EditPostRenderer from "./EditPostRenderer";
import { Button } from "@/components/ui/button";
import { useBasicToast } from "@/hooks/useBasicToast";

function List() {
  const [posts, setPosts] = useState<Post[]>([]);

  const apiFetch = useApi();
  const { toast, toastSave } = useBasicToast();

  const fetchPosts = async () => {
    const response = await apiFetch("/api/admin/posts", { method: "GET" });
    if (response.status === 200) {
      setPosts(await response.json());
    } else {
      toast("Kunde inte ladda in inläggen", true);
    }
  };

  const savePost = async (post: Post) => {
    const response = await apiFetch("/api/admin/posts", {
      method: "PUT",
      body: post,
    });
    if (response.status === 200) {
      await fetchPosts();
      toastSave("Inlägget sparat");
    } else {
      toast("Kunde inte spara inlägget", true);
    }
  };

  const deletePost = async (post: Post) => {
    const response = await apiFetch(`/api/admin/posts?id=${post.id}`, {
      method: "DELETE",
    });
    if (response.status === 200) {
      await fetchPosts();
      toastSave("Inlägget toggs bort");
    } else {
      toast("Kunde inte ta bort inlägget", true);
    }
  };

  const createPost = async () => {
    const response = await apiFetch("/api/admin/posts", { method: "POST" });
    if (response.status === 200) {
      await fetchPosts();
      toastSave("Skapade ett inlägg");
    } else {
      toast("Kunde inte skapa ett nytt inlägg", true);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <Button className="w-1/3" onClick={createPost}>
        Nytt inlägg
      </Button>
      {posts
        .sort((a, b) => b.createdAt - a.createdAt)
        .map((p) => (
          <EditPostRenderer
            deletePost={() => deletePost(p)}
            post={p}
            save={savePost}
            key={p.id}
          />
        ))}
      <div>
        <p>Info för att styla text</p>
        <div>
          Använd "{"<b>text</b>"}" för att få: <b>text</b>
          <br />
          Använd "{"<br/>"}" för att få allt på en ny linje
          <br /> Använd "{"<i>text</i>"}" för att få: <i>text</i>
          <br />
          Använd "{"<ul><li>1. test</li><li>2. test</li></ul>"}" för att få{" "}
          <ul>
            <li>1. test</li>
            <li>2. test</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default List;
