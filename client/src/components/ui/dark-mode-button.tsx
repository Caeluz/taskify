"use client";
import { useTheme } from "next-themes";
import { Button } from "./button";
import { Moon, Sun } from "lucide-react";

export function DarkModeButton() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="w-16 h-16 flex items-center justify-center text-white bg-black rounded-full absolute bottom-8 right-10 z-50"
    >
      {isDark ? <Sun /> : <Moon />}
    </Button>
  );
}
