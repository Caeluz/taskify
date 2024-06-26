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

interface ButtonProps {
  id: string;
  value: number | string;
  variant: "solid" | "outline";
}

export function Time({ className, selected, onSelect }: TimeProps) {
  const handleTimeSelect = React.useCallback(
    (time: { hour: number; minute: number; period: string }) => {
      onSelect?.(time);
    },
    [onSelect]
  );

  const handleTimeChange = React.useCallback(
    (type: keyof SelectedTime, value: number | string) => {
      handleTimeSelect({ ...selected, [type]: value } as SelectedTime);
    },
    [handleTimeSelect, selected]
  );

  const generateTimeOptions = React.useCallback(
    (type: string) => {
      let options = [];
      if (type === "hour") {
        for (let i = 1; i <= 12; i++) {
          options.push({
            id: `hour-${i}`,
            value: i,
            variant: selected?.hour === i ? "solid" : "outline",
          });
        }
      } else if (type === "minute") {
        for (let i = 0; i < 60; i += 5) {
          options.push({
            id: `minute-${i}`,
            value: i,
            variant: selected?.minute === i ? "solid" : "outline",
          });
        }
      } else {
        ["AM", "PM"].forEach((period) => {
          options.push({
            id: `period-${period}`,
            value: period,
            variant: selected?.period === period ? "solid" : "outline",
          });
        });
      }
      return options;
    },
    [selected]
  );

  const renderButton = React.useCallback(
    ({ id, value, variant }: ButtonProps) => (
      <div key={id}>
        <Button
          variant={variant}
          onClick={() =>
            handleTimeChange(id.split("-")[0] as keyof SelectedTime, value)
          }
          className="min-w-12"
        >
          {value}
        </Button>
      </div>
    ),
    [handleTimeChange]
  );

  const renderHour = React.useMemo(
    () => generateTimeOptions("hour").map(renderButton),
    [generateTimeOptions, renderButton]
  );
  const renderMinute = React.useMemo(
    () => generateTimeOptions("minute").map(renderButton),
    [generateTimeOptions, renderButton]
  );
  const renderSession = React.useMemo(
    () => generateTimeOptions("period").map(renderButton),
    [generateTimeOptions, renderButton]
  );

  return (
    <div
      className={cn(
        "p-3 h-48 border rounded-md grid grid-cols-3 gap-x-2",
        className
      )}
    >
      {/* Hours */}
      <ScrollArea className="flex flex-col items-center">
        {renderHour}
      </ScrollArea>
      {/* Minutes */}
      <ScrollArea className="flex flex-col items-center">
        {renderMinute}
      </ScrollArea>
      {/* AM/PM */}
      <ScrollArea className="flex flex-col items-center">
        {renderSession}
      </ScrollArea>
    </div>
  );
}
