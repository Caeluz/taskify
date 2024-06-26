import * as React from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "./button";

export interface TimeProps {
  className?: string;
  selected?: {
    hour: number;
    minute: number;
    period: string;
  };
  onSelect?: (time: { hour: number; minute: number; period: string }) => void;
}

interface SelectedTime {
  hour: number;
  minute: number;
  period: string | "AM" | "PM";
}

export function Time({ className, selected, onSelect }: TimeProps) {
  const handleTimeSelect = (time: {
    hour: number;
    minute: number;
    period: string;
  }) => {
    if (onSelect) {
      // setInternalSelectedTime(time);
      onSelect(time);
    } else {
    }
  };

  const handleTimeChange = (type: string, value: number | string) => {
    // Provide default values for hour, minute, and period
    const newTime: SelectedTime = {
      hour: selected?.hour || 12, // Default to 12 if hour is undefined
      minute: selected?.minute || 0, // Default to 0 if minute is undefined
      period: selected?.period || "AM", // Default to "AM" if period is undefined
      [type]: value,
    };
    handleTimeSelect(newTime);
  };

  const generateTimeOptions = (type: string) => {
    let options = [];
    if (type === "hour") {
      for (let i = 1; i <= 12; i++) {
        options.push(
          <div key={`hour-${i}`}>
            <Button
              variant={selected?.hour === i ? "default" : "outline"}
              onClick={() => handleTimeChange("hour", i)}
              className="min-w-12"
            >
              {i}
            </Button>
          </div>
        );
      }
    } else if (type === "minute") {
      for (let i = 0; i < 60; i += 5) {
        options.push(
          <div key={`minute-${i}`} className="w-full">
            <Button
              variant={selected?.minute === i ? "default" : "outline"}
              onClick={() => handleTimeChange("minute", i)}
              className="min-w-12"
            >
              {i}
            </Button>
          </div>
        );
      }
    } else {
      ["AM", "PM"].forEach((period) => {
        options.push(
          <div key={`period-${period}`}>
            <Button
              variant={selected?.period === period ? "default" : "outline"}
              // variant=""
              onClick={() => handleTimeChange("period", period)}
              className="min-w-12"
            >
              {period}
            </Button>
          </div>
        );
      });
    }
    return options;
  };

  return (
    <div
      className={cn(
        "p-2 h-48 w-full border rounded-md grid grid-cols-3 gap-x-1",
        className
      )}
    >
      {/* Hours */}
      <ScrollArea className="flex flex-col mx-2 items-center w-full">
        {generateTimeOptions("hour")}
      </ScrollArea>
      {/* Minutes */}
      <ScrollArea className="flex flex-col mx-2 items-center w-full">
        {generateTimeOptions("minute")}
      </ScrollArea>
      {/* AM/PM */}
      <ScrollArea className="flex flex-col mx-2 items-center w-full">
        {generateTimeOptions("period")}
      </ScrollArea>
    </div>
  );
}
