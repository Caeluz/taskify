import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";

import { Check } from "lucide-react";

import { StatsCardsContainer } from "./StatsCards";
import ProgressCard from "./ProgressCard";
import MembersCard from "./MembersCard";
import CalendarCard from "./CalendarCard";

export default function OverviewPage() {
  return (
    <div className="flex flex-row justify-between">
      <div className="flex-grow">
        <h1 className="pt-4 pl-4 text-xl font-semibold">Project Name</h1>
        <div>
          <StatsCardsContainer />
          <div className="grid grid-cols-3 px-4 gap-x-4">
            <ProgressCard />
            <MembersCard />
          </div>
        </div>
      </div>
      <CalendarCard />
    </div>
  );
}
