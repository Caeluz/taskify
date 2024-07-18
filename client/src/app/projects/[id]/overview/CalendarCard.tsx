"use client";
import { useEffect, useState } from "react";
import {
  Card,
  CardTitle,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Smile } from "lucide-react";

interface Task {
  title: string;
  description: string;
}

interface Data {
  id: Number;
  date: string | number | Date;
  tasks: Task[];
}

const calendarData: Data[] = [
  {
    id: 1,
    date: "2024-07-17",
    tasks: [
      {
        title: "Initialize Project",
        description: "Create a new project",
      },
      {
        title: "Discuss Project",
        description: "Discuss the project with the team",
      },
    ],
  },
  {
    id: 2,
    date: "2024-07-18",
    tasks: [
      {
        title: "Web Design",
        description: "Create a new design for the website",
      },
    ],
  },
  {
    id: 3,
    date: "2024-07-19",
    tasks: [
      {
        title: "Database Design",
        description: "Design the database for the project",
      },
    ],
  },
];

const hasTasks = (date: Date, calendarData: Data[]) => {
  // Add one day from the date
  const adjustedDate = new Date(date);
  adjustedDate.setDate(date.getDate() + 1);

  const targetDate = adjustedDate.toISOString().split("T")[0];

  return calendarData.some(
    (entry) => new Date(entry.date).toISOString().split("T")[0] === targetDate
  );
};

export default function CalendarCard() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );

  // Filter tasks based on the selected date
  const filteredTasks =
    calendarData.find((task) => {
      const taskDate = new Date(task.date);
      const selectedDateWithoutTime = new Date(
        selectedDate?.getFullYear() ?? 0,
        selectedDate?.getMonth() ?? 0,
        selectedDate?.getDate() ?? 0
      );
      const taskDateWithoutTime = new Date(
        taskDate.getFullYear(),
        taskDate.getMonth(),
        taskDate.getDate()
      );
      return +taskDateWithoutTime === +selectedDateWithoutTime;
    })?.tasks || [];

  return (
    <Card className="h-full col-span-2 justify-end content-end rounded-none border-none shadow-none">
      <CardHeader className="items-center">
        <CardTitle>Calendar</CardTitle>
        <CardDescription>What is on that day? </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col">
        <Calendar
          mode="single"
          captionLayout="dropdown-buttons"
          selected={selectedDate}
          onSelect={setSelectedDate}
          fromYear={1960}
          toYear={2030}
          className="flex flex-col justify-center rounded-md border shadow"
          modifiers={{
            hasTasks: (date) => hasTasks(date, calendarData),
          }}
          modifiersClassNames={{
            hasTasks: "calendarTasks",
          }}
          classNames={{
            months:
              "flex w-full flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 flex-1",
            month: "space-y-4 w-full flex flex-col",
            // caption_label: "text-sm font-medium",
            table: "w-full h-full border-collapse space-y-1",
            head_row: "",
            row: "w-full mt-2",
          }}
        />
        <ScrollArea className="flex flex-col mt-4 h-80">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task, index) => (
              <TasksCard
                key={index}
                title={task.title}
                description={task.description}
              />
            ))
          ) : (
            <div className="text-center mt-4">
              <div className="flex justify-center">
                <Smile />
              </div>
              <p className="text-lg font-semibold text-primary mt-2">
                All caught up!
              </p>
              <p className="text-sm text-muted-foreground">
                Enjoy your free time.
              </p>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

function TasksCard({ title, description }: Task) {
  return (
    <Card className="my-4">
      <div className="flex items-center space-x-4 rounded-md border w-full h-full p-4">
        <div className="flex-1 space-y-1">
          <p className="text-sm font-semibold leading-none">{title}</p>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </Card>
  );
}
