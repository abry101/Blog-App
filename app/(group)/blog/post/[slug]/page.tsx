"use client";
import { notFound, useParams } from "next/navigation";
import { useMemo } from "react";
import data from "@/public/data/data.json";
import { Post } from "@/types";

export default function BlogDetail() {
  const { slug } = useParams();

  const post = useMemo(() => {
    const query = decodeURI(slug);
    return data.posts
      .filter((p) => p.id.toString() === query || p.title === query)
      .map((post) => {
        const author = data.users.filter((u) => u.id == post.authorId)?.at(0);
        const category = data.categories
          .filter((c) => c.id == post.categoryId)
          ?.at(0);
        const tags = data.tags.filter((t) => post.tags.includes(t.name));
        const comments = data.comments.filter((c) => c.postId == post.id);
        return { ...post, author, tags, category, comments } as Post;
      })
      ?.at(0);
  }, [slug]);

  if (!post) {
    return notFound();
  }

  return (
    <>
      <h4 className="text-2xl">slug:{decodeURI(slug)}</h4>
    </>
  );
}
