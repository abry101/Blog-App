"use client";
import Carousel from "@/components/widgets/Carousel";
import data from "@/public/data/data.json";
import PostCard1 from "@/components/widgets/PostCard1";
import { Post } from "@/types";
import { useMemo } from "react";
export default function HomePage() {
  const posts = useMemo(() => {
    return data.posts.map((pst) => {
      const author = data.users.filter((u) => u.id == pst.authorId)?.at(0);
      const category = data.categories
        .filter((c) => c.id == pst.categoryId)
        ?.at(0);
      const tags = data.tags.filter((t) => pst.tags.includes(t.name));
      const comments = data.comments.filter((c) => c.postId == pst.id);
      return { ...pst, author, tags, category, comments } as Post;
    });
  }, []);
  const featuredPosts = useMemo(() => {
    return posts.filter((p) => p.featured);
  }, [posts]);
  return (
    <>
      <Carousel posts={featuredPosts} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-8 px-4">
        {posts.map((post: Post, i) => {
          return <PostCard1 post={post} key={i} />;
        })}
      </div>
    </>
  );
}
