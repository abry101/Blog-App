"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

import { HiOutlineMoon, HiSun } from "react-icons/hi";

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <></>;
  }

  return (
    <div className="flex items-center">
      <label
        className={`swap ${
          theme == "dark"
            ? "swap-active border-primary"
            : "border-base-content/25"
        } swap-rotate border-2 rounded-full p-1`}
        onClick={() => setTheme(theme == "dark" ? "light" : "dark")}
      >
        <HiSun className="swap-on fill-primary " size={25} />
        <HiOutlineMoon className="swap-off fill-current" size={25} />
      </label>
    </div>
  );
};

export default ThemeSwitch;
