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
    <div>
      <h1 className="pt-4 text-xl text-center">Welcome Back User</h1>
      <StatsCardsContainer />
      <div className="grid grid-cols-4 px-4 gap-x-4">
        <ProgressCard />
        <MembersCard />
        <CalendarCard />
      </div>
    </div>
  );
}
