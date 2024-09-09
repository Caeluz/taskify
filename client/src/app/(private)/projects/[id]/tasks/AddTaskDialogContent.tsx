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

import { useState } from "react";

import { TaskStatus } from "./TaskCard";
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

const formSchema = z.object({
  // projectId: z.string().optional(),
  name: z.string().min(1),
  description: z.string().min(1),
  members: z.number().int().array().optional(),
  priority: z.string(), // LOW, MEDIUM, HIGH
  taskStatusId: z.number({ message: "Please select a status" }).int(),
  startDate: z.date(),
  // dueDate: z.date(),
});

export default function AddTaskDialogContent({
  taskStatus,
}: {
  taskStatus: TaskStatus;
}) {
  const { id: projectId } = useParams<{ id: string }>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // projectId: projectId || "",
      name: "tester",
      // members: [],
      description: "tester",
      priority: "LOW",
      taskStatusId: Number(taskStatus.id),
      // startDate: new Date(),
      // dueDate: new Date(),
    },
  });
  // Get the project id from the URL

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
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

          {/* <div className="flex flex-row items-center overflow-auto space-x-4 py-2">
          <Label className="whitespace-nowrap">From:</Label>
          <DatePicker dateToday={true} />
          <Label className="whitespace-nowrap">To:</Label>
          <DatePicker />
        </div> */}
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date:</FormLabel>
                <FormControl>
                  <DatePickerWithRange dateToday={true} {...field}  />
                </FormControl>
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
                      { label: "Low", value: "LOW" },
                      { label: "Medium", value: "MEDIUM" },
                      { label: "High", value: "HIGH" },
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
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
}
