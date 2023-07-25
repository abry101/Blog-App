"use client";
import Image from "next/image";
import Link from "next/link";
import {
  HiSearch,
  HiMenu,
  HiHome,
  HiUserGroup,
  HiNewspaper,
  HiX,
  HiOutlineInformationCircle,
} from "react-icons/hi";
import logo from "@/public/assets/svg/logo.svg";
import ThemeSwitch from "../widgets/ThemeSwitch";
import SocialLinks from "../widgets/SocialLinks";
import { useTheme } from "next-themes";
import Footer from "../widgets/Footer";
import { useAuth } from "@/libs/providers/auth";
import Loader from "../widgets/Loader";
import AuthUserAvatar from "../widgets/AuthUserAvatar";
import { useSelectedLayoutSegment } from "next/navigation";
import NavLink from "../widgets/NavLink";
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useTheme();
  const location = useSelectedLayoutSegment();
  const { user, signout, loading } = useAuth();

  if (loading) {
    return <Loader message="Checking for AuthUser . . ." />;
  }

  return (
    <div className="drawer drawer-end h-screen">
      <input id="drawer-4" type="checkbox" className="drawer-toggle" />
      {/* Content */}
      <div className="drawer-content flex flex-col">
        {/* TopNav Bar */}
        <div className="flex max-w-7xl w-full mx-auto justify-between items-center pt-10 px-4">
          <div className="logo">
            <Link href="/home">
              <Image
                src={logo}
                alt="Logo"
                width={118}
                height={26}
                className={theme === "dark" ? "invert" : ""}
              />
            </Link>
          </div>
          <div className="block">
            <SocialLinks />
          </div>
        </div>

        {/* Divider */}
        <div className="max-w-7xl w-full mx-auto divider pb-0 px-4"></div>

        {/* MainNav Bar */}
        <div className="block w-full bg-base-100 shadow-md sticky top-0 z-10 px-4">
          <div className="flex max-w-7xl w-full mx-auto justify-between items-center py-4">
            <div className="md:hidden flex">
              <label
                htmlFor="drawer-4"
                className="bg-gradient-1 rounded-full p-3 drawer-button"
              >
                <HiMenu size={25} />
              </label>
            </div>

            <ul className="hidden md:flex">
              <li>
                <NavLink path="home" activePath={location!} />
              </li>
              <li>
                <NavLink path="about" activePath={location!} />
              </li>
              <li>
                <NavLink path="blog" label="Blog" activePath={location!} />
              </li>
              <li>
                <NavLink path="contact" activePath={location!} />
              </li>
            </ul>
            <div className="flex items-center space-x-4">
              <div className="hidden lg:flex join">
                <input
                  type="search"
                  className="input rounded-l-full join-item border border-base-content/25 focus:outline-none"
                  placeholder="Search ..."
                />
                <button className="bg-gradient-1 join-item rounded-r-full px-3">
                  <HiSearch size={25} />
                </button>
              </div>
              <button className="lg:hidden bg-gradient-1 rounded-full p-3">
                <HiSearch size={25} />
              </button>
              {user ? (
                <AuthUserAvatar user={user} signout={signout} />
              ) : (
                <Link
                  className="bg-gradient-1 rounded-full px-8 py-3"
                  href="/auth/signin"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
        {/* Body Content Wrapper */}
        <main className="flex-1 max-w-7xl w-full mx-auto py-8">{children}</main>
        {/* Footer */}
        <Footer />
      </div>
      {/* SideNav Bar */}
      <div className="drawer-side z-20">
        <label htmlFor="drawer-4" className="drawer-overlay"></label>
        <div className="flex flex-col px-4 w-80 h-full bg-base-200 text-base-content">
          <div className="block">
            <label
              htmlFor="drawer-4"
              className="drawer-button rounded-full p-3 float-right"
            >
              <HiX size={25} />
            </label>
          </div>
          <div className="block p-6">
            <Link href="/home">
              <Image
                src={logo}
                alt="Logo"
                width={118}
                height={26}
                className={theme === "dark" ? "invert" : ""}
              />
            </Link>
          </div>
          <ul className="flex-1 menu w-full gap-y-2">
            <li>
              <Link
                href="/home"
                className={location === "home" ? "text-primary" : ""}
              >
                <HiHome size={20} /> Home
              </Link>
              <span className="fb-border-to-r"></span>
            </li>
            <li>
              <Link
                href="/about"
                className={location === "about" ? "text-primary" : ""}
              >
                <HiUserGroup size={20} /> About
              </Link>
              <span className="fb-border-to-r"></span>
            </li>
            <li>
              <Link
                href="/blog"
                className={location === "blog" ? "text-primary" : ""}
              >
                <HiNewspaper size={20} /> Blog
              </Link>
              <span className="fb-border-to-r"></span>
            </li>
            <li>
              <Link
                href="/contact"
                className={location === "contact" ? "text-primary" : ""}
              >
                <HiOutlineInformationCircle size={20} /> Contact
              </Link>
              <span className="fb-border-to-r"></span>
            </li>
          </ul>
          <div className="block mx-6 my-2">
            <SocialLinks />
          </div>
          <div className="w-5/6 mx-auto divider p-0 my-0"></div>
          <div className="flex items-center justify-between mx-6 pb-4">
            <div className="">
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </div>
            <ThemeSwitch />
          </div>
        </div>
      </div>
    </div>
  );
}
