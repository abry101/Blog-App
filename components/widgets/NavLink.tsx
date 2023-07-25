import Link from "next/link";
import React from "react";

export default function NavLink({
  path,
  label,
  activePath,
}: {
  path: string;
  label?: string;
  activePath: string;
}) {
  return (
    <Link
      href={`/${path}`}
      className={
        path === activePath
          ? "nav-link-active capitalize"
          : "nav-link capitalize"
      }
    >
      {label || path}
    </Link>
  );
}
