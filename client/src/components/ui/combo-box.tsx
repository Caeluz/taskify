"use client";

import React, { useState, useRef, useEffect } from "react";
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
  multiple?: boolean;
}

const ComboBox = ({ className, choices, multiple = false }: ComboBoxProps) => {
  const [open, setOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  // For the PopoverContent to be the same width as the button
  const [buttonWidth, setButtonWidth] = useState(0);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Prod?
  // Use this later
  // useEffect(() => {
  //   if (buttonRef.current) {
  //     setButtonWidth(buttonRef.current.offsetWidth);
  //   }
  // }, []);

  // Dev
  // Dynamically adjusts its width whenever the button's width changes
  useEffect(() => {
    const updateButtonWidth = () => {
      if (buttonRef.current) {
        setButtonWidth(buttonRef.current.offsetWidth);
      }
    };

    updateButtonWidth();

    const resizeObserver = new ResizeObserver(updateButtonWidth);
    if (buttonRef.current) {
      resizeObserver.observe(buttonRef.current);
    }

    return () => {
      const currentButtonRef = buttonRef.current;
      if (currentButtonRef) {
        resizeObserver.unobserve(currentButtonRef);
      }
    };
  }, []);

  const handleSelect = (value: string) => {
    if (multiple) {
      setSelectedValues((prevSelectedValues) =>
        prevSelectedValues.includes(value)
          ? prevSelectedValues.filter((v) => v !== value)
          : [...prevSelectedValues, value]
      );
    } else {
      setSelectedValues([value]);
      setOpen(false);
    }
  };

  return (
    <div className="w-full flex">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={buttonRef}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={`w-full justify-between ${className}`}
          >
            {selectedValues.length > 0
              ? selectedValues
                  .map(
                    (value) =>
                      choices.find((choice) => choice.value === value)?.label
                  )
                  .join(", ")
              : "Select..."}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className={`w-full ${className}`}
          align="end"
          style={{ width: buttonWidth }}
        >
          <Command>
            <CommandInput
              // type="text"
              placeholder="Search..."
              className=" h-9 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
            />
            <CommandList>
              <CommandEmpty>Not found.</CommandEmpty>
              <CommandGroup className="py-1">
                {choices.map((choice) => (
                  <CommandItem
                    key={choice.value}
                    className="flex items-center w-full justify-between px-3 py-2 text-left focus:outline-none"
                    onSelect={() => handleSelect(choice.value)}
                  >
                    {multiple && (
                      <input
                        type="checkbox"
                        checked={selectedValues.includes(choice.value)}
                        onChange={() => handleSelect(choice.value)}
                        className="mr-2"
                      />
                    )}
                    {choice.label}
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
