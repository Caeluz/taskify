"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Pencil, X, Check, Save } from "lucide-react";
import { ButtonIconProps } from "./page";
import { Label } from "@/components/ui/label";
import { DatePickerWithRange } from "@/components/ui/date-picker-range";

interface ProjectInformationSectionProps {
  ButtonIcon: React.ComponentType<ButtonIconProps>;
}

export default function ProjectInformationSection({
  ButtonIcon,
}: ProjectInformationSectionProps) {
  return (
    <div className="">
      <h1 className="text-xl my-2 mb-7">Project Information</h1>
      <div className="flex flex-row gap-x-10">
        <div className="text-base font-semibold flex flex-row gap-4 items-end">
          <span className="space-y-2">
            <Label htmlFor="projectTitle" className="text-base font-semibold">
              Project Title
            </Label>
            <Input
              id="projectTitle"
              placeholder="Project Title"
              // className={editTitle ? "" : ""}
              // disabled={!editTitle}
            />
          </span>
          <div>
            <ButtonIcon
              icon={<Save />}
              onClick={() => {
                console.log("title saved...");
              }}
            />
          </div>
        </div>
        <div>
          <span className="space-y-2">
            <Label
              htmlFor="projectedFinish"
              className="text-base font-semibold"
            >
              Projected Finish Date
            </Label>
            <DatePickerWithRange />
          </span>
        </div>
      </div>
    </div>
  );
}
