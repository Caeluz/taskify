import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { truncateText } from "@/components/utility/truncate-text";

import { MessageSquareMore, Paperclip } from "lucide-react";

export default function TaskCard() {
  return (
    <Card className="mb-4">
      <CardHeader className="p-5 space-y-0">
        <div className="flex justify-start">
          <Badge
            className="text-black  justify-center mb-4  text-xs "
            variant="green"
          >
            Low
          </Badge>
        </div>
        <CardTitle className="text-left text-sm">
          Creating Index Products Endpoint
        </CardTitle>
        <CardDescription className="hidden">
          {truncateText(
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
            10
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-sm text-left hidden">
        May 23, 2024 - May 30, 2024
      </CardContent>
      <CardFooter className="flex flex-row justify-between p-3">
        <div className="flex flex-row space-x-2">
          <MessageSquareMore className="w-5" strokeWidth={1} />
          <Paperclip className="w-5" strokeWidth={1} />
        </div>

        <div className="flex flex-row space-x-[-12px] ">
          <Avatar className="whitespace-nowrap w-6 h-6">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <Avatar className="whitespace-nowrap w-6 h-6">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <Avatar className="whitespace-nowrap w-6 h-6">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
        </div>
      </CardFooter>
    </Card>
  );
}
