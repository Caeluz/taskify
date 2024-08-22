"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardTitle,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Check } from "lucide-react";
import { useProjectOverviewData } from "@/components/utility/ProjectDashboardDataContext";

// const chartData = [
//   { day: "Monday", completed: 0, inProgress: 0, toDo: 5 },
//   { day: "Tuesday", completed: 0, inProgress: 1, toDo: 0 },
//   { day: "Wednesday", completed: 0, inProgress: 2, toDo: 0 },
//   { day: "Thursday", completed: 0, inProgress: 2, toDo: 0 },
//   { day: "Friday", completed: 5, inProgress: 0, toDo: 0 },
//   //   { day: "Saturday", completed: 5, inProgress: 5, toDo: 3 },
//   //   { day: "Sunday", completed: 5, inProgress: 5, toDo: 3 },
// ];

const chartConfig = {
  completed: {
    label: "Completed",
    color: "#34D399",
  },
  inProgress: {
    label: "In Progress",
    color: "#FBBF24",
  },
  toDo: {
    label: "To Do",
    color: "#F87171",
  },
} satisfies ChartConfig;

export default function TaskStatusDistributionCard() {
  const { projectOverview } = useProjectOverviewData();

  const taskStatusDistribution = projectOverview?.taskStatusDistribution;

  const monthToday = new Intl.DateTimeFormat("en-us", {
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <Card className="flex flex-col">
      <CardHeader className="text-center">
        <CardTitle>Task Status Distribution</CardTitle>
        <CardDescription>This week - {monthToday}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={taskStatusDistribution}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="completed"
              stackId="a"
              fill={chartConfig.completed.color}
            />
            <Bar
              dataKey="inProgress"
              stackId="a"
              fill={chartConfig.inProgress.color}
            />
            <Bar dataKey="toDo" stackId="a" fill={chartConfig.toDo.color} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 text-sm ">
        <div className="flex items-center gap-2 font-medium leading-none">
          Keep Up!
        </div>
        <div className="leading-none text-muted-foreground">
          You are doing great!
        </div>
      </CardFooter>
    </Card>
  );
}
