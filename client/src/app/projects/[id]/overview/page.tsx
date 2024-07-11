import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";

import { Check } from "lucide-react";

import { StatsCardsContainer } from "./StatsCards";
import ProgressCard from "./ProgressCard";

export default function OverviewPage() {
  return (
    <div>
      <h1 className="pt-4 text-xl text-center">Welcome Back User</h1>
      <StatsCardsContainer />
      <div className="grid grid-cols-3 px-4">
        <ProgressCard />
      </div>
    </div>
  );
}
