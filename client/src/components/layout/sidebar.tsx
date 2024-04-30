// Sidebar.tsx
"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";

// Dashboard, Projects, Messages,
import { MdDashboard } from "react-icons/md";
import { BiSolidMessageRoundedDots, BiSolidFolderOpen } from "react-icons/bi";
import { usePathname } from "next/navigation";
import { RxDashboard, RxListBullet, RxChatBubble } from "react-icons/rx";

import { Button } from "../ui/button";

import { useSidebarStore } from "@/store/sidebar";
import { GiHamburgerMenu } from "react-icons/gi";

interface MenuItemProps {
  icon: JSX.Element;
  name: string;
  route: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, name, route }) => {
  const pathname = usePathname();

  // Highlight menu item based on currently displayed route
  const colorClass =
    pathname === route ? "text-gray-50" : "text-gray-400 hover:text-black";

  // Highlight menu item based on currently displayed route
  return (
    <Link
      href={route}
      className={`flex items-center gap-2 hover:text-gray-50  ${colorClass}`}
    >
      <div className="text-2xl flex items-center gap-2 [&>*]:mx-auto ">
        {icon}
      </div>
      <div>{name}</div>
    </Link>
  );
};

const Sidebar: React.FC = () => {
  const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen);
  const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);
  const closeSidebar = useSidebarStore((state) => state.closeSidebar);

  const sidebarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        closeSidebar();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarRef, closeSidebar]);

  return (
    <div
      className={`bg-gray-900 text-gray-400 p-6 pr-10 border-r border-gray-800 md:block  ${
        isSidebarOpen ? "block" : "hidden"
      }`}
    >
      <div className="flex items-center mb-8">
        <FlagIcon className="h-6 w-6 mr-2" />
        <span className="text-lg font-bold text-[#3b82f6]">Taskify</span>
      </div>
      <nav className="space-y-4">
        <MenuItem name="Dashboard" route="/dashboard" icon={<RxDashboard />} />
        <MenuItem
          name="Projects"
          route="/project"
          icon={<BiSolidFolderOpen />}
        />
        <MenuItem name="Tasks" route="/tasks" icon={<RxListBullet />} />
        <MenuItem name="Messages" route="/messages" icon={<RxChatBubble />} />
      </nav>
    </div>
  );
};

function FlagIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" x2="4" y1="22" y2="15" />
    </svg>
  );
}

export default Sidebar;
