import { Post } from "@/types";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function PostCard5({ post }: { post: Post }) {
  return (
    <div className="flex gap-x-2 rounded-box items-center p-2 hover:bg-base-200/80 smoothly">
      <div className="relative w-2/6 h-16">
        <Image
          fill
          alt={post.title}
          className="rounded-md"
          style={{ objectFit: "cover" }}
          src={post.photoUrl || "https://fakeimg.pl/150x150"}
        />
      </div>
      <div className="flex-1 text-left p-2">
        <Link href="#" className="font-bold hover:text-primary smoothly-100">
          {post.title}
        </Link>
        <p className="text-base-content/75 text-sm">
          {dayjs(post.publishedAt).format("MMMM DD, YYYY")}
        </p>
      </div>
    </div>
  );
}
