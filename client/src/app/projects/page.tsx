import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

import Link from "next/link";

export default function Project() {
  return (
    <div>
      <div>
        <h1 className="p-6">6 Projects</h1>
      </div>
      <div className="grid grid-rows-3 grid-flow-col gap-4 p-7">
        {Array.from({ length: 9 }).map((_, index) => (
          <Link href={`/projects/${index}`} key={index}>
            <Card className="hover:bg-[#3b82f6] hover:text-white">
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription className="">Card Description</CardDescription>
              </CardHeader>
              <CardFooter className="flex flex-row space-x-4">
                <Progress className="" value={33} />
                <div className="whitespace-nowrap">7 members</div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
