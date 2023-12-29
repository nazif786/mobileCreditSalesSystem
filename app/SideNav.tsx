"use client";

import React, { useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { SIDENAV_ITEMS } from "@/app/components/lib/SideNavItem";
import { SideNavItem } from "@/app/components/types/SideItemsTypes";
import { Icon } from "@iconify/react";
import logo from "@/public/Logo/logo-png.png";
import Image from "next/image";

const SideNav = () => {
  const [isCollapse, setCollapse] = useState<boolean>(false);
  const toggleSidebarcollapse = () => {
    setCollapse((prevState) => !prevState);
  };
  return (
    <div className="w-60 bg-white h-screen flex-1 fixed border-r border-zinc-200 md:flex top-0">
      <div className="flex flex-col space-y-6 w-full">
        <div className="flex flex-row justify-between relative">
          <Link
            href="/"
            className="flex flex-row space-x-3 items-center justify-center md:justify-start md:px-6 border-b border-zinc-200 h-16 w-full"
          >
            <Image src={logo} width="60" height="50" alt="logo" />
            <span className="font-serif font-bold hidden md:flex text-zinc-400 text-3xl">
              CSMS
            </span>
          </Link>
          <div className="absolute -right-5 top-4 bg-zinc-200 rounded-md">
            <button onClick={() => toggleSidebarcollapse()}>
              {isCollapse ? (
                <Icon
                  icon="material-symbols-light:menu-open"
                  color="darkgray"
                  width="36"
                  height="36"
                />
              ) : (
                <Icon
                  icon="material-symbols-light:menu-open"
                  color="darkblue"
                  width="36"
                  height="36"
                  hFlip={true}
                />
              )}
            </button>
          </div>
        </div>
        <div className="flex flex-col space-y-2  md:px-6 ">
          {SIDENAV_ITEMS.map((item, idx) => {
            return <MenuItem key={idx} item={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default SideNav;

const MenuItem = ({ item }: { item: SideNavItem }) => {
  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  return (
    <div className="">
      {item.submenu ? (
        <>
          <button
            onClick={toggleSubMenu}
            className={`flex flex-row items-center p-2 rounded-lg hover-bg-zinc-100 w-full justify-between hover:bg-zinc-100 ${
              pathname.includes(item.path) ? "bg-zinc-100" : ""
            }`}
          >
            <div className="flex flex-row space-x-4 items-center">
              {item.icon}
              <span className="font-semibold text-xl  flex">{item.title}</span>
            </div>

            <div className={`${subMenuOpen ? "rotate-180" : ""} flex`}>
              <Icon icon="lucide:chevron-down" width="24" height="24" />
            </div>
          </button>

          {subMenuOpen && (
            <div className="my-2 ml-12 flex flex-col space-y-4">
              {item.subMenuItems?.map((subItem, idx) => {
                return (
                  <Link
                    key={idx}
                    href={subItem.path}
                    className={`${
                      subItem.path === pathname ? "font-bold" : ""
                    }`}
                  >
                    <span>{subItem.title}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </>
      ) : (
        <Link
          href={item.path}
          className={`flex flex-row space-x-4 items-center p-2 rounded-lg hover:bg-zinc-100 ${
            item.path === pathname ? "bg-zinc-100" : ""
          }`}
        >
          {item.icon}
          <span className="font-semibold text-xl flex">{item.title}</span>
        </Link>
      )}
    </div>
  );
};
