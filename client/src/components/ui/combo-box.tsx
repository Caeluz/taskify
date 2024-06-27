"use client";

import React, { useState } from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const choices = [
  {
    value: "ACADEMIC",
    label: "Academic",
  },
  {
    value: "NON-ACADEMIC",
    label: "Non-Academic",
  },
];

interface Choice {
  value: string;
  label: string;
}

interface ComboBoxProps {
  choices: Choice[];
  className?: string;
}

const ComboBox = ({ className, choices }: ComboBoxProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  ``;

  return (
    <div className="w-full flex">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {value
              ? choices.find((choice) => choice.value === value)?.label
              : "Select..."}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className={`w-full ${className}`} align="end">
          <Command>
            <CommandInput
              // type="text"
              placeholder="Search..."
              className=" h-9 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
            />
            <CommandList>
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup className="py-1">
                {choices.map((choice) => (
                  <CommandItem
                    key={choice.value}
                    className={cn(
                      "flex items-center w-full justify-between px-3 py-2 text-left focus:outline-none"
                      // value === choice.value && "bg-blue-100"
                    )}
                    onSelect={() => {
                      setValue((currentValue) =>
                        currentValue === choice.value ? "" : choice.value
                      );
                      setOpen(false);
                    }}
                  >
                    {choice.label}
                    {value === choice.value && (
                      <CheckIcon className="h-4 w-4" />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export { ComboBox };
