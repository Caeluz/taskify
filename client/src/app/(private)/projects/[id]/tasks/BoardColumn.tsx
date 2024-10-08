"use client";
import React, { useState, useMemo } from "react";

import { useDndContext, type UniqueIdentifier } from "@dnd-kit/core";
import { cva } from "class-variance-authority";

import { ComboBox } from "@/components/ui/combo-box";
import AddTaskDialog from "./AddTaskDialogContent";
import { CSS } from "@dnd-kit/utilities";
import { SortableContext, useSortable } from "@dnd-kit/sortable";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { Task, TaskCard } from "./TaskCard";
import { Ellipsis, GripVertical, Plus } from "lucide-react";

import { EllipsisVertical } from "lucide-react";
import { TaskStatus } from "./TaskCard";
import AddTaskDialogContent from "./AddTaskDialogContent";

// export interface Column {
//   id: UniqueIdentifier;
//   name: UniqueIdentifier;
//   title: string;
// }

export interface Column {
  id: UniqueIdentifier;
  position: number;
  taskStatus: TaskStatus;
}

export type ColumnType = "Column";

export interface ColumnDragData {
  type: ColumnType;
  column: Column;
}

interface BoardColumnProps {
  column: Column;
  tasks: Task[];
  isOverlay?: boolean;
}

export function BoardColumn({ column, tasks, isOverlay }: BoardColumnProps) {
  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.taskStatus.name,
    data: {
      type: "Column",
      column,
    } satisfies ColumnDragData,
    attributes: {
      roleDescription: `Column: ${column.taskStatus.name}`,
    },
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  const variants = cva(
    // "h-[500px] max-h-[500px] w-[350px] max-w-full bg-primary-foreground flex flex-col flex-shrink-0 snap-center",
    "min-h-[200px] h-full max-h-[calc(100vh-207px)] w-[350px] max-w-full bg-primary-foreground flex flex-col flex-shrink-0 snap-center",
    {
      variants: {
        dragging: {
          default: "border-2 border-transparent",
          over: "ring-2 opacity-30",
          overlay: "ring-2 ring-primary",
        },
      },
    }
  );

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={variants({
        dragging: isOverlay ? "overlay" : isDragging ? "over" : undefined,
      })}
    >
      <CardHeader className="p-4 font-semibold border-b-2 text-left flex flex-row justify-between items-center flex-shrink-0">
        <div className="flex flex-row items-center">
          <Button
            variant={"ghost"}
            {...attributes}
            {...listeners}
            className="p-1 text-primary/50 -ml-2 h-auto cursor-grab relative"
          >
            <span className="sr-only">{`Move column: ${column.taskStatus.name}`}</span>
            <GripVertical />
          </Button>
          <span className="ml-2">{column.taskStatus.name}</span>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <Ellipsis />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => {
                  setIsAddTaskOpen(true);
                }}
              >
                Add Card
              </DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <Dialog
          open={isAddTaskOpen}
          onOpenChange={(isOpen) => {
            setIsAddTaskOpen(isOpen);
          }}
        >
          <DialogContent>
            {/* <DialogHeader>
              <DialogTitle>Are you sure?</DialogTitle>
              <DialogDescription>
                Do you want to delete the entry? Deleting this entry cannot be
                undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button>Delete</Button>
            </DialogFooter> */}
            <AddTaskDialogContent
              taskStatus={column.taskStatus}
              onClose={() => setIsAddTaskOpen(false)}
            />
            {/* <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose> */}
          </DialogContent>
        </Dialog>
      </CardHeader>
      <ScrollArea className="flex-grow overflow-y-auto" hideRadixScrollbar>
        <CardContent className="flex flex-col gap-2 p-2">
          <SortableContext items={tasksIds}>
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </SortableContext>
        </CardContent>
      </ScrollArea>
      <Button
        className="p-2 m-3 font-semibold rounded-lg"
        variant="customBlue"
        onClick={() => {
          setIsAddTaskOpen(true);
        }}
      >
        Add Card <Plus width={20} className="ml-2" />
      </Button>
    </Card>
  );
}

export function BoardContainer({ children }: { children: React.ReactNode }) {
  const dndContext = useDndContext();

  const variations = cva("px-2 md:px-0 flex lg:justify-left pb-4", {
    variants: {
      dragging: {
        default: "snap-x snap-mandatory",
        active: "snap-none",
      },
    },
  });

  return (
    <ScrollArea
      className={variations({
        dragging: dndContext.active ? "active" : "default",
      })}
    >
      {/* Original */}
      {/* <div className="p-6 flex gap-4 h-[calc(100vh-168px)] overflow-hidden"> */}
      {/* {children} */}
      {/* </div> */}

      <div className="flex gap-4 items-start flex-row justify-left">
        {children}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
