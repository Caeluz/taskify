"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Pencil, X, Check } from "lucide-react";
import { ButtonIconProps } from "./page";
import { Label } from "@/components/ui/label";

interface ProjectInformationSectionProps {
  ButtonIcon: React.ComponentType<ButtonIconProps>;
}

export default function ProjectInformationSection({
  ButtonIcon,
}: ProjectInformationSectionProps) {
  const [editTitle, setEditTitle] = useState(false);

  return (
    <div>
      <h1 className="text-xl my-2 mb-7">Project Information</h1>
      <h1 className="text-base font-semibold flex flex-row gap-4 items-center">
        <span className="space-y-2">
          <Label htmlFor="projectTitle" className="text-base font-semibold">
            Project Title
          </Label>
          <Input
            id="projectTitle"
            placeholder="Project Title"
            className={editTitle ? "border-none" : ""}
            disabled={!editTitle}
          />
        </span>

        {editTitle ? (
          <div className="flex flex-row gap-x-2">
            <ButtonIcon
              icon={<X />}
              onClick={() => {
                setEditTitle(false);
              }}
            />
            <ButtonIcon
              icon={<Check />}
              onClick={() => {
                setEditTitle(false);
              }}
            />
          </div>
        ) : (
          <ButtonIcon
            icon={<Pencil />}
            onClick={() => {
              setEditTitle(true);
            }}
          />
        )}
      </h1>
    </div>
  );
}
