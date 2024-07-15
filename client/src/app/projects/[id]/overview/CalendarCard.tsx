"use client";
import {
  Card,
  CardTitle,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";

export default function CalendarCard() {
  return (
    <Card className="h-full col-span-2">
      <CardHeader className="items-center">
        <CardTitle>Calendar</CardTitle>
        <CardDescription>What is on that day? </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-row">
        <Calendar
          mode="single"
          captionLayout="dropdown-buttons"
          selected={new Date()}
          onSelect={(date) => console.log(date)}
          fromYear={1960}
          toYear={2030}
          className="flex flex-col justify-center rounded-md border shadow"
          classNames={{
            months:
              "flex w-full flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 flex-1",
            month: "space-y-4 w-full flex flex-col",
            // caption_label: "text-sm font-medium",
            table: "w-full h-full border-collapse space-y-1",
            head_row: "",
            row: "w-full mt-2",
            // day_selected: "bg-primary text-primary-foreground",
            cell: "text-center text-sm p-0 relative",
          }}
        />
        <div className="grid grid-rows-3 gap-y-4">
          <Card className="w-14">
            <CardHeader>
              <CardTitle>Test</CardTitle>
            </CardHeader>

            <CardContent>Test</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Test</CardTitle>
            </CardHeader>

            <CardContent>Test</CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
