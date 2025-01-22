import { create } from "zustand";

interface UserProject {
  id: string | number;
  name: string;
  description: string;
  status: string;
}

interface UserProjectsState {
  userProjects: UserProject[];
  setUserProjects: (userProjects: UserProject[]) => void;
}

export const useUserProjectsStore = create<UserProjectsState>((set) => ({
  userProjects: [],
  setUserProjects: (userProjects: UserProject[]) =>
    set({ userProjects: userProjects }),
}));
