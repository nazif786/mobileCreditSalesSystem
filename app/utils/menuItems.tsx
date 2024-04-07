"use client";
import {
  AiOutlineCalendar,
  AiOutlineClockCircle,
  AiOutlineFolder,
  AiOutlineSetting,
  AiOutlineUser,
} from "react-icons/ai";
import { HomeIcon } from "../components/ui/svg/HomeIcon";
import { MenuItem } from "../types/MenuItem";
import { TiGroup } from "react-icons/ti";
import { GoRepo } from "react-icons/go";
import { BiSolidPurchaseTag } from "react-icons/bi";

//
//
//
//
//
//
// ------------------------------------------------------------------------------------------------
//                              menu items (arry of objects)
// ------------------------------------------------------------------------------------------------
export const menuItems: MenuItem[] = [
  { label: "Home", path: "/", icon: <HomeIcon size={24} /> },

  {
    label: "Employees",
    path: "/employees",
    icon: <TiGroup size={24} />,
  },
  {
    label: "Customers",
    path: "/customers",
    icon: <GoRepo size={24} />,
  },
  {
    label: "Suppliers",
    path: "/suppliers",
    icon: <BiSolidPurchaseTag size={24} />,
  },
  { label: "Sales", path: "/sales", icon: <AiOutlineCalendar size={24} /> },
  {
    label: "Purchases",
    path: "/purchases",
    icon: <AiOutlineCalendar size={24} />,
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
