"use client";
import { notFound, useParams } from "next/navigation";
import { useMemo } from "react";
import data from "@/public/data/data.json";
import { Category, Post } from "@/types";
import Link from "next/link";
import { HiHome } from "react-icons/hi";
import Image from "next/image";
import SocialLinks from "@/components/widgets/SocialLinks";
import PostCard5 from "@/components/widgets/PostCard5";
import { MdArrowForwardIos } from "react-icons/md";
import { useTheme } from "next-themes";

export default function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { slug } = useParams();
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

  const post = useMemo(() => {
    const query = decodeURI(slug);
    console.log("slug :>> ", query);
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
    <div className="flex gap-x-4 mx-4">
      <div className="flex flex-col w-full lg:w-2/3">
        <div className="text-sm breadcrumbs">
          <ul>
            <li>
              <Link href="/">
                {" "}
                <HiHome size={14} /> Home
              </Link>
            </li>
            <li>
              <Link href="/blog">Blog</Link>
            </li>
            <li>
              <Link href={`/blog/category/${post.category.name}`}>
                {post.category.name}
              </Link>
            </li>
            <li>{post.title}</li>
          </ul>
        </div>
        {children}
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
