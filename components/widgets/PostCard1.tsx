import React from "react";

import Image from "next/image";
import {
  HiOutlineShare,
  HiDotsHorizontal,
  HiOutlinePlay,
} from "react-icons/hi";
import { Post } from "@/types";
import Link from "next/link";
import Avatar from "./Avatar";
export default function PostCard1({ post }: { post: Post }) {
  const { photoUrl, title, author, category, body, featured } = post;

  return (
    <div className="card rounded-md border-25">
      <figure className="relative w-full h-64">
        <Image
          src={photoUrl || "https://fakeimg.pl/400x300"}
          alt={title}
          fill
          style={{ objectFit: "cover" }}
        />
      </figure>
      {featured && (
        <div className="absolute top-4 left-4">
          <div className="badge bg-gradient-1 border-0">Featured</div>
        </div>
      )}
      <div className="absolute top-60 right-8">
        <div className="badge btn-bg-gradient border-0 p-1 w-10 h-10">
          <HiOutlinePlay size={35} />
        </div>
      </div>
      <div className="card-body">
        <div className="flex items-center text-sm space-x-2">
          <Avatar
            photoUrl={author.photoUrl}
            size={48}
            placeHolder={author.name}
          />
          <p>
            {category?.name}
            <span className="text-primary"> &#x2022; </span>
            {author?.name}
          </p>
        </div>
        <Link className="card-title hover:text-primary smoothly-100" href="#">
          {title}
        </Link>
        <p>
          {body.substring(0, body.length > 150 ? 150 : body.length - 1)} . . .
        </p>
        <div className="fb-border my-2"></div>
        <div className="flex justify-between items-center">
          <HiOutlineShare size={25} />
          <HiDotsHorizontal size={25} />
        </div>
      </div>
    </div>
  );
}
