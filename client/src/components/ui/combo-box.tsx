"use client";

import React, { useState, useRef, useEffect } from "react";
import { CaretSortIcon } from "@radix-ui/react-icons";
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
import { X } from "lucide-react";

// Update the Choice interface to allow value as number or string
interface Choice {
  value: string | number;
  label: string;
}

interface ComboBoxProps {
  choices: Choice[];
  className?: string;
  multiple?: boolean;
  value: string | number | undefined | (string | number | undefined)[];
  onChange: (
    value: string | number | undefined | (string | number | undefined)[]
  ) => void;
}

const ComboBox = React.forwardRef<HTMLButtonElement, ComboBoxProps>(
  ({ className, choices, multiple = false, value, onChange }, ref) => {
    const [open, setOpen] = useState(false);
    const [buttonWidth, setButtonWidth] = useState(0);
    const buttonRef = useRef<HTMLButtonElement>(null);

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

    const handleSelect = (selectedValue: string | number) => {
      if (multiple) {
        const newValue = Array.isArray(value) ? value : [];
        const updatedValue = newValue.includes(selectedValue)
          ? newValue.filter((v) => v !== selectedValue)
          : [...newValue, selectedValue];
        onChange(updatedValue);
      } else {
        onChange(selectedValue);
        setOpen(false);
      }
    };

    const handleClear = () => {
      onChange(multiple ? [] : "");
    };

    const getDisplayValue = () => {
      if (multiple && Array.isArray(value)) {
        return value
          .map(
            (v) =>
              choices.find((choice) => String(choice.value) === String(v))
                ?.label
          )
          .join(", ");
      } else if (
        !multiple &&
        (typeof value === "string" || typeof value === "number")
      ) {
        return (
          choices.find((choice) => String(choice.value) === String(value))
            ?.label || "Select..."
        );
      }
      // Else if value has a value before the choices are loaded
      else if (value) {
        return String(value);
      }
      return "Select...";
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
              {getDisplayValue()}
              {value && (
                <Button
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClear();
                  }}
                  className="ml-auto"
                >
                  <X />
                </Button>
              )}
              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className={`w-full ${className}`}
            align="end"
            style={{ width: buttonWidth }}
          >
            <Command>
              <CommandInput placeholder="Search..." />
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
                          checked={
                            Array.isArray(value) && value.includes(choice.value)
                          }
                          onChange={() => {}}
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
  }
);

ComboBox.displayName = "ComboBox";

export { ComboBox };
