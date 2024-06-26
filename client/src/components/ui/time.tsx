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
  period: "AM" | "PM";
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
    const newTime = { ...selected, [type]: value };
    handleTimeSelect(newTime);
  };

  const generateTimeOptions = (type: string) => {
    let options = [];
    if (type === "hour") {
      for (let i = 1; i <= 12; i++) {
        options.push(
          <div key={`hour-${i}`}>
            <Button
              variant={selected?.hour === i ? "solid" : "outline"}
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
              variant={selected?.minute === i ? "solid" : "outline"}
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
              variant={selected?.period === period ? "solid" : "outline"}
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
        "p-3 h-48 border rounded-md grid grid-cols-3 gap-x-2",
        className
      )}
    >
      {/* Hours */}
      <ScrollArea className="flex flex-col items-center">
        {/* {generateTimeOptions("hour")} */}
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
      </ScrollArea>
      {/* Minutes */}
      <ScrollArea className="flex flex-col items-center">
        {generateTimeOptions("minute")}
      </ScrollArea>
      {/* AM/PM */}
      <ScrollArea className="flex flex-col items-center">
        {generateTimeOptions("period")}
      </ScrollArea>
    </div>
  );
}
