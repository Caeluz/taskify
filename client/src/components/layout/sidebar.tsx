// Sidebar.tsx
"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";

// Dashboard, Projects, Messages,
import { MdDashboard } from "react-icons/md";
import { BiSolidMessageRoundedDots, BiSolidFolderOpen } from "react-icons/bi";
import { usePathname } from "next/navigation";

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
    pathname === route ? "text-black" : "text-black/50 hover:text-black";

  // Highlight menu item based on currently displayed route
  return (
    <Link
      href={route}
      className={`flex gap-1 [&>*]:my-auto text-md pl-6 py-3 border-b-black/10 ${colorClass}`}
    >
      <div className="text-3xl flex [&>*]:mx-auto w-[30px]">{icon}</div>
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
    <div ref={sidebarRef}>
      <aside
        className={`absolute z-20 w-41 md:static md:w-50 lg:static lg:w-56 border border-gray-100 bg-white transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 h-full`}
      >
        {/* Sidebar content */}
        <div className="flex-row">
          <h2 className="text-3xl text-center pt-5 sm:pt-5 md:pt-5 lg:pt-5 font-semibold mb-4 text-[#3b82f6]">
            Taskify
          </h2>

          <ul className="pr-7 pt-7">
            <MenuItem
              name="Dashboard"
              route="/dashboard"
              icon={<MdDashboard />}
            />
            <MenuItem
              name="Projects"
              route="/project"
              icon={<BiSolidFolderOpen />}
            />
            <MenuItem
              name="Messages"
              route="/messages"
              icon={<BiSolidMessageRoundedDots />}
            />
          </ul>
        </div>
      </aside>
      {isSidebarOpen && (
        <div
          onClick={() => toggleSidebar()}
          className="fixed inset-0 bg-black opacity-50 z-10 md:opacity-0 transition-opacity duration-200 ease-in-out"
        />
      )}
    </div>
  );
};

export default Sidebar;
