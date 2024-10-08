"use client";
import { useState, useEffect, useContext } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Dialog,
  DialogClose,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Calendar,
  Clock,
  Download,
  FileIcon,
  Plus,
  PlusIcon,
  Send,
  Trash2,
} from "lucide-react";
import { Task, TaskMember } from "./TaskCard";
import fetchProjectTasks, {
  deleteTask,
  fetchProjectTask,
  updateTask,
} from "./api/tasks";
import { useParams } from "next/navigation";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { TaskContext } from "./KanbanBoard";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { DatePickerWithRange } from "@/components/ui/date-picker-range";

const priorityColors: { [key in "low" | "medium" | "high"]: string } = {
  low: "bg-green-100 text-green-800",
  medium: "bg-yellow-100 text-yellow-800",
  high: "bg-red-100 text-red-800",
};

export default function TaskCardDialogContent({
  taskId,
  isDialogOpen,
  setIsDialogOpen,
}: {
  taskId: number;
  isDialogOpen: boolean;
  setIsDialogOpen: (isDialogOpen: boolean) => void;
}) {
  const [task, setTask] = useState<Task>();

  let { id: projectId } = useParams<{ id: string }>();
  const taskContext = useContext(TaskContext);

  if (!taskContext) {
    throw new Error("TaskContext is not available");
  }

  const { setTasks } = taskContext;

  useEffect(() => {
    if (projectId && taskId) {
      fetchAndSetTask(projectId, taskId);
    }
  }, [projectId, taskId]);

  async function fetchAndSetTask(projectId: string, taskId: number) {
    try {
      const data = await fetchProjectTask({ projectId, taskId });
      setTask(data.data);
    } catch (error) {
      console.error("Error fetching task:", error);
    }
  }

  async function handleDeleteTask() {
    try {
      const deleteTaskData = await deleteTask({ projectId, taskId });

      if (!deleteTaskData) {
        console.error("Error deleting task");
        return;
      }

      setIsDialogOpen(false);

      const updatedTasks = await fetchProjectTasks(projectId);
      setTasks(updatedTasks.data);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }

  const [newComment, setNewComment] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState<Task>();

  const handleEditTask = () => {
    setIsEditing(true);
    setEditedTask(task);
  };

  const handleSaveTask = () => {
    setTask(editedTask);

    console.log("Saving task", editedTask);

    // updateTask({
    //   projectId,
    //   taskId,
    //   name: editedTask?.name || "",
    //   description: editedTask?.description || "",
    //   // members: editedTask?.members?.map((member) => member.id) || [],
    //   priority: editedTask?.priority || "low",
    //   // taskStatusId: editedTask?.taskStatusId || 1,
    //   startDate: editedTask?.start_date || "",
    //   dueDate: editedTask?.due_date || "",
    // });

    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedTask(task);
  };

  return (
    <>
      <DialogHeader className="flex flex-row items-center justify-between">
        <div>
          {isEditing ? (
            <div className="flex items-center gap-2">
              <Select
                value={editedTask?.priority}
                onValueChange={(value) =>
                  setEditedTask({
                    ...editedTask,
                    priority: value as "low" | "medium" | "high",
                  } as Task)
                }
              >
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
              <Input
                value={editedTask?.name}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, name: e.target.value } as Task)
                }
                className="text-2xl font-bold"
              />
            </div>
          ) : (
            <DialogTitle className="flex items-center gap-2">
              <Badge>{task?.priority}</Badge>
              <span className="text-2xl font-bold">{task?.name}</span>
            </DialogTitle>
          )}
          <div className="flex items-center gap-4 text-muted-foreground mt-2">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {isEditing ? (
                <DatePickerWithRange
                  // dateValue={}
                  // onDateSelect={}
                  // type="date"
                  // value={editedTask?.due_date}
                  // onChange={(e) =>
                  //   setEditedTask({ ...editedTask, due_date: e.target.value })
                  // }
                  className="w-[150px]"
                />
              ) : (
                <span>{`${task?.startDate} to ${task?.dueDate}`}</span>
              )}
            </div>
            {/* <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>4:00 PM</span>
            </div> */}
          </div>
        </div>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={handleCancelEdit}>
                Cancel
              </Button>
              <Button onClick={handleSaveTask}>
                {/* <Save className="h-4 w-4 mr-2" /> */}
                Save
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={handleEditTask}>
                {/* <Edit2 className="h-4 w-4 mr-2" /> */}
                Edit
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="destructive" size="icon">
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete task</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      Are you sure you want to delete this task?
                    </DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. This will permanently delete
                      the task and all associated data.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose>Cancel</DialogClose>
                    <Button onClick={handleDeleteTask}>Delete</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </>
          )}
        </div>
      </DialogHeader>
      <div className="mt-4 space-y-6">
        <DescriptionSection
          description={task?.description}
          isEditing={isEditing}
          editedTask={editedTask}
          setEditedTask={setEditedTask}
        />
        <AssignedToSection members={task?.members} />
        <AttachmentsSection />
        <CommentsSection />
      </div>
    </>
  );
}

function DescriptionSection({
  description,
  isEditing,
  editedTask,
  setEditedTask,
}: {
  description?: string;
  isEditing?: boolean;
  editedTask: Task | undefined;
  setEditedTask: (task: Task) => void;
}) {
  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Description</h4>
      {isEditing ? (
        <Textarea
          value={editedTask?.description}
          onChange={(e) =>
            setEditedTask({
              ...editedTask,
              description: e.target.value,
            } as Task)
          }
          className="min-h-[100px]"
        />
      ) : (
        <p>{description}</p>
      )}
      {/* <Textarea placeholder="Add a description..." className="min-h-[100px]" /> */}
      {/* <p className="text-muted-foreground">{description}</p> */}
    </div>
  );
}

function AssignedToSection({ members }: { members?: TaskMember[] }) {
  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Assigned To</h4>
      <div className="flex items-center gap-2">
        {members?.map((member) => (
          <Avatar key={member.id}>
            <AvatarImage src={member.avatar} alt={member.username} />
            <AvatarFallback>{member.username[0].toUpperCase()}</AvatarFallback>
          </Avatar>
        ))}
        <Button variant="outline" size="icon" className="rounded-full">
          <PlusIcon className="h-4 w-4" />
          <span className="sr-only">Add person</span>
        </Button>
      </div>
    </div>
  );
}

function AttachmentsSection() {
  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Attachments</h4>
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
            onClick={() => console.log("Div clicked")}
          >
            <Plus className="h-5 w-5" />
            <span>Add attachment</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CommentsSection() {
  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Comments</h4>
      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <div className="rounded-md bg-muted p-3">
              <p>
                Great work! I think we can improve the user experience by adding
                a loading spinner when the user is signing in.
              </p>
            </div>
            <p className="text-sm text-muted-foreground">2 days ago</p>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <Textarea placeholder="Add a comment..." className="min-h-[100px]" />
        <div className="mt-2 flex justify-end gap-2">
          <Button>
            <Send className="h-4 w-4 mr-2" />
            Post Comment
          </Button>
        </div>
      </div>
    </div>
  );
}
