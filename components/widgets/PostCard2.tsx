"use client";
import { Post } from "@/types";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineShare, HiDotsHorizontal } from "react-icons/hi";
import Avatar from "./Avatar";

export default function PostCard2({ post }: { post: Post }) {
  const { photoUrl, title, author, category, publishedAt, body } = post;

  return (
    <div className="card sm:card-side rounded-md border-25 p-4">
      <figure className="relative w-full sm:w-2/5 max-sm:h-72">
        <Image
          fill
          alt={title}
          className="rounded-md"
          style={{ objectFit: "cover" }}
          src={photoUrl || "https://fakeimg.pl/300x400"}
        />
      </figure>
      <div className="card-body sm:flex-1">
        <div className="flex items-center text-sm space-x-2">
          <Avatar
            photoUrl={author.photoUrl}
            size={48}
            placeHolder={author.name}
          />
          <p>
            {category.name}
            <span className="text-primary"> &#x2022; </span>
            {dayjs(publishedAt).format("MMMM DD, YYYY")}
            <span className="text-primary"> &#x2022; </span>
            {author.name}
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
