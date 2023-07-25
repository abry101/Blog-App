import { Post } from "@/types";
import dayjs from "dayjs";
import Link from "next/link";
import React from "react";
import Avatar from "./Avatar";
import Badge from "./Badge";
import { HiBell } from "react-icons/hi";

export default function PostCard4({ post }: { post: Post }) {
  const { title, photoUrl, publishedAt } = post;

  return (
    <div className="flex rounded-box items-center gap-x-2 p-2 hover:bg-base-200/80 smoothly">
      <Badge className="m-2 w-6 h-6 p-0" icon={HiBell}>
        <Avatar placeHolder={title} />
      </Badge>
      <div className="flex-1 text-left">
        <Link
          href="#"
          className="text-base font-bold hover:text-primary smoothly-100"
        >
          {title}
        </Link>
        <p className="text-base-content/75 text-sm">
          {dayjs(publishedAt).format("MMMM DD, YYYY")}
        </p>
      </div>
    </div>
  );
}
