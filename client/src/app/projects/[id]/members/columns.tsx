"use client";

import { ColumnDef } from "@tanstack/react-table";

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
    header: "Name",
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
  },
  {
    accessorKey: "menu",
    header: "Menu",
  },
];
