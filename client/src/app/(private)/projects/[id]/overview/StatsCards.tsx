import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { useProjectOverviewData } from "@/components/utility/ProjectDashboardDataContext";

import { Check, NotebookPen, TrafficCone, CircleAlert } from "lucide-react";

export interface StatsCardProps {
  icon: React.ElementType;
  title: string;
  description: string | number;
  color?: string;
}

export function StatsCard({
  icon: Icon,
  title,
  description,
  color,
}: StatsCardProps) {
  return (
    <Card>
      <div className="flex items-center space-x-4 rounded-md border w-full h-full p-4">
        <Icon color={color} />
        <div className="flex-1 space-y-1">
          <p
            className="text-lg font-semibold leading-none"
            style={{ color: color }}
          >
            {title}
          </p>
          <p className="text-lg text-muted-foreground">{description}</p>
        </div>
      </div>
    </Card>
  );
}

export function StatsCardsContainer() {
  const { projectOverview } = useProjectOverviewData();

  const tasks = projectOverview?.tasks;

  return (
    <div className="p-4 grid grid-cols-4 gap-x-4">
      {tasks && (
        <>
          <StatsCard
            icon={NotebookPen}
            title="Total Tasks"
            description={tasks.totalTasks}
            color="#3b82f6"
          />
          <StatsCard
            icon={Check}
            title="Completed"
            description={tasks.completed}
            color="#34d399"
          />
          <StatsCard
            icon={TrafficCone}
            title="In Progress"
            description={tasks.inProgress}
            color="#e7763b"
          />
          <StatsCard
            icon={CircleAlert}
            title="Overdue"
            description={tasks.overDue}
            color="#f87171"
          />
        </>
      )}
    </div>
  );
}
