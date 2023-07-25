import Carousel from "@/components/widgets/Carousel";
import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <section className="p-4 mx-auto max-w-7xl bg-gray-100">
      {/* <Carousel /> */}
      <div className="mx-auto">
        <h1 className="text-2xl font-bold text-center">
          Create Sticky Header on Scroll NextJs with Tailwind CSS{" "}
        </h1>
      </div>
    </section>
  );
}
