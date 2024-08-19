import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";

import { Check, NotebookPen, TrafficCone, CircleAlert } from "lucide-react";

export interface StatsCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
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
  return (
    <div className="p-4 grid grid-cols-4 gap-x-4">
      <StatsCard
        icon={NotebookPen}
        title="Total Tasks"
        description="20"
        color="#3b82f6"
      />
      <StatsCard
        icon={Check}
        title="Completed"
        description="10"
         color="#34d399"
      />
      <StatsCard
        icon={TrafficCone}
        title="In Progress"
        description="5"
        color="#e7763b"
      />
      <StatsCard
        icon={CircleAlert}
        title="Overdue"
        description="5"
        color="#f87171"
      />
    </div>
  );
}
