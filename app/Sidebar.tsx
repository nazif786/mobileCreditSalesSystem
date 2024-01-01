"use client";
// components/Sidebar.tsx

// components/Sidebar.tsx
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { AiOutlineBars } from "react-icons/ai";
import logo from "@/public/Logo/logo-png.png";
import Image from "next/image";
import { MenuItem } from "./types/MenuItem";
import { menuItems } from "./utils/menuItems";

const Sidebar: React.FC = () => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [collapsed, setCollapsed] = useState(false);
  const currentPath = usePathname();

  const toggleItem = (path: string) => {
    setExpandedItems((prevExpanded) => {
      if (prevExpanded.includes(path)) {
        return prevExpanded.filter((item) => item !== path);
      }
      return [path];
    });
  };

  const shouldExpandItem = (item: MenuItem): boolean => {
    if (currentPath.startsWith(item.path)) {
      return true;
    }

    if (item.subItems) {
      return item.subItems.some((subItem) =>
        currentPath.startsWith(subItem.path),
      );
    }

    return false;
  };

  useEffect(() => {
    setExpandedItems((prevExpanded) =>
      menuItems.reduce((acc, menuItem) => {
        return shouldExpandItem(menuItem) ? [...acc, menuItem.path] : acc;
      }, [] as string[]),
    );
  }, [currentPath]);

  const handleTitleClick = (path: string) => {
    // Toggle the submenu open/close when clicking on the title
    toggleItem(path);
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div
      className={`bg-gray-800 w-${
        collapsed ? "16" : "64"
      } h-screen text-white rounded-xl mt-4 ml-4 overflow-hidden p-4 transition-all duration-300`}
    >
      {/* Logo */}
      <div className="flex items-center justify-between mb-4 mt-3">
        <div className="flex items-center">
          {!collapsed && (
            <>
              <div className="pl-4">
                <Image
                  src={logo}
                  alt="company logo"
                  width="36"
                  height="36"
                  className="rounded"
                />
              </div>
              <span className="ml-2 text-lg font-bold">CCSMS</span>
            </>
          )}
        </div>
        <button
          onClick={toggleSidebar}
          className="text-white focus:outline-none"
        >
          <AiOutlineBars size={24} />
        </button>
      </div>

      <ul>
        {menuItems.map((menuItem) => (
          <li
            key={menuItem.label}
            className={`hover:bg-slate-600 rounded-md hover:text-slate-200 group ${
              currentPath === menuItem.path ? "bg-blue-700" : ""
            }`}
          >
            {menuItem.subItems ? (
              <div
                className={`flex items-center py-2 px-4 cursor-pointer space-x-4 ${
                  collapsed ? "pl-1 hover:bg-slate-600 rounded-md" : ""
                }`}
                onClick={() => handleTitleClick(menuItem.path)}
              >
                <div className="mr-2">{menuItem.icon}</div>
                <div className="cursor-pointer text-gray-300">
                  {collapsed ? "" : menuItem.label}
                </div>
              </div>
            ) : (
              <Link href={menuItem.path}>
                <div
                  className={`flex items-center py-2 px-4 cursor-pointer space-x-4 ${
                    collapsed ? "pl-1 hover:bg-slate-600 rounded-md" : ""
                  }`}
                  onClick={() => handleTitleClick(menuItem.path)}
                >
                  <div className="mr-2">{menuItem.icon}</div>
                  <div className="cursor-pointer text-gray-300">
                    {collapsed ? "" : menuItem.label}
                  </div>
                </div>
              </Link>
            )}

            {menuItem.subItems && (
              <ul
                className={`transition-all duration-500 group-hover:bg-slate-900 rounded-md ease-out ${
                  expandedItems.includes(menuItem.path)
                    ? collapsed
                      ? "max-h-0 overflow-hidden"
                      : "max-h-96"
                    : "max-h-0 overflow-hidden"
                }`}
              >
                {menuItem.subItems.map((subItem) => (
                  <li
                    key={subItem.label}
                    className={`hover:bg-blue-900 rounded-md ${
                      currentPath === subItem.path ? "bg-blue-400" : ""
                    }`}
                  >
                    <Link href={subItem.path}>
                      <div
                        className={`flex items-center py-2 px-8 cursor-pointer space-x-4 ${
                          collapsed ? "justify-center" : ""
                        }`}
                        onClick={(event) => handleTitleClick(subItem.path)}
                      >
                        <div className="mr-2">{subItem.icon}</div>
                        <div className="cursor-pointer text-gray-300">
                          {collapsed ? "" : subItem.label}
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
