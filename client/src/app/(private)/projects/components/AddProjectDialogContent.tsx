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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { useParams, useRouter } from "next/navigation";
import { useUserStore } from "@/store/zustand/userStore";
import fetchUserProjects, { createUserProject } from "../api/userProjects";
import { useUserProjectsStore } from "@/store/zustand/userProject";

const createProjectFormSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  description: z.string().min(1, "Description is required"),
  // status: z.string().min(1),
});

export default function AddProjectDialogContent({
  userId,
  dialogOpen,
  setDialogOpen,
}: {
  userId: number | string;
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const form = useForm<z.infer<typeof createProjectFormSchema>>({
    resolver: zodResolver(createProjectFormSchema),
    defaultValues: {
      name: "",
      description: "",
      // status: "",
    },
  });
  const router = useRouter();

  const { userProjects, setUserProjects } = useUserProjectsStore();

  async function onSubmit(values: z.infer<typeof createProjectFormSchema>) {
    const response = await createUserProject(
      userId,
      values.name,
      values.description,
      // values.status
      "test"
    );

    console.log(userProjects);

    const updatedProjectMembers = await fetchUserProjects(userId);

    // Set dialog close
    setDialogOpen(false);

    setUserProjects(updatedProjectMembers.data);

    console.log(response);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Create Project</DialogTitle>
          </DialogHeader>
          <div className="grid gap-5 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Project Name" {...field} />
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
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter project description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <DialogFooter>
            <Button variant="customBlue" type="submit">
              Create Project
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
}
