import { ProjectMember } from "./../app/(private)/projects/[id]/members/AddMembersDialogContent";
import { create } from "zustand";

interface ProjectMembersState {
  projectMembers: ProjectMember[];
  setProjectMembers: (members: ProjectMember[]) => void;
}

export const useProjectMembersStore = create<ProjectMembersState>((set) => ({
  projectMembers: [],
  setProjectMembers: (members) => set({ projectMembers: members }),
}));
