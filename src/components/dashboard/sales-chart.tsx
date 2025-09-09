import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/shadcn/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/shadcn/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { salesData } from "@/data/dashboard-data";

export function SalesChart() {
  return (
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
  );
}
