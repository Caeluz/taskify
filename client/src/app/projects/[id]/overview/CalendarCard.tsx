"use client";
import {
  Card,
  CardTitle,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function CalendarCard() {
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

        <ScrollArea className="flex flex-col mt-4 border h-72">
          <Card>
            <div className="flex items-center space-x-4 rounded-md border w-full h-full p-4">
              <div className="flex-1 space-y-1">
                <p className="text-sm font-semibold leading-none">Task 1</p>
                <p className="text-sm text-muted-foreground">Lorem Ipsum</p>
              </div>
            </div>
          </Card>
          <Card>
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
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
