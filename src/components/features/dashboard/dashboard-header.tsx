import { motion } from "framer-motion";
import { Button } from "@heroui/button";
import { Calendar, Filter } from "lucide-react";

interface DashboardHeaderProps {
  title: string;
  description: string;
}

export function DashboardHeader({ title, description }: DashboardHeaderProps) {
  return (
    <motion.div
      className="mb-6 sm:mb-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground text-balance">{title}</h1>
          <p className="text-sm sm:text-base text-muted-foreground text-pretty">{description}</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <Button variant="solid" size="sm" className="w-full sm:w-auto">
            <Calendar className="h-4 w-4 mr-2" />
            <span className="hidden xs:inline">Últimos 30 dias</span>
            <span className="xs:hidden">30 dias</span>
          </Button>
          <Button variant="solid" size="sm" className="w-full sm:w-auto">
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
