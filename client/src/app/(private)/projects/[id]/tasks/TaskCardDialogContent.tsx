"use client";
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Calendar,
  Clock,
  Download,
  FileIcon,
  Plus,
  PlusIcon,
  Trash2,
} from "lucide-react";
import { Task } from "./TaskCard";
import { fetchProjectTask } from "./api/tasks";
import { useParams } from "next/navigation";

export default function TaskCardDialogContent({ taskId }: { taskId: number }) {
  const [task, setTask] = useState<Task>();

  let { id: projectId } = useParams<{ id: string }>();

  async function fetchAndSetTask(projectId: string, taskId: number) {
    try {
      const data = await fetchProjectTask({ projectId, taskId });
      setTask(data.data);
    } catch (error) {
      console.error("Error fetching task:", error);
    }
  }

  useEffect(() => {
    if (projectId && taskId) {
      // Check if both projectId and taskId are valid
      fetchAndSetTask(projectId, taskId);
    }
  }, [projectId, taskId]); // Only run when projectId or taskId changes

  return (
    <>
      <DialogHeader>
        <DialogTitle>
          <Badge>{task?.priority}</Badge>
          <div className="mt-2">{task?.name}</div>
        </DialogTitle>
        <div className="flex items-center gap-2 text-muted-foreground">
          {task?.due_date && (
            <div className="flex items-center gap-1 mb-2">
              <Calendar className="h-4 w-4" />
              <span>{task.due_date}</span>
            </div>
          )}

          {/* <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>4:00 PM</span>
          </div> */}
          <div className="flex items-center gap-1"></div>
        </div>

        <div className="grid gap-2">
          <div className="text-muted-foreground">
            <p>{task?.description}</p>
          </div>
        </div>
      </DialogHeader>
      {/* Body */}
      <div className="mt-6">
        {/* Assigned To section */}
        <div>
          <h4 className="text-lg font-medium">Assigned To</h4>
          <div className="mt-2 flex items-center gap-4">
            {/* Members using task.members */}
            {task?.members?.map((member) => (
              <Avatar key={member.id}>
                <AvatarImage src={member.avatar} />
                <AvatarFallback>{member.username[0]}</AvatarFallback>
              </Avatar>
            ))}
            <Button variant="ghost" size="icon">
              <PlusIcon className="h-4 w-4" />
              <span className="sr-only">Add person</span>
            </Button>
          </div>
        </div>
        {/* Attachments */}
        <div className="grid gap-2 mt-4">
          <h4 className="text-lg font-medium">Attachments</h4>
          <div className="grid grid-cols-2 gap-4">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="flex items-center gap-4 rounded-md border p-2"
              >
                <FileIcon className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Homepage Wireframe.pdf</p>
                  <p className="text-sm text-muted-foreground">
                    Uploaded 2 days ago
                  </p>
                </div>
                <div className="ml-auto flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            <div>
              <div
                className="flex items-center justify-center gap-4 rounded-md border-dashed border-2 p-2 cursor-pointer h-full"
                onClick={() => {
                  // Your click handler logic here
                  console.log("Div clicked");
                }}
              >
                <Plus className="h-5 w-5" />
                <span>Add attachment</span>
              </div>
            </div>
          </div>
        </div>
        {/* Comments */}
        <div className="mt-4">
          <h4 className="text-lg font-medium">Comments</h4>
          <div className="mt-2 space-y-4">
            {/* Singular Comment */}
            <div className="flex items-start gap-4 ">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className="grid gap-2">
                <div className="rounded-md border bg-background p-3">
                  <p>
                    Great work! I think we can improve the user experience by
                    adding a loading spinner when the user is signing in.
                  </p>
                </div>
                <div className="text-sm text-muted-foreground">2 days ago</div>
              </div>
            </div>
            <div className="flex items-start gap-4 ">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className="grid gap-2">
                <div className="rounded-md border bg-background p-3">
                  <p>
                    Great work! I think we can improve the user experience by
                    adding a loading spinner when the user is signing in.
                  </p>
                </div>
                <div className="text-sm text-muted-foreground">2 days ago</div>
              </div>
            </div>
            <div className="flex items-start gap-4 ">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className="grid gap-2">
                <div className="rounded-md border bg-background p-3">
                  <p>
                    Great work! I think we can improve the user experience by
                    adding a loading spinner when the user is signing in.
                  </p>
                </div>
                <div className="text-sm text-muted-foreground">2 days ago</div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Textarea
              placeholder="Add a comment..."
              className="min-h-[100px]"
            />
            <div className="mt-2 flex justify-end gap-2">
              <Button variant="ghost">Cancel</Button>
              <Button>Post Comment</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
