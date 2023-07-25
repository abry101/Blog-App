"use client";
import Image from "next/image";
import Link from "next/link";
import {
  HiHome,
  HiMenu,
  HiOutlineUserCircle,
  HiViewBoards,
} from "react-icons/hi";
import { useEffect } from "react";
import { useAuth } from "@/libs/providers/auth";
import { useRouter } from "next/navigation";
import Loader from "../widgets/Loader";
import AuthUserAvatar from "../widgets/AuthUserAvatar";

export default function MeLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const navigate = useRouter();
  const { gUser, user, signout, loading } = useAuth();

  useEffect(() => {
    if (gUser) {
      if (!gUser.emailVerified && !loading) {
        console.log("replace >> MeLayout ---> Verify :>> ");
        navigate.push("/auth/verify");
      }
    } else {
      if (!loading) {
        console.log("replace >> MeLayout ---> Signin :>> ");
        navigate.push("/auth/signin");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, gUser]);

  if (loading || !user) {
    return <Loader message="AuthUser page loading . . ." />;
  }
  return (
    <div className="drawer max-w-7xl mx-auto">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="w-full navbar bg-base-300 py-4">
          <div className="flex-none lg:hidden">
            <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
              <HiMenu size={24} />
            </label>
          </div>
          <div className="flex-1 px-2 mx-2">
            <Link href={"/"}>Membership App</Link>
          </div>
          <div className="flex-none hidden lg:block">
            <ul className="menu menu-horizontal">
              {/* Navbar menu content here */}
              <li>
                <Link href={"/"}>Home</Link>
              </li>
              <li>
                <Link href={"/me/dashboard"}>Dashboard</Link>
              </li>
              <li>
                <Link href={"/me/profile"}>My Profile</Link>
              </li>
            </ul>
          </div>
          <div className="flex-none gap-2 hidden lg:flex">
            <div className="form-control">
              <input
                type="text"
                placeholder="Search"
                className="input input-bordered w-24 md:w-auto"
              />
            </div>
            <AuthUserAvatar user={user} signout={signout} />
          </div>
        </div>
        {/* Page content here */}
        {/* {loading && <Loader/>} */}
        {children}
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 h-full bg-base-200">
          {/* Sidebar content here */}
          <li>
            <Link href={"/"}>
              <HiHome size={25} />
              Home
            </Link>
          </li>
          <li>
            <Link href={"/me/dashboard"}>
              <HiViewBoards size={25} />
              Dashboard
            </Link>
          </li>
          <li>
            <Link href={"/me/profile"}>
              <HiOutlineUserCircle size={25} />
              My Profile
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
