"use client";
import { notFound, useParams, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import data from "@/public/data/data.json";
import { Category, Post } from "@/types";
import Link from "next/link";
import PostCard1 from "@/components/widgets/PostCard1";
import PostCard2 from "@/components/widgets/PostCard2";
import { useTheme } from "next-themes";

export default function BlogCategory({
  params,
}: {
  params: { slug: string[] };
}) {
  const [viewType, setViewType] = useState("list");
  const { theme } = useTheme();
  const { slug } = params;

  const posts = useMemo(() => {
    const cat = data.categories.filter((c) => c.name == slug[0]).at(0);
    return data.posts
      .filter((p) => p.categoryId === cat?.id)
      .map((post) => {
        const author = data.users.filter((u) => u.id == post.authorId)?.at(0);
        const category = data.categories
          .filter((c) => c.id == post.categoryId)
          ?.at(0);
        const tags = data.tags.filter((t) => post.tags.includes(t.name));
        const comments = data.comments.filter((c) => c.postId == post.id);
        return { ...post, author, tags, category, comments } as Post;
      });
  }, [slug]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {posts.map((post: Post, i) => {
          if (viewType == "grid") {
            return <PostCard1 post={post} key={i} />;
          } else
            return (
              <div className="sm:col-span-2" key={i}>
                <PostCard2 post={post} />
              </div>
            );
        })}
      </div>
    </>
  );
}
