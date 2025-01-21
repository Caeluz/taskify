"use client";
import { useState } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUserStore } from "@/store/zustand/userStore";

import { IoIosSettings } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { Moon, Sun } from "lucide-react";
import { useSidebarStore } from "@/store/zustand/sidebar";
import { logout } from "@/app/(public)/auth/logout/api/logout";

const Navbar: React.FC = () => {
  const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);
  const { setTheme } = useTheme();
  const router = useRouter();

  const { clearUser } = useUserStore();

  return (
    <div className="flex justify-between items-center border w-full">
      <Button
        className="lg:hidden bg-white ml-5 "
        size="icon"
        variant="ghost"
        onClick={toggleSidebar}
      >
        <GiHamburgerMenu className="text-[#3b82f6]" />
      </Button>
      <h2 className="text-3xl pl-5 font-semibold mb-4 text-[#3b82f6]">Test</h2>
      <div className="flex items-center p-4 pr-8 border-gray-300 rounded-lg ml-auto">
        <div className="relative">
          <Popover>
            <PopoverTrigger>
              {/* <IoIosSettings className="text-3xl flex-shrink-0" /> */}
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="flex flex-col">
              <Button
                onClick={() => {
                  // Temporary methods
                  // Remove cookie token
                  logout();

                  // Remove user persisted data
                  clearUser();

                  setTimeout(() => {
                    router.push("/auth/login");
                  }, 2000);
                }}
              >
                Logout
              </Button>
            </PopoverContent>
          </Popover>
        </div>
        {/* Name and Email */}
        <div className="ml-4 pr-4 hidden md:block lg:block">
          <h4 className="text-lg font-semibold">User</h4>
          <p className="text-gray-600">user@gmail.com</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Navbar;
