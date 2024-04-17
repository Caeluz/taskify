import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";

import { IoIosSettings } from "react-icons/io";

const Navbar: React.FC = () => {
  return (
    <div className="flex justify-between items-center border">
      <Button>Toggle Sidebar</Button>
      <h2 className="text-3xl pr-72 font-semibold mb-4 text-[#3b82f6]">
        Taskify
      </h2>
      <div className="flex items-center p-4 pr-8 border-gray-300 rounded-lg">
        <div className="relative ml-auto">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
        {/* Name and Email */}
        <div className="ml-4 pr-20">
          <h4 className="text-lg font-semibold">User</h4>
          <p className="text-gray-600">user@gmail.com</p>
        </div>

        <Popover>
          <PopoverTrigger>
            <IoIosSettings className="text-3xl flex-shrink-0" />
          </PopoverTrigger>
          <PopoverContent>Place content for the popover here.</PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default Navbar;
