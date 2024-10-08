"use client";
import { TrendingUp } from "lucide-react";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { useProjectOverviewData } from "@/components/utility/ProjectDashboardDataContext";

const chartConfig = {
  value: {
    label: "Value",
    color: "hsl(var(--chart-2))",
  },
  progress: {
    label: "Progress",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function ProgressCard() {
  const { projectOverview } = useProjectOverviewData();

  console.log(projectOverview?.projectProgress);

  const progress = projectOverview?.projectProgress || 0;

  const chartData = [
    { name: "progress", value: progress, fill: "var(--color-progress)" },
  ];

  const formattedDate = new Intl.DateTimeFormat("en-us", {
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <Card className="flex flex-col col-span-1">
      <CardHeader className="items-center pb-0">
        <CardTitle>Project Progress</CardTitle>
        {/* <CardDescription>January - June 2024</CardDescription> */}
        {/* Date first created to now */}
        <CardDescription>January 2024 - {formattedDate}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={0}
            endAngle={chartData[0].value * 3.6}
            innerRadius={80}
            outerRadius={110}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="false"
              className="first:fill-muted last:fill-background"
              polarRadius={[86, 74]}
            />
            <RadialBar dataKey="value" background cornerRadius={10} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-4xl font-bold"
                        >
                          {chartData[0].value.toLocaleString()} %
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 26}
                          className="fill-muted-foreground"
                        >
                          Completed
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Growth 5.2 % <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Since last month
        </div>
      </CardFooter>
    </Card>
  );
}
