"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ComboBox } from "@/components/ui/combo-box";
import { Textarea } from "@/components/ui/textarea";
import { DatePickerWithRange } from "@/components/ui/date-picker-range";

import { useContext, useState } from "react";
import { useRouter } from "next/navigation";

import { Task, TaskStatus } from "./TaskCard";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import fetchProjectTasks, { createTask } from "./api/tasks";
import { TaskContext } from "./KanbanBoard";

const createTaskformSchema = z.object({
  // projectId: z.string().optional(),
  name: z.string().min(1),
  description: z.string().min(1),
  members: z.number().int().array().optional(),
  priority: z.string().min(1, {
    message: "Please select a priority",
  }), // LOW, MEDIUM, HIGH
  taskStatusId: z.number({ message: "Please select a status" }).int(),
  // startDate: z.date(),
  // dueDate: z.date(),
  dateRange: z.object({
    from: z.date(),
    to: z.date().optional(),
  }),
});

export default function AddTaskDialogContent({
  taskStatus,
  onClose,
}: {
  taskStatus: TaskStatus;
  onClose: () => void;
}) {
  const router = useRouter();
  const taskContext = useContext(TaskContext);

  if (!taskContext) {
    throw new Error("TaskContext is not available");
  }

  const { tasks, setTasks } = taskContext;

  console.log(tasks);

  const { id: projectId } = useParams<{ id: string }>();

  const form = useForm<z.infer<typeof createTaskformSchema>>({
    resolver: zodResolver(createTaskformSchema),
    defaultValues: {
      name: "tester",
      // members: [],
      description: "tester",
      priority: "low",
      taskStatusId: Number(taskStatus.id),
      dateRange: {
        from: new Date(),
        to: undefined,
      },
    },
  });

  async function onSubmit(values: z.infer<typeof createTaskformSchema>) {
    try {
      const { data } = await createTask({
        projectId: Number(projectId),
        description: values.description,
        members: values.members,
        name: values.name,
        priority: values.priority,
        taskStatusId: values.taskStatusId,
        dateRange: values.dateRange,
      });
      onClose();

      // Update the tasks
      const updatedTasks = await fetchProjectTasks(Number(projectId));
      setTasks(updatedTasks.data);

      console.log(updatedTasks);

      // Refresh the page
      // window.location.reload();
    } catch (error) {
      console.error("Error creating task:", error);
    }

    router.refresh();
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader>Create Task</DialogHeader>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Task Name</FormLabel>
                <FormControl>
                  <Input placeholder="Task Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="taskStatusId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <ComboBox
                    choices={[
                      { label: "ToDo", value: 1 },
                      { label: "In Progress", value: 2 },
                      { label: "Done", value: 3 },
                      { label: "Archived", value: 4 },
                    ]}
                    {...field}
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="members"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Assign To:</FormLabel>
                <FormControl>
                  <ComboBox
                    choices={[
                      { label: "test", value: 1 },
                      {
                        label: "tester",
                        value: 2,
                      },
                    ]}
                    {...field}
                    value={field.value}
                    onChange={field.onChange}
                    multiple={true}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dateRange"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date:</FormLabel>
                <FormControl>
                  <DatePickerWithRange
                    dateToday={true}
                    {...field}
                    dateValue={field.value}
                    onDateSelect={({ from, to }) => {
                      form.setValue("dateRange", { from, to });
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Priority</FormLabel>
                <FormControl>
                  <ComboBox
                    choices={[
                      { label: "Low", value: "low" },
                      { label: "Medium", value: "medium" },
                      { label: "High", value: "high" },
                    ]}
                    {...field}
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description:</FormLabel>
                <FormControl>
                  <Textarea
                    className="resize-none"
                    placeholder="Type other details"
                    id="description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="mt-4">
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
}
