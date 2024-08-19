"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type Member = {
  id: string;
  name: string;
  position: string;
  pendingTasks: number;
  completedTasks: number;
};

export const columns: ColumnDef<Member>[] = [
  {
    accessorKey: "name",
    // header: "Name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "position",
    header: "Position",
  },
  {
    accessorKey: "pendingTasks",
    header: "Pending Tasks",
  },
  {
    accessorKey: "completedTasks",
    header: "Completed Tasks",
    // header: () => <div className="text-center">Completed Tasks</div>,
    // cell: ({ row }) => {
    //   const completedTasks = row.original.completedTasks;
    //   return <div className="text-center">{completedTasks}</div>;
    // },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const member = row.original;

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
            <DropdownMenuItem className="text-red-500">
              Remove member
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
