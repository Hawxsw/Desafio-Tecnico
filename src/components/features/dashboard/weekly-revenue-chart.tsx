import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/shadcn/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/shadcn/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { revenueData } from "@/lib/dashboard/dashboard-data";

export function WeeklyRevenueChart() {
  return (
    <Card className="w-full">
      <CardHeader className="pb-3 sm:pb-6">
        <CardTitle className="text-lg sm:text-xl">Receita Semanal</CardTitle>
        <CardDescription className="text-sm">Receita diária da semana atual</CardDescription>
      </CardHeader>
      <CardContent className="p-3 sm:p-6 pt-0">
        <ChartContainer
          config={{
            receita: {
              label: "Receita",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="h-[200px] sm:h-[250px] lg:h-[300px] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart 
              data={revenueData}
              margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="day" 
                tick={{ fontSize: 12 }}
                tickLine={{ stroke: '#666' }}
                axisLine={{ stroke: '#666' }}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                tickLine={{ stroke: '#666' }}
                axisLine={{ stroke: '#666' }}
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
              />
              <ChartTooltip 
                content={<ChartTooltipContent />}
                wrapperStyle={{ fontSize: '14px' }}
              />
              <Line
                type="monotone"
                dataKey="receita"
                stroke="var(--color-receita)"
                strokeWidth={2}
                dot={{ fill: "var(--color-receita)", strokeWidth: 2, r: 3 }}
                activeDot={{ r: 5, stroke: "var(--color-receita)", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
