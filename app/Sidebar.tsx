"use client";
// components/Sidebar.tsx
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  AiOutlineHome,
  AiOutlineSetting,
  AiOutlineFolder,
  AiOutlineUser,
  AiOutlineClockCircle,
  AiOutlineCalendar,
  AiOutlineBars,
} from "react-icons/ai";
import logo from "@/public/Logo/logo-png.png";
import Image from "next/image";

interface MenuItem {
  label: string;
  path: string;
  icon?: React.ReactNode;
  subItems?: MenuItem[];
}

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
          // list items design style
          <li
            key={menuItem.label}
            className="hover:bg-slate-600 rounded-md hover:text-slate-200 group"
          >
            {" "}
            <Link href={menuItem.path}>
              <div
                className={`flex items-center py-2 px-4 cursor-pointer space-x-4 ${
                  // here is the style of items when collapsed
                  collapsed ? "pl-1 hover:bg-slate-600 rounded-md" : ""
                }`}
                onClick={() => handleTitleClick(menuItem.path)}
              >
                <div className="mr-2">{menuItem.icon}</div>
                {menuItem.subItems ? (
                  <div className="cursor-pointer text-gray-300">
                    {collapsed ? "" : menuItem.label}
                  </div>
                ) : (
                  <div className="cursor-pointer text-gray-300">
                    {collapsed ? "" : menuItem.label}
                  </div>
                )}{" "}
              </div>{" "}
            </Link>
            {menuItem.subItems && ( // subment design style
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
                    className="hover:bg-blue-900 rounded-md"
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
//
//
//
//
//
//
// ------------------------------------------------------------------------------------------------
//                              menu items (arry of objects)
// ------------------------------------------------------------------------------------------------

const menuItems: MenuItem[] = [
  { label: "Home", path: "/", icon: <AiOutlineHome size={24} /> },
  {
    label: "Settings",
    path: "/settings",
    icon: <AiOutlineSetting size={24} />,
  },
  {
    label: "Projects",
    path: "/projects",
    icon: <AiOutlineFolder size={24} />,
    subItems: [
      {
        label: "Project 1",
        path: "/projects/project1",
        icon: <AiOutlineCalendar size={20} />,
      },
      {
        label: "Project 2",
        path: "/projects/project2",
        icon: <AiOutlineCalendar size={20} />,
      },
      {
        label: "Project 3",
        path: "/projects/project3",
        icon: <AiOutlineCalendar size={20} />,
      },
    ],
  },
  {
    label: "Users",
    path: "/users",
    icon: <AiOutlineUser size={24} />,
    subItems: [
      {
        label: "User 1",
        path: "/users/user1",
        icon: <AiOutlineCalendar size={20} />,
      },
      {
        label: "User 2",
        path: "/users/user2",
        icon: <AiOutlineCalendar size={20} />,
      },
      {
        label: "User 3",
        path: "/users/user3",
        icon: <AiOutlineCalendar size={20} />,
      },
    ],
  },
  {
    label: "Schedule",
    path: "/schedule",
    icon: <AiOutlineClockCircle size={24} />,
    subItems: [
      {
        label: "Event 1",
        path: "/schedule/event1",
        icon: <AiOutlineCalendar size={20} />,
      },
      {
        label: "Event 2",
        path: "/schedule/event2",
        icon: <AiOutlineCalendar size={20} />,
      },
      {
        label: "Event 3",
        path: "/schedule/event3",
        icon: <AiOutlineCalendar size={20} />,
      },
    ],
  },
  { label: "Item 6", path: "/item6", icon: <AiOutlineCalendar size={24} /> },
  { label: "Item 7", path: "/item7", icon: <AiOutlineCalendar size={24} /> },
];
