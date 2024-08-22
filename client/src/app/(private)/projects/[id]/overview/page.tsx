"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";

import { Check } from "lucide-react";

import { StatsCardsContainer } from "./StatsCards";
import ProgressCard from "./ProgressCard";
import MembersCard from "./MembersCard";
import CalendarCard from "./CalendarCard";
import TaskStatusDistributionCard from "./TaskStatusDistributionCard";
import { useEffect, useState } from "react";
import fetchProjectOverview from "./api/projectOverview";
import { usePathname } from "next/navigation";
import { ProjectOverviewProvider } from "@/components/utility/ProjectDashboardDataContext";

interface ProjectOverview {
  id: number;
  name: string;
  progress: number;
  status: string;
  description: string;
  members: number[];
}

export default function OverviewPage({ params }: { params: { id: number } }) {
  const [projectOverview, setProjectOverview] = useState<any>();
  const projectId = params.id;

  useEffect(() => {
    fetchProjectOverview(projectId)
      .then((response) => {
        console.log(response);
        setProjectOverview(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [projectId]);

  return (
    <div className="flex flex-row justify-between">
      <ProjectOverviewProvider
        projectOverview={projectOverview}
        setProjectOverview={setProjectOverview}
      >
        <div className="flex-grow">
          <h1 className="pt-4 pl-4 text-xl font-semibold">Project Name</h1>
          <div>
            <StatsCardsContainer />
            <div className="grid grid-cols-3 px-4 gap-x-4">
              <ProgressCard />
              <MembersCard />
              <TaskStatusDistributionCard />
            </div>
          </div>
        </div>
      </ProjectOverviewProvider>
      <CalendarCard />
    </div>
  );
}
