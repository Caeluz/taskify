// Sidebar.tsx
"use client";

import React from "react";
import Link from "next/link";

// Dashboard, Projects, Messages,
import { MdDashboard } from "react-icons/md";
import { BiSolidMessageRoundedDots, BiSolidFolderOpen } from "react-icons/bi";
import { usePathname } from "next/navigation";

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

const Sidebar2: React.FC = () => {
  return (
    <aside className="w-64 bg-gray-200 p-4">
      {/* Sidebar content */}
      <h2 className="text-xl font-semibold mb-4">Sidebar</h2>
      <ul>
        <MenuItem name="Dashboard" route="/dashboard" icon={<MdDashboard />} />
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
    </aside>
  );
};

export default Sidebar2;
