"use client";
import React, { useMemo, useState } from "react";
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

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddMembersDialogContent from "./members/AddMembersDialogContent";

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

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function renderContent() {
    // if (isCurrentPath("/overview")) {
    //   return (
    //     <Button
    //       className="bg-[#3b82f6] text-white"
    //       // onClick={() => setColumnCount(columnCount + 1)}
    //     >
    //       <CirclePlus className="w-4 mr-2" />
    //       Customize
    //     </Button>
    //   );
    if (isCurrentPath("/tasks")) {
      return (
        <Button
          className="font-semibold"
          variant="customBlue"
          // onClick={() => setColumnCount(columnCount + 1)}
        >
          <CirclePlus className="w-4 mr-2" />
          Add Column
        </Button>
      );
    } else if (isCurrentPath("/members")) {
      // Replace this with whatever you want to render for "/members"
      return (
        <Dialog onOpenChange={setIsDialogOpen} open={isDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="customBlue"
              // onClick={() => setColumnCount(columnCount + 1)}
            >
              <LucideUserPlus className="w-4 mr-2" />
              Add Members
            </Button>
          </DialogTrigger>
          <AddMembersDialogContent setIsDialogOpen={setIsDialogOpen} />
        </Dialog>
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
      <div className="flex flex-row justify-between space-x-4 p-6  font-medium">
        <div className="flex flex-row space-x-4 items-center">
          {navLinks.map(({ path, icon: Icon, label }) => (
            <Link key={path} href={`/projects/${projectId}${path}`}>
              <Button
                variant={isCurrentPath(path) ? "customBlue" : "ghost"}
                className={`flex flex-row space-x-2 cursor-pointer ${
                  isCurrentPath(path) ? "p-3 rounded-xl font-semibold" : ""
                }`}
              >
                <Icon />
                <div>{label}</div>
              </Button>
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
