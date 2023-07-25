import { Post } from "@/types";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function PostCard3({ post }: { post: Post }) {
  const { photoUrl, title, category, publishedAt } = post;

  return (
    <div className="card h-64 rounded-box overflow-hidden group">
      <div className="absolute inset-0 bg-blue-950">
        <Image
          fill
          alt={title}
          className="group-hover:scale-110 smoothly opacity-50"
          style={{ objectFit: "cover" }}
          src={photoUrl || "https://fakeimg.pl/150x150"}
        />
      </div>
      <div className="absolute inset-0 text-white">
        <div className="flex flex-col justify-end h-full p-6 gap-y-2">
          {post.featured && (
            <span className="text-xs w-fit btn-bg-gradient px-4 py-1">
              Recommended
            </span>
          )}
          <Link
            href="#"
            className="text-2xl font-bold hover:text-primary smoothly-100"
          >
            {title}
          </Link>
          <div className="font-thin text-sm">
            {category.name}
            <span className="text-primary"> &#x2022; </span>
            {dayjs(publishedAt).format("MMMM DD, YYYY")}
          </div>
        </div>
      </div>
    </div>
  );
}
