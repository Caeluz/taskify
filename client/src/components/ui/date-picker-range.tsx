"use client";

import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cva, VariantProps } from "class-variance-authority";

export interface DatePickerWithRangeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  dateToday?: boolean;
  dateValue?: DateRange;
  onDateSelect?: (range: { from: Date; to: Date }) => void;
}

//

export const DatePickerWithRange: React.FC<DatePickerWithRangeProps> = ({
  className,
  dateToday,
  dateValue,
  onDateSelect,
}) => {
  // const [date, setDate] = React.useState<DateRange | undefined>(
  //   value || {
  //     from: dateToday ? new Date() : undefined,
  //     to: undefined,
  //   }
  // );

  // Set the date to the value passed in
  const [date, setDate] = React.useState<DateRange | undefined>(
    dateValue || {
      from: dateToday ? new Date() : undefined,
      to: undefined,
    }
  );

  const handleDateSelect = (range: DateRange | undefined) => {
    setDate(range);
    if (onDateSelect) {
      onDateSelect({
        from: range?.from || new Date(),
        to: range?.to || new Date(),
      });
      setDate(range);
    }
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            captionLayout="dropdown-buttons"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleDateSelect}
            numberOfMonths={2}
            fromYear={1960}
            toYear={new Date().getFullYear() + 5}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
