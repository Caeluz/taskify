import React, { createContext, useContext, useState } from "react";

export interface ProjectData {
  tasks: TaskData;
  projectProgress: number;
  membersWorkload: MemberWorkload[];
  taskStatusDistribution: any[];
}

export interface TaskData {
  id: number;
  totalTasks: number | string;
  completed: number;
  inProgress: number;
  overDue: number;
}

export interface MemberWorkload {
  memberId: number;
  memberName: string;
  taskCountbyStatus?: any;
  totalTaskCount: number;
}

interface ProjectOverviewContextProps {
  projectOverview: ProjectData;
  setProjectOverview: (data: any) => void;
}

const ProjectOverviewContext = createContext<ProjectOverviewContextProps>({
  projectOverview: {
    tasks: {
      id: 0,
      totalTasks: 0,
      completed: 0,
      inProgress: 0,
      overDue: 0,
    },
    projectProgress: 0,
    membersWorkload: [],
    taskStatusDistribution: [],
  },
  setProjectOverview: () => {},
});

export const useProjectOverviewData = () => useContext(ProjectOverviewContext);

export interface ProjectOverviewProviderProps {
  children: React.ReactNode;
  projectOverview: any;
  setProjectOverview: (data: any) => void;
}

export const ProjectOverviewProvider = ({
  children,
  projectOverview,
  setProjectOverview,
}: ProjectOverviewProviderProps) => {
  return (
    <ProjectOverviewContext.Provider
      value={{ projectOverview, setProjectOverview }}
    >
      {children}
    </ProjectOverviewContext.Provider>
  );
};
