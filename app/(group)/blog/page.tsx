"use client";
import { useTheme } from "next-themes";
import { useMemo, useState } from "react";
import { HiViewGrid, HiViewList } from "react-icons/hi";
import data from "@/public/data/data.json";
import PostCard1 from "@/components/widgets/PostCard1";
import PostCard2 from "@/components/widgets/PostCard2";
import { Category, Post } from "@/types";
import Image from "next/image";
import SocialLinks from "@/components/widgets/SocialLinks";
import PostCard5 from "@/components/widgets/PostCard5";
import Link from "next/link";
import { MdArrowForwardIos } from "react-icons/md";

export default function Blog() {
  const [viewType, setViewType] = useState("grid");
  const { theme } = useTheme();

  const posts = useMemo(() => {
    return data.posts
      .filter((p) => p.published)
      .map((post) => {
        const author = data.users.filter((u) => u.id == post.authorId)?.at(0);
        const category = data.categories
          .filter((c) => c.id == post.categoryId)
          ?.at(0);
        const tags = data.tags.filter((t) => post.tags.includes(t.name));
        const comments = data.comments.filter((c) => c.postId == post.id);
        return { ...post, author, tags, category, comments } as Post;
      });
  }, []);

  const categories = useMemo(() => {
    let arrCat = Array<{ count: number; category: Category }>();
    for (const cat of data.categories) {
      let currentCat = { count: 0, category: cat };
      for (const post of posts) {
        if (cat.id == post.categoryId) {
          currentCat = { ...currentCat, count: currentCat.count + 1 };
        }
      }
      arrCat.push(currentCat);
    }
    return arrCat;
  }, [posts]);

  return (
    <div className="flex gap-x-4 mx-4">
      <div className="flex flex-col w-full lg:w-2/3">
        <div className="flex justify-between items-center border-b-25 p-2 my-4">
          <h2 className="text-2xl">Blog</h2>
          <div className="flex items-center gap-x-2">
            <div className="divider divider-horizontal mx-0"></div>
            <HiViewGrid
              size={25}
              className={
                viewType == "grid" ? "text-primary" : "hover:text-primary"
              }
              onClick={() => setViewType("grid")}
            />
            <div className="divider divider-horizontal mx-0"></div>
            <HiViewList
              size={25}
              className={
                viewType == "list" ? "text-primary" : "hover:text-primary"
              }
              onClick={() => setViewType("list")}
            />
          </div>
        </div>

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
      </div>

      <div className="max-lg:hidden flex-1 space-y-8">
        <div className="border-25 rounded-box p-8 space-y-4">
          <Image
            src="/assets/svg/logo.svg"
            alt="Logo"
            width={118}
            height={26}
            className={`mx-auto ${theme === "dark" ? "invert" : ""}`}
          />
          <p className="text-center">
            Hello, We’re content writer who is fascinated by content fashion,
            celebrity and lifestyle. We helps clients bring the right content to
            the right people.
          </p>
          <SocialLinks />
        </div>

        <div className="rounded-box border-25 p-8">
          <h4 className="text-xl font-bold text-center">Popular Posts</h4>
          <div className="fb-border my-4"></div>
          {posts.slice(0, 3).map((post, i) => {
            return (
              <>
                <PostCard5 post={post} key={i} />
                <div className="fb-border-to-l my-3"></div>
              </>
            );
          })}
        </div>

        <div className="rounded-box border-25 p-8 gap-y-4">
          <h4 className="text-xl font-bold text-center">Explore Topics</h4>
          <div className="fb-border my-4"></div>
          {categories.map((cat, i) => {
            return (
              <>
                <div
                  className="flex items-center justify-between py-2 mx-4"
                  key={i}
                >
                  <Link
                    href="#"
                    className="flex-1 inline-flex items-center text-left gap-x-4"
                  >
                    <span className="text-primary">
                      <MdArrowForwardIos size={20} />
                    </span>
                    <span className="text-lg font-bold hover:text-primary">
                      {cat.category.name}
                    </span>
                  </Link>
                  <div>({cat.count})</div>
                </div>
                <div className="fb-border-to-r my-2 mx-4"></div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}

{
  /* <div className="divider divider-horizontal mx-0"></div> 
            <Link
            className="btn-bg-gradient py-2 px-4 inline-flex"
            href="/blogs/add"
          >
            <HiPlus size={20} /> Add New
          </Link> */
}
