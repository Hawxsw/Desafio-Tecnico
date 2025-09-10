"use client";

import { DashboardHeader } from "./dashboard-header";
import { SummaryCards } from "./summary-cards";
import { SalesChart } from "./sales-chart";
import { UserGrowthChart } from "./user-growth-chart";
import { CategorySalesChart } from "./category-sales-chart";
import { WeeklyRevenueChart } from "./weekly-revenue-chart";

export default function Home() {
  return (
    <div className="bg-background">
      <DashboardHeader />
      <SummaryCards />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <SalesChart />
        <UserGrowthChart />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
        <div className="xl:col-span-1">
          <CategorySalesChart />
        </div>
        <div className="xl:col-span-2">
          <WeeklyRevenueChart />
        </div>
      </div>
    </div>
  );
}