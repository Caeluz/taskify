"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { useParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteProjectMember, fetchProjectMembers } from "./api/members";
import { useProjectMembersStore } from "@/store/zustand/projectMembersStore";
import { ProjectMember } from "./AddMembersDialogContent";

export type Member = {
  id: string;
  username: string;
  role: string;
  total_tasks?: number;
  // pendingTasks?: number;
  // completedTasks?: number;
  tasks_by_status?: TasksByStatus;
};

export type TasksByStatus = {
  [key: string]: {
    count: number;
    color: string;
  };
};

// export const columns: ColumnDef<Member>[] = []
export const columns = (
  projectId: string,
  projectMembers: ProjectMember[],
  setProjectMembers: (members: ProjectMember[]) => void
): ColumnDef<Member>[] => [
  {
    accessorKey: "username",
    // header: "Name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Username
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    // accessorKey: "pendingCount",
    accessorFn: (row) => row.tasks_by_status?.InProgress?.count || 0,
    header: "Pending Tasks",
    // cell: ({ row }) => <div>{row.getValue("pendingCount")}</div>,
  },
  {
    // accessorKey: "completedTasks",
    accessorFn: (row) => row.tasks_by_status?.Done?.count || 0,
    header: "Completed Tasks",
  },
  {
    accessorKey: "total_tasks",
    header: "Total Tasks",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const member = row.original;

      const handleDelete = async () => {
        try {
          await deleteProjectMember(projectId, member.id);
          // const updatedProjectMembers = await fetchProjectMembers(projectId);
          // setProjectMembers(updatedProjectMembers.data);
          setProjectMembers(projectMembers.filter((m) => m.id !== member.id));
        } catch (error) {
          console.error("Error removing project member:", error);
        }
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(member.id)}
            >
              Copy member ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Change position</DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-500"
              onClick={() => handleDelete()}
            >
              Remove member
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
