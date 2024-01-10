"use client";
import {
  AiOutlineHome,
  AiOutlineSetting,
  AiOutlineFolder,
  AiOutlineUser,
  AiOutlineClockCircle,
  AiOutlineCalendar,
} from "react-icons/ai";
import { MenuItem } from "../types/MenuItem";

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
  { label: "Home", path: "/", icon: <AiOutlineHome size={24} /> },
  {
    label: "Settings",
    path: "/settings",
    icon: <AiOutlineSetting size={24} />,
  },
  {
    label: "Employees",
    path: "/employees",
    icon: <AiOutlineSetting size={24} />,
  },
  {
    label: "Customers",
    path: "/customers",
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
