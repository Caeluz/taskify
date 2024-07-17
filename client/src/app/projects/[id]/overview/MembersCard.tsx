"use client";
import { useState } from "react";
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

interface Member {
  member: string;
  workload: number;
  fill: string;
  avatar?: string;
}

const chartData: Member[] = [
  {
    member: "John",
    workload: 5,
    fill: "hsl(var(--chart-1))",
    avatar: "https://example.com/john.jpg",
  },
  {
    member: "Jane",
    workload: 4,
    fill: "hsl(var(--chart-2))",
    avatar: "https://example.com/jane.jpg",
  },
  {
    member: "El",
    workload: 3,
    fill: "hsl(var(--chart-3))",
    avatar: "https://example.com/el.jpg",
  },
  {
    member: "David",
    workload: 2,
    fill: "hsl(var(--chart-4))",
    avatar: "https://example.com/david.jpg",
  },
  {
    member: "Unassigned",
    workload: 6,
    fill: "hsl(var(--chart-5))",
    // avatar: "https://github.com/shadcn.png",
  },
];

const chartConfig = {
  workload: { label: "Workload" },
  John: { label: "John", color: "hsl(var(--chart-1))" },
  Jane: { label: "Jane", color: "hsl(var(--chart-2))" },
  El: { label: "El", color: "hsl(var(--chart-3))" },
  David: { label: "David", color: "hsl(var(--chart-4))" },
  other: { label: "Other", color: "hsl(var(--chart-5))" },
} satisfies ChartConfig;

export default function MembersCard() {
  const [sortBy, setSortBy] = useState("workload");

  const sortedData = [...chartData].sort((a, b) =>
    sortBy === "workload"
      ? b.workload - a.workload
      : a.member.localeCompare(b.member)
  );

  const handleSort = (value: string) => {
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
          <Select onValueChange={handleSort} defaultValue="workload">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="workload">Sort by Workload</SelectItem>
              <SelectItem value="name">Sort by Name</SelectItem>
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
              dataKey="member"
              type="category"
              tickLine={false}
              axisLine={false}
              tick={<CustomYAxisTick />}
              // height={50}
              // width={80}
              // tick={{ fontSize: 12 }}
              minTickGap={2}
            />
            <XAxis dataKey="workload" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="workload"
              background={{ fill: "hsl(var(--bar-background))", radius: 10 }}
              layout="vertical"
              radius={10}
              barSize={20}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="justify-between">
        <div>
          Total Workload:{" "}
          {sortedData.reduce((sum, item) => sum + item.workload, 0)}
        </div>
        <div>
          Average:{" "}
          {(
            sortedData.reduce((sum, item) => sum + item.workload, 0) /
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
}: {
  x?: number;
  y?: number;
  payload?: { value: string };
}) => {
  const member = chartData.find((item) => item.member === payload?.value) || {
    member: "",
    avatar: "",
  };

  return (
    <g transform={`translate(${x},${y})`}>
      {/* <text x={-15} y={4} textAnchor="end" fill="#000000" fontSize={12}>
        {payload.value}
      </text> */}
      <foreignObject x={-100} y={-15} width={100} height={30}>
        <div className="flex justify-start items-center">
          <Avatar className="w-6 h-6">
            <AvatarImage src={member.avatar} alt={member.member} />
            <AvatarFallback>{member.member[0]}</AvatarFallback>
          </Avatar>
          <div className="ml-2 text-xs">{payload?.value}</div>
        </div>
      </foreignObject>
    </g>
  );
};
