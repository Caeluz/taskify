"use client";
import React, { useMemo } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ClipboardList,
  CirclePlus,
  Settings,
  Users,
  LucideUserPlus,
  FileBarChart,
  Gauge,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { usePathname } from "next/navigation";

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: number };
}) {
  const pathname = usePathname();
  const projectId = params.id;

  // useMemo to cache the results of isCurrentPath checks
  const activePaths = useMemo(
    () => ({
      tasks: pathname === `/projects/${projectId}/tasks`,
      members: pathname === `/projects/${projectId}/members`,
      settings: pathname === `/projects/${projectId}/settings`,
      reports: pathname === `/projects/${projectId}/reports`,
    }),
    [pathname, projectId]
  );

  function renderContent() {
    if (isCurrentPath("/tasks")) {
      return (
        <Button
          className="bg-[#3b82f6] text-white"
          // onClick={() => setColumnCount(columnCount + 1)}
        >
          <CirclePlus className="w-4 mr-2" />
          Add Column
        </Button>
      );
    } else if (isCurrentPath("/members")) {
      // Replace this with whatever you want to render for "/members"
      return (
        <Button
          className="bg-[#3b82f6] text-white"
          // onClick={() => setColumnCount(columnCount + 1)}
        >
          <LucideUserPlus className="w-4 mr-2" />
          Add Members
        </Button>
      );
    } else if (isCurrentPath("/settings")) {
      // Replace this with whatever you want to render for "/settings"
      return <div>Settings content here</div>;
    } else {
      // Default case if none of the paths match
      return <div></div>;
    }
  }

  // Function to determine if the current path matches the tab's path
  const isCurrentPath = (path: string) => {
    return pathname === `/projects/${projectId}${path}`;
  };

  const navLinks = [
    { path: "/overview", icon: Gauge, label: "Overview" },
    { path: "/tasks", icon: ClipboardList, label: "Tasks" },
    { path: "/members", icon: Users, label: "Members" },
    { path: "/settings", icon: Settings, label: "Settings" },
    { path: "/reports", icon: FileBarChart, label: "Reports" },
  ];

  return (
    <div>
      <div className="flex flex-row justify-between space-x-4 p-6 text-[#3b82f6] font-medium">
        <div className="flex flex-row space-x-4 items-center">
          {navLinks.map(({ path, icon: Icon, label }) => (
            <Link key={path} href={`/projects/${projectId}${path}`}>
              <div
                className={`flex flex-row space-x-2 cursor-pointer ${
                  isCurrentPath(path)
                    ? "text-white bg-[#3b82f6] p-2 rounded-xl font-semibold"
                    : ""
                }`}
              >
                <Icon />
                <div>{label}</div>
              </div>
            </Link>
          ))}
        </div>
        {renderContent()}
      </div>
      <Separator className="bg-[#C4C4C4]" />
      {children}
    </div>
  );
}
