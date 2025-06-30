import { create } from "zustand";
import { Settings } from "@/app/(private)/projects/[id]/settings/page";

interface ProjectSettingsState {
  projectSettings: Settings | null;
  setProjectSettings: (settings: any) => void;
}

export const useProjectSettingsStore = create<ProjectSettingsState>((set) => ({
  projectSettings: null,
  setProjectSettings: (settings) => set({ projectSettings: settings }),
}));
