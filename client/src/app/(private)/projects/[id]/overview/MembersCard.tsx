"use client";
import { useEffect, useState } from "react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { useProjectOverviewData } from "@/components/utility/ProjectDashboardDataContext";

interface Member {
  memberId: number;
  memberName: string;
  totalTaskCount: number;
  fill?: string;
  avatar?: string;
}

const chartConfig = {
  totalTaskCount: { label: "Workload" },
  John: { label: "John", color: "hsl(var(--chart-1))" },
  Jane: { label: "Jane", color: "hsl(var(--chart-2))" },
  El: { label: "El", color: "hsl(var(--chart-3))" },
  David: { label: "David", color: "hsl(var(--chart-4))" },
  other: { label: "Other", color: "hsl(var(--chart-5))" },
} satisfies ChartConfig;

export default function MembersCard() {
  const { projectOverview } = useProjectOverviewData();

  const [sortBy, setSortBy] = useState("totalTaskCount");

  const membersWorkload: Member[] = projectOverview?.membersWorkload || [];

  const sortedData = [...membersWorkload].sort((a, b) =>
    sortBy === "totalTaskCount"
      ? b.totalTaskCount - a.totalTaskCount
      : a.memberName.localeCompare(b.memberName)
  );

  const handleSort = (value: string) => {
    console.log("Sorting by:", value);
    setSortBy(value);
  };

  return (
    <Card className="flex flex-col col-span-1">
      <CardHeader className="items-center">
        <CardTitle>Members</CardTitle>
        <CardDescription>
          Workload Assigned.{" "}
          <Link href="/projects/0/members" className="underline">
            Click
          </Link>{" "}
          to view more.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Select onValueChange={handleSort} defaultValue="totalTaskCount">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="totalTaskCount">Sort by Workload</SelectItem>
              <SelectItem value="memberName">Sort by Name</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={sortedData}
            layout="vertical"
            margin={{ left: 80, right: 20, top: 10, bottom: 10 }}
          >
            <YAxis
              dataKey="memberName"
              type="category"
              tickLine={false}
              axisLine={false}
              tick={<CustomYAxisTick membersWorkload={membersWorkload} />}
              minTickGap={2}
            />
            <XAxis dataKey="totalTaskCount" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="totalTaskCount"
              background={{ fill: "hsl(var(--bar-background))", radius: 10 }}
              layout="vertical"
              radius={10}
              barSize={20}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Total Workload:{" "}
          {sortedData.reduce((sum, item) => sum + item.totalTaskCount, 0)}
        </div>
        <div className="leading-none text-muted-foreground">
          Average:{" "}
          {(
            sortedData.reduce((sum, item) => sum + item.totalTaskCount, 0) /
            sortedData.length
          ).toFixed(2)}
        </div>
      </CardFooter>
    </Card>
  );
}

const CustomYAxisTick = ({
  x,
  y,
  payload,
  membersWorkload,
}: {
  x?: number;
  y?: number;
  payload?: { value: string };
  membersWorkload: Member[];
}) => {
  const member = membersWorkload.find(
    (item) => item.memberName === payload?.value
  ) || {
    memberName: "",
    avatar: "",
  };

  return (
    <g transform={`translate(${x},${y})`}>
      <foreignObject x={-100} y={-15} width={100} height={30}>
        <div className="flex justify-start items-center">
          <Avatar className="w-6 h-6">
            <AvatarImage src={member.avatar} alt={member.memberName} />
            <AvatarFallback>{member.memberName[0]}</AvatarFallback>
          </Avatar>
          <div className="ml-2 text-xs">{payload?.value}</div>
        </div>
      </foreignObject>
    </g>
  );
};
