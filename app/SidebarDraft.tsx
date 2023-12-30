"use client";
// components/Sidebar.tsx
import { useState } from "react";
import { Icon, InlineIcon } from "@iconify/react";
import menuIcon from "@iconify/icons-heroicons-outline/menu-alt-1";
import homeIcon from "@iconify/icons-heroicons-outline/home";
import servicesIcon from "@iconify/icons-heroicons-outline/cube";
import aboutIcon from "@iconify/icons-heroicons-outline/information-circle";

interface MenuItem {
  label: string;
  icon: object;
  submenu?: MenuItem[];
}

const Sidebar = () => {
  const [showIconsOnly, setShowIconsOnly] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const toggleMenu = () => {
    setShowIconsOnly(!showIconsOnly);
    setOpenSubmenu(null);
  };

  const toggleSubmenu = (label: string) => {
    setOpenSubmenu(openSubmenu === label ? null : label);
  };

  const menuItems: MenuItem[] = [
    { label: "Home", icon: homeIcon },
    {
      label: "Services",
      icon: servicesIcon,
      submenu: [
        { label: "New Services", icon: servicesIcon },
        { label: "All Services", icon: servicesIcon },
        { label: "Reports", icon: servicesIcon },
      ],
    },
    { label: "About", icon: aboutIcon },
  ];

  return (
    <div
      className={`bg-gray-800 h-screen text-white ${
        showIconsOnly ? "w-16" : "w-64"
      } transition-width duration-300 flex flex-col items-center overflow-x-hidden`}
    >
      <div className="cursor-pointer p-4" onClick={toggleMenu}>
        <InlineIcon icon={menuIcon} />
      </div>
      <ul className="flex flex-col items-center w-full">
        {menuItems.map((item, index) => (
          <li key={index} className="w-full mb-2">
            <div
              className={`flex items-center p-4 cursor-pointer transition duration-300 hover:bg-gray-700 ${
                openSubmenu === item.label ? "bg-gray-700" : ""
              }`}
              onClick={() => (item.submenu ? toggleSubmenu(item.label) : null)}
            >
              <Icon icon={item.icon} />
              {!showIconsOnly && <span className="ml-2">{item.label}</span>}
            </div>
            {item.submenu && (
              <ul
                className={`list-none pl-4 transition-max-height ${
                  item.label === "Services" ? "duration-700" : "duration-300"
                } overflow-hidden ${
                  openSubmenu === item.label ? "max-h-96" : "max-h-0"
                }`}
              >
                {item.submenu.map((subItem, subIndex) => (
                  <li
                    key={subIndex}
                    className="flex items-center p-2 cursor-pointer transition duration-300 hover:bg-gray-700"
                  >
                    <Icon icon={subItem.icon} />
                    {!showIconsOnly && (
                      <span className="ml-2">{subItem.label}</span>
                    )}
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
