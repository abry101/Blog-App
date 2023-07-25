"use client";
import Image from "next/image";
import React from "react";
import { useTheme } from "next-themes";

export default function GithubButton() {
  const theme = useTheme().theme;
  return (
    <div className="input-button">
      <button
        type="button"
        className="w-full border border-base-content/50 py-4 text-xl flex justify-center gap-x-4 rounded-md items-center hover:bg-base-100"
        onClick={() => {}}
      >
        SignIn with Github
        <Image
          src={
            theme != "dark"
              ? "/assets/svg/github_dark.svg"
              : "/assets/svg/github_light.svg"
          }
          width={25}
          height={25}
          alt="github icon"
        />
      </button>
    </div>
  );
}
