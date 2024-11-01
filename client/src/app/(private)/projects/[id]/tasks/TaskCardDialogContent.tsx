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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DatePickerWithRange } from "@/components/ui/date-picker-range";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { format } from "date-fns";

const priorityColors: { [key in "low" | "medium" | "high"]: string } = {
  low: "bg-green-100 text-green-800",
  medium: "bg-yellow-100 text-yellow-800",
  high: "bg-red-100 text-red-800",
};

// const defaultTask: Task = {
//   id: 0,
//   name: "default",
//   description: "lorem Ipsum",
//   priority: "low",
//   project_id: 1,
//   task_status_id: 1,
//   startDate: "2024"
// };

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

  const formSchema = z.object({
    name: z.string().min(2).optional(),
    description: z.string().min(1).optional(),
    priority: z.enum(["low", "medium", "high"]).optional(),
    dateRange: z
      .object({
        from: z.date(),
        to: z.date().optional(),
      })
      .optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  // Like a default value for editing task
  useEffect(() => {
    form.setValue("name", task?.name);
    form.setValue("priority", task?.priority as "low" | "medium" | "high");
    form.setValue("dateRange", {
      from: new Date(task?.startDate || ""),
      to: new Date(task?.dueDate || ""),
    });
  }, [task, form]);

  const handleEditTask = () => {
    setIsEditing(true);
    setEditedTask(task);

    console.table(task);
  };

  async function handleSaveTask(values: z.infer<typeof formSchema>) {
    // console.log();
    try {
      // Combine form values with other edited task data
      const updatedTask: Task = {
        id: editedTask?.id || "",
        name: values.name || "",
        priority: values.priority || "low",
        project_id: Number(projectId),
        description: editedTask?.description || "",
        // Ensure startDate and dueDate are always strings
        // startDate: editedTask?.startDate || new Date().toISOString(),
        // dueDate: editedTask?.dueDate || new Date().toISOString(),
        startDate: values.dateRange?.from || new Date().toISOString(),
        dueDate: values.dateRange?.to || new Date().toISOString(),
        task_status_id: Number(editedTask?.taskStatus?.id) || 0,
        // members: editedTask?.members || [],
        taskStatus: editedTask?.taskStatus || {
          id: 0,
          name: "",
          hex_color: "",
        },
      };
      console.table(editedTask);
      // return
      const response = await updateTask({
        projectId,
        taskId,
        name: updatedTask.name,
        description: updatedTask.description,
        priority: updatedTask.priority,
        // taskStatusId: updatedTask.task_status_id || 0,
        taskStatusId: updatedTask.task_status_id,
        // startDate: values.dateRange?.from,
        // dueDate: values.dateRange?.to,
        // Convert strings to Date objects for the API
        startDate: new Date(updatedTask.startDate),
        dueDate: updatedTask.dueDate
          ? new Date(updatedTask.dueDate)
          : undefined,
      });

      if (response) {
        setTask(updatedTask);
        setIsEditing(false);

        // Refresh tasks list
        const updatedTasks = await fetchProjectTasks(projectId);
        setTasks(updatedTasks.data);

        console.log(response);
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  }

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedTask(task);
  };

  return (
    <>
      <DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSaveTask)}>
            <div className="flex flex-row items-center justify-between mb-4">
              <div>
                {isEditing ? (
                  <>
                    <div className="flex items-center gap-2">
                      <FormField
                        control={form.control}
                        name="priority"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Select
                                {...field}
                                onValueChange={field.onChange}
                                // defaultValue={editedTask?.priority
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
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                className="text-2xl font-bold"
                                {...field}
                                // defaultValue={editedTask?.name}
                                // value={editedTask?.name}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex items-center gap-4 text-muted-foreground mt-2">
                      <div className="flex items-center gap-1">
                        <FormField
                          name="dateRange"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <DatePickerWithRange
                                  className="w-[150px]"
                                  // {...field}
                                  // dateValue={field.value}
                                  // defaultValue={{
                                  //   from: new Date(editedTask?.startDate || ""),
                                  //   to: editedTask?.dueDate
                                  //     ? new Date(editedTask.dueDate)
                                  //     : undefined,
                                  // }}
                                  // defaultValue={editedTask?.startDate}
                                  dateValue={{
                                    // from: new Date("2023-01-01"),
                                    // to: new Date("2023-12-31"),
                                    from: new Date(editedTask?.startDate || ""),
                                    to: editedTask?.dueDate
                                      ? new Date(editedTask.dueDate)
                                      : undefined,
                                  }}
                                  // dateValue={{
                                  //   from: new Date("2023-01-01"),
                                  //   to: new Date("2023-01-01"),
                                  // }}
                                  // defaultValue={field.value}
                                  // dateValue={field.value}
                                  onDateSelect={({ from, to }) => {
                                    form.setValue("dateRange", { from, to });
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <DialogTitle className="flex items-center gap-2">
                      <Badge>{task?.priority}</Badge>
                      <span className="text-2xl font-bold">{task?.name}</span>
                    </DialogTitle>
                    <div className="flex items-center gap-4 text-muted-foreground mt-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {task?.startDate
                            ? format(new Date(task.startDate), "MMMM dd, yyyy")
                            : ""}
                          {task?.dueDate
                            ? ` to ${format(
                                new Date(task.dueDate),
                                "MMMM dd, yyyy"
                              )}`
                            : ""}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="flex gap-2">
                {isEditing ? (
                  <div className="flex justify-end gap-2 mt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">Save</Button>
                  </div>
                ) : (
                  <>
                    <Button variant="outline" onClick={handleEditTask}>
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
                            This action cannot be undone. This will permanently
                            delete the task and all associated data.
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
            </div>

            <DescriptionSection
              description={task?.description}
              isEditing={isEditing}
              editedTask={editedTask}
              setEditedTask={setEditedTask}
              form={form}
            />
          </form>
        </Form>
      </DialogHeader>

      <div className="mt-4 space-y-6">
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
  form,
}: {
  description?: string;
  isEditing?: boolean;
  editedTask: Task | undefined;
  setEditedTask: (task: Task) => void;
  form: any;
}) {
  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Description</h4>
      {isEditing ? (
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  value={editedTask?.description}
                  onChange={(e) =>
                    setEditedTask({
                      ...editedTask,
                      description: e.target.value,
                    } as Task)
                  }
                  className="min-h-[100px]"
                  // {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
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
