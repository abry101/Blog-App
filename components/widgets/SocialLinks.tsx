import Link from "next/link";
import React from "react";
import {
  BiLogoFacebook,
  BiLogoInstagram,
  BiLogoPinterest,
  BiLogoTiktok,
  BiLogoTwitter,
  BiLogoYoutube,
} from "react-icons/bi";

export default function SocialLinks({ size = 20 }) {
  return (
    <ul className="flex space-x-2 items-center justify-center">
      <li>
        <Link href="#" className="hover:text-primary">
          <BiLogoFacebook size={20} />
        </Link>
      </li>
      <li>
        <Link href="#" className="hover:text-primary">
          <BiLogoTwitter size={20} />
        </Link>
      </li>
      <li>
        <Link href="#">
          <BiLogoInstagram size={20} className="hover:text-primary" />
        </Link>
      </li>
      <li>
        <Link href="#">
          <BiLogoTiktok size={20} className="hover:text-primary" />
        </Link>
      </li>
      <li>
        <Link href="#">
          <BiLogoYoutube size={20} className="hover:text-primary" />
        </Link>
      </li>
      <li>
        <Link href="#">
          <BiLogoPinterest size={20} className="hover:text-primary" />
        </Link>
      </li>
      {/* <li className="xl:hidden pl-4">
        <ThemeSwitch />
      </li> */}
    </ul>
  );
}
