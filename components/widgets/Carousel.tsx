"use client";
import data from "@/public/data/data.json";
import { Post } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
export default function Carousel({ posts }: { posts: Post[] }) {
  // dayjs.extend(customParseFormat);
  return (
    <div className="carousel w-full h-md max-md:h-96">
      {posts.map((post, i) => {
        let prev = `#slide${i - 1}`;
        let next = `#slide${i + 1}`;
        if (i == 0) prev = `#slide${posts.length - 1}`;
        if (i == posts.length - 1) next = `#slide0`;
        const { photoUrl, title, author, category, publishedAt } = post;
        const pubAt = dayjs(publishedAt).format("MMM DD, YYYY").toString();
        return (
          <div
            id={`slide${i}`}
            className="carousel-item w-full h-full relative"
            key={i}
          >
            <Image
              src={photoUrl || "https://fakeimg.pl/1920x1080"}
              fill
              style={{ objectPosition: "center", objectFit: "cover" }}
              alt="Slide #1"
            />
            <div className="absolute inset-0 bg-base-100/60 grid place-content-center">
              <div className="max-w-lg text-center">
                <h2 className="text-5xl font-bold hover:text-primary">
                  <Link
                    href={`/blog/?category=${category.name}&title=${title}`}
                  >
                    {title}
                  </Link>
                </h2>
                <p className="py-4">
                  {author.name}
                  <span className="text-primary"> &#x2022; </span>
                  {pubAt}
                </p>
              </div>
            </div>
            {posts.length >= 2 && (
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a
                  href={prev}
                  className="btn btn-circle bg-base-100/40 hover:bg-base-100/60 border-0"
                >
                  ❮
                </a>
                <a
                  href={next}
                  className="btn btn-circle bg-base-100/40 hover:bg-base-100/60 border-0"
                >
                  ❯
                </a>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
