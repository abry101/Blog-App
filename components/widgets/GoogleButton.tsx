"use client";
import Image from "next/image";
import React from "react";

export default function GoogleButton() {
  return (
    <div className="input-button">
      <button
        type="button"
        className="w-full border border-base-content/50 py-4 text-xl flex justify-center gap-x-4 rounded-md items-center hover:bg-base-100"
        onClick={() => {}}
      >
        SignIn with Google
        <Image src={"/assets/svg/google.svg"} width={25} height={25} alt="" />
      </button>
    </div>
  );
}
