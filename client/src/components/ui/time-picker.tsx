"use client";
import * as React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Time } from "./time";
import { cn } from "@/lib/utils";
import { TimerIcon } from "lucide-react";
// import { format } from "time-fns";

interface time {
  hour: number;
  minute: number;
  period: string;
}

export function TimePicker() {
  const [selectedTime, setSelectedTime] = React.useState({
    hour: 1,
    minute: 0,
    period: "AM",
  });

  // Simple function to format the selected time
  const formatTime = ({ hour, minute, period }: time) =>
    `${hour}:${minute.toString().padStart(2, "0")} ${period}`;

  return (
    <Popover modal={true}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-[240px] justify-start text-left font-normal"
            // !date && "text-muted-foreground"
          )}
        >
          <TimerIcon className="mr-2 h-4 w-4" />
          {/* {time ? "000" : <span>Pick a time</span>} */}
          <span>{formatTime(selectedTime)}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 " align="start">
        <Time
          selected={selectedTime}
          onSelect={setSelectedTime}
          className="w-auto"
        />
      </PopoverContent>
    </Popover>
  );
}
