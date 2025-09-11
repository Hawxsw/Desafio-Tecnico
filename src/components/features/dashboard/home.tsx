"use client";

import { motion } from "framer-motion";
import { DashboardHeader } from "./dashboard-header";
import { SummaryCards } from "./summary-cards";
import { SalesChart } from "./sales-chart";
import { UserGrowthChart } from "./user-growth-chart";
import { CategorySalesChart } from "./category-sales-chart";
import { WeeklyRevenueChart } from "./weekly-revenue-chart";

export default function Home() {
  return (
    <motion.div
      className="bg-background min-h-screen p-4 sm:p-6 lg:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <DashboardHeader title="Dashboard de Métricas" description="Acompanhe o desempenho do seu negócio em tempo real" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <SummaryCards />
      </motion.div>

      <motion.div
        className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <SalesChart />
        <UserGrowthChart />
      </motion.div>

      <motion.div
        className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="xl:col-span-1">
          <CategorySalesChart />
        </div>
        <div className="xl:col-span-2">
          <WeeklyRevenueChart />
        </div>
      </motion.div>
    </motion.div>
  );
}