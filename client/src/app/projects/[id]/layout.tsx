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
      return null;
    }
  }

  // Function to determine if the current path matches the tab's path
  const isCurrentPath = (path: string) => {
    return pathname === `/projects/${projectId}${path}`;
  };

  return (
    <div>
      <div className="flex flex-row justify-between space-x-4 p-6 text-[#3b82f6] font-medium">
        <div className="flex flex-row space-x-4 items-center">
          <Link href={`/projects/${projectId}/tasks`}>
            <div
              className={`flex flex-row space-x-2 cursor-pointer ${
                isCurrentPath("/tasks")
                  ? "text-white bg-[#3b82f6] p-2 rounded-xl font-semibold"
                  : ""
              }`}
            >
              <ClipboardList />
              <div>Tasks</div>
            </div>
          </Link>
          <Link href={`/projects/${projectId}/members`}>
            <div
              className={`flex flex-row space-x-2 cursor-pointer ${
                isCurrentPath("/members")
                  ? "text-white bg-[#3b82f6] p-2 rounded-xl font-semibold"
                  : ""
              }`}
            >
              <Users />
              <div>Members</div>
            </div>
          </Link>
          <Link href={`/projects/${projectId}/settings`}>
            <div
              className={`flex flex-row space-x-2 cursor-pointer ${
                isCurrentPath("/settings")
                  ? "text-white bg-[#3b82f6] p-2 rounded-xl font-semibold"
                  : ""
              }`}
            >
              <Settings />
              <div>Settings</div>
            </div>
          </Link>
        </div>
        {renderContent()}
      </div>
      <Separator className="bg-[#C4C4C4]" />
      {children}
    </div>
  );
}
