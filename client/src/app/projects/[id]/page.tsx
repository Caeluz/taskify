import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Settings, Users, ClipboardList, CirclePlus } from "lucide-react";

export default function showProject({ params }: { params: { id: number } }) {
  return (
    <div>
      <div className="flex flex-row justify-between space-x-4 p-6 text-[#3b82f6] font-medium">
        <div className="flex flex-row space-x-4">
          <div className="flex flex-row space-x-2">
            <ClipboardList />
            <div>Tasks</div>
          </div>
          <div className="flex flex-row space-x-2">
            <Users />
            <div>Members</div>
          </div>
          <div className="flex flex-row space-x-2">
            <Settings />
            <div>Settings</div>
          </div>
        </div>
        <Button className="bg-[#3b82f6] text-white ">
          <CirclePlus className="w-4 mr-2" />
          Add Column
        </Button>
      </div>

      <Separator className="bg-[#C4C4C4]" />
      <div className="p-6">
        <div className="border rounded-lg w-1/2 p-6">
          {/* Header */}
          <div>Pending 2</div>
          <Separator className="bg-[#C4C4C4]" />
          {/* Content */}
          <div className="p-4">
            <Card className="">
              <CardHeader>
                <Badge className="bg-[#31ff45] text-black w-1/12 rounded-xl text-center">
                  Low
                </Badge>
                <CardTitle>Card Title</CardTitle>
                <CardDescription className="">Card Description</CardDescription>
              </CardHeader>
              <CardFooter className="flex flex-row space-x-4">
                <div className="whitespace-nowrap">7 members</div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
