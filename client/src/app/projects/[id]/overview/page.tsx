import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";

import { Check } from "lucide-react";

export default function OverviewPage() {
  return (
    <div>
      <h1 className="pt-2 text-xl text-center">Hello World</h1>
      <div className="p-4 grid grid-cols-4 gap-x-4">
        <Card>
          {/* <CardContent className="flex flex-row justify-between items-center"> */}
          <div className=" flex items-center space-x-4 rounded-md border w-full h-full px-4">
            <Check />
            <div className="flex-1 space-y-1">
              <p className="text-sm font-bold leading-none">Completed</p>
              <p className="text-sm text-muted-foreground">
                7 tasks completed out of 10
              </p>
            </div>
          </div>
          {/* </CardContent> */}
        </Card>
        <Card>
          <CardContent>
            <CardHeader className="font-bold">IN PROGRESS</CardHeader>
            <CardDescription></CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <CardHeader className="font-bold">DONE</CardHeader>
            <CardDescription></CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <CardHeader>Hello World</CardHeader>
            <CardDescription></CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
