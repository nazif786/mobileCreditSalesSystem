"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "@/public/Logo/logo-png.png";
import { usePathname } from "next/navigation";
import classNames from "classnames";

const Navbar = () => {
  const currentPath = usePathname();
  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/user", label: "User" },
  ];
  return (
    <>
      <nav className="flex space-x-6 px-5 items-center w-full border-b-2">
        <Link href="/">
          <Image src={logo} alt="logo" width="60" height="60"></Image>
        </Link>
        <ul className="flex justify-between w-full px-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={classNames({
                "text-zinc-900": link.href === currentPath,
                "text-zinc-500": link.href !== currentPath,
                "text-zinc-500 hover:text-zinc-800 transition-all ": true,
              })}
            >
              {link.label}
            </Link>
          ))}
        </ul>
      </nav>
      {/* className={`text-zinc-500 hover:text-zinc-900 ${link.href === currentPath ? '': 'text-zinc-500'} transition-colors`} */}
    </>
  );
};

export default Navbar;
