"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import fetchUserProjects, { deleteUserProject } from "../api/userProjects";
import { useUserProjectsStore } from "@/store/zustand/userProject";

export default function DeleteProjectDialogContent({
  userId,
  projectId,
}: {
  userId: number | string;
  projectId: number | string;
}) {
  const { userProjects, setUserProjects } = useUserProjectsStore();

  async function handleDelete() {
    const response = await deleteUserProject(userId, projectId);

    const updatedUserProjects = await fetchUserProjects(userId);

    setUserProjects(updatedUserProjects.data);
  }

  return (
    <DialogContent>
      <DialogHeader>Do you really want to delete the project?</DialogHeader>
      <Button variant="destructive" onClick={handleDelete}>
        Delete
      </Button>
    </DialogContent>
  );
}
