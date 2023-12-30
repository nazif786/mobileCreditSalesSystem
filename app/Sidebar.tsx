"use client";

// components/Sidebar.tsx
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  FaHome,
  FaInfoCircle,
  FaFileAlt,
  FaEnvelope,
  FaTh,
} from "react-icons/fa";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";

interface SidebarItem {
  href: string;
  label: string;
  icon: React.ElementType;
  subItems?: SidebarItem[];
}

const Sidebar: React.FC = () => {
  const pathname = usePathname();

  const isActive = (href: string | undefined): boolean => {
    return pathname === href;
  };

  const [openServices, setOpenServices] = useState(false);
  const [openDashboard, setOpenDashboard] = useState(false);

  const handleServicesToggle = (): void => {
    setOpenServices((prev) => !prev);
    setOpenDashboard(false);
  };

  const handleDashboardToggle = (): void => {
    setOpenDashboard((prev) => !prev);
    setOpenServices(false);
  };

  useEffect(() => {
    const currentServices = sidebarItems.find(
      (item) => item.label === "Services",
    );
    if (currentServices) {
      const isInsideSubmenu = currentServices.subItems?.some((subItem) =>
        isActive(subItem.href),
      );
      setOpenServices(!!isInsideSubmenu);
    }

    const currentDashboard = sidebarItems.find(
      (item) => item.label === "Dashboard",
    );
    if (currentDashboard) {
      const isInsideSubmenu = currentDashboard.subItems?.some((subItem) =>
        isActive(subItem.href),
      );
      setOpenDashboard(!!isInsideSubmenu);
    }
  }, [pathname]);

  const sidebarStyle =
    "bg-gradient-to-b from-gray-800 to-gray-900 w-64 h-screen p-4 rounded-md m-3 mb-3";
  const linkStyle =
    "text-white flex items-center justify-between rounded transition duration-300 cursor-pointer";
  const activeLinkStyle = "hover:bg-gray-700 bg-blue-500"; // Background color for active link
  const listItemStyle = "mb-1"; // Adjust the margin between items if needed
  const titleStyle = "ml-2 font-light text-roboto text-base leading-4"; // Apply custom styles to the title
  const submenuStyle = "ml-5"; // Adjust the margin for the submenu
  const submenuLinkStyle =
    "text-white flex items-center justify-between rounded transition duration-300 cursor-pointer";

  const sidebarItems: SidebarItem[] = [
    { href: "/", label: "Home", icon: FaHome },
    { href: "/about", label: "About", icon: FaInfoCircle },
    {
      href: "#",
      label: "Services",
      icon: FaFileAlt,
      subItems: [
        { href: "/services/service1", label: "Service 1", icon: FaFileAlt },
        { href: "/services/service2", label: "Service 2", icon: FaFileAlt },
        { href: "/services/service3", label: "Service 3", icon: FaFileAlt },
      ],
    },
    { href: "/contact", label: "Contact", icon: FaEnvelope },
    {
      href: "#",
      label: "Dashboard",
      icon: FaTh,
      subItems: [
        { href: "/dashboard/item1", label: "Item 1", icon: FaTh },
        { href: "/dashboard/item2", label: "Item 2", icon: FaTh },
      ],
    },
  ];

  return (
    <div className={sidebarStyle}>
      <div className="flex items-center mb-8">
        {/* Use the next/image component for the logo */}
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={32}
          height={32}
          className="mr-2"
        />
        <span className="text-white text-2xl font-bold">Your Logo</span>
      </div>
      <nav>
        <ul className="space-y-0">
          {sidebarItems.map((item, index) => (
            <li key={index} className={listItemStyle}>
              {item.subItems ? (
                // Render a submenu for items with subItems
                <>
                  <span
                    className={`${linkStyle} ${
                      isActive(item.href)
                        ? `${activeLinkStyle} bg-blue-500`
                        : ""
                    } p-3`}
                    onClick={() =>
                      item.label === "Services"
                        ? handleServicesToggle()
                        : handleDashboardToggle()
                    }
                  >
                    <span className="flex items-center">
                      {item.label === "Services" &&
                        (openServices ? (
                          <IoIosArrowDown />
                        ) : (
                          <IoIosArrowForward />
                        ))}
                      {item.label === "Dashboard" &&
                        (openDashboard ? (
                          <IoIosArrowDown />
                        ) : (
                          <IoIosArrowForward />
                        ))}
                      {item.icon !== FaTh && <item.icon className="mr-2" />}
                      <span className={titleStyle}>{item.label}</span>
                    </span>
                  </span>
                  {(item.label === "Services" && openServices) ||
                  (item.label === "Dashboard" && openDashboard) ? (
                    <ul className={submenuStyle}>
                      {item.subItems.map((subItem, subIndex) => (
                        <li key={subIndex} className={listItemStyle}>
                          <Link href={subItem.href} passHref>
                            <span
                              className={`${submenuLinkStyle} ${
                                isActive(subItem.href)
                                  ? `${activeLinkStyle} bg-blue-500`
                                  : ""
                              } p-3`}
                            >
                              <span className="flex items-center">
                                {subItem.icon && (
                                  <subItem.icon className="mr-2" />
                                )}
                                <span className={titleStyle}>
                                  {subItem.label}
                                </span>
                              </span>
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </>
              ) : (
                // Render a regular item without a submenu
                <Link href={item.href} passHref>
                  <span
                    className={`${linkStyle} ${
                      isActive(item.href)
                        ? `${activeLinkStyle} bg-blue-500`
                        : ""
                    } p-3`}
                  >
                    <span className="flex items-center">
                      {item.icon === FaTh && <IoIosArrowForward />}
                      {item.icon !== FaTh && <item.icon className="mr-2" />}
                      <span className={titleStyle}>{item.label}</span>
                    </span>
                  </span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
