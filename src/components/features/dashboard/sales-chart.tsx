import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/shadcn/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/shadcn/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { salesData } from "@/lib/dashboard/dashboard-data";

export function SalesChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Vendas e Lucro Mensal</CardTitle>
          <CardDescription>Comparativo de vendas, lucro e gastos nos últimos 6 meses</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              vendas: {
                label: "Vendas",
                color: "hsl(var(--chart-1))",
              },
              lucro: {
                label: "Lucro",
                color: "hsl(var(--chart-2))",
              },
              gastos: {
                label: "Gastos",
                color: "hsl(var(--chart-3))",
              },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="vendas" fill="var(--color-vendas)" />
                <Bar dataKey="lucro" fill="var(--color-lucro)" />
                <Bar dataKey="gastos" fill="var(--color-gastos)" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
}


