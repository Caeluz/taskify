import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { truncateText } from "@/components/utility/truncate-text";
import type { UniqueIdentifier } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { ColumnId } from "./KanbanBoard";
import { cva } from "class-variance-authority";

import { GripVertical, MessageSquareMore, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface Task {
  id: UniqueIdentifier;
  columnId: ColumnId;
  content: string;
}

interface TaskCardProps {
  task: Task;
  isOverlay?: boolean;
}

export type TaskType = "Task";

export interface TaskDragData {
  type: TaskType;
  task: Task;
}

export function TaskCard({ task, isOverlay }: TaskCardProps) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    } satisfies TaskDragData,
    attributes: {
      roleDescription: "Task",
    },
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  const variants = cva("", {
    variants: {
      dragging: {
        over: "ring-2 opacity-30",
        overlay: "ring-2 ring-primary",
      },
    },
  });

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={variants({
        dragging: isOverlay ? "overlay" : isDragging ? "over" : undefined,
      })}
    >
      <CardHeader className="p-5 space-y-0">
        <div className="flex justify-start">
          <Button
            variant={"ghost"}
            {...attributes}
            {...listeners}
            className="p-1 text-secondary-foreground/50 -ml-2 h-auto cursor-grab"
          >
            <span className="sr-only">Move task</span>
            <GripVertical />
          </Button>
          <Badge variant={"outline"} className="ml-auto font-semibold">
            Low
          </Badge>
        </div>
        <CardTitle className="text-left text-sm">{task.content}</CardTitle>
        <CardDescription className="hidden">
          {truncateText(
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
            10
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-sm text-left hidden">
        May 23, 2024 - May 30, 2024
      </CardContent>
      <CardFooter className="flex flex-row justify-between p-3">
        <div className="flex flex-row space-x-2">
          <MessageSquareMore className="w-5" strokeWidth={1} />
          <Paperclip className="w-5" strokeWidth={1} />
        </div>

        <div className="flex flex-row space-x-[-12px] ">
          <Avatar className="whitespace-nowrap w-6 h-6">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <Avatar className="whitespace-nowrap w-6 h-6">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <Avatar className="whitespace-nowrap w-6 h-6">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
        </div>
      </CardFooter>
    </Card>
  );
}
