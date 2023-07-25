import { useAuth } from "@/libs/providers/auth";
import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function AuthUserAvatar({
  user,
  signout,
}: {
  user: User;
  signout: () => void;
}) {
  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <Image
            src={user?.photoURL || "/assets/imgs/photo-1.jpg"}
            alt=""
            width={40}
            height={40}
          />
        </div>
      </label>
      <ul
        tabIndex={0}
        className="mt-2 p-2 shadow menu menu-sm dropdown-content bg-base-300 rounded-box w-64"
      >
        <li className="opacity-40 text-base leading-none">
          <span className="text-xs">
            {user?.name} <br />
            {user?.email}
          </span>
        </li>
        <li>
          <Link href="/me/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link href="/me/profile">My Profile</Link>
        </li>
        <li>
          <Link href="/me/setting">Settings</Link>
        </li>
        <li>
          <Link href="#" onClick={signout}>
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
}
