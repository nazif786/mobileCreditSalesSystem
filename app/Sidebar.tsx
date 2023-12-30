"use client";
// components/Sidebar.tsx
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  AiOutlineHome,
  AiOutlineSetting,
  AiOutlineFolder,
  AiOutlineUser,
  AiOutlineClockCircle,
  AiOutlineCalendar,
  AiOutlineBars,
} from "react-icons/ai";

interface MenuItem {
  label: string;
  path: string;
  icon?: React.ReactNode;
  subItems?: MenuItem[];
}

interface SidebarItemProps {
  item: MenuItem;
  collapsed: boolean;
  isFirstChild: boolean;
  expanded: boolean;
  onItemClick: (path: string) => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  item,
  collapsed,
  isFirstChild,
  expanded,
  onItemClick,
}) => {
  const hasSubItems = item.subItems && item.subItems.length > 0;

  return (
    <li>
      <div
        className={`flex items-center py-2 px-4 cursor-pointer space-x-4 ${
          collapsed && "justify-center"
        } ${collapsed && isFirstChild ? "mt-14" : ""}`}
        onClick={() => onItemClick(item.path)}
      >
        <div className="mr-2">
          <Link href={item.path}>{item.icon}</Link>
        </div>
        {!collapsed && (
          <div onClick={() => onItemClick(item.path)}>
            <Link href={item.path}>{item.label}</Link>
          </div>
        )}
      </div>
      {!collapsed && hasSubItems && (
        <ul
          className={`transition-all duration-500 ease-out ${
            expanded ? "max-h-96" : "max-h-0 overflow-hidden"
          }`}
        >
          {item.subItems?.map((subItem) => (
            <SidebarItem
              key={subItem.label}
              item={subItem}
              collapsed={collapsed}
              isFirstChild={false}
              expanded={expanded}
              onItemClick={onItemClick}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

const Sidebar: React.FC = () => {
  const currentPath = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [collapsed, setCollapsed] = useState(false);

  const toggleItem = (path: string) => {
    setExpandedItems((prevExpanded) => {
      if (prevExpanded.includes(path)) {
        return prevExpanded.filter((item) => item !== path);
      }
      return [path];
    });
  };

  const toggleCollapse = () => {
    setCollapsed((prevCollapsed) => !prevCollapsed);
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

  const handleItemClick = (path: string) => {
    toggleItem(path);
  };

  const menuItems: MenuItem[] = [
    { label: "Home", path: "/home", icon: <AiOutlineHome size={24} /> },
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

  return (
    <div
      className={`bg-gray-800 w-${
        collapsed ? "16" : "64"
      } h-screen text-white rounded-xl mt-4 ml-4 overflow-hidden p-4 transition-all duration-300 relative`}
    >
      {/* Logo */}
      {!collapsed && (
        <div className="flex items-center mb-6">
          {/* Your logo component or image goes here */}
          <div className="w-8 h-8 bg-white rounded-full" />
          <span className="ml-2 text-lg font-bold">Your Logo</span>
        </div>
      )}

      {/* Collapse Button */}
      <div className="absolute top-4 right-4 cursor-pointer">
        <AiOutlineBars size={24} onClick={toggleCollapse} />
      </div>

      <ul>
        {menuItems.map((menuItem, index) => (
          <SidebarItem
            key={menuItem.label}
            item={menuItem}
            collapsed={collapsed}
            isFirstChild={index === 0}
            expanded={expandedItems.includes(menuItem.path)}
            onItemClick={handleItemClick}
          />
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
