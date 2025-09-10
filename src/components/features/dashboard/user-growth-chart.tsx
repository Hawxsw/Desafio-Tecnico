import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/shadcn/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/shadcn/ui/chart";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { userGrowthData } from "@/lib/dashboard/dashboard-data";

export function UserGrowthChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Crescimento de Usuários</CardTitle>
        <CardDescription>Evolução do número de usuários ativos nos últimos 6 meses</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            usuarios: {
              label: "Usuários",
              color: "hsl(var(--chart-1))",
            },
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="usuarios"
                stroke="var(--color-usuarios)"
                fill="var(--color-usuarios)"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
