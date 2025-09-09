import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/shadcn/ui/chart";
import { Badge } from "@/components/shadcn/ui/badge";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { categoryData } from "@/data/dashboard-data";

export function CategorySalesChart() {
  return (
    <Card className="w-full">
      <CardHeader className="pb-3 sm:pb-6">
        <CardTitle className="text-lg sm:text-xl">Vendas por Categoria</CardTitle>
        <CardDescription className="text-sm">
          Distribuição percentual das vendas por categoria de produto
        </CardDescription>
      </CardHeader>
      <CardContent className="p-3 sm:p-6 pt-0">
        <ChartContainer
          config={{
            eletrônicos: {
              label: "Eletrônicos",
              color: "hsl(var(--chart-1))",
            },
            roupas: {
              label: "Roupas",
              color: "hsl(var(--chart-2))",
            },
            casa: {
              label: "Casa",
              color: "hsl(var(--chart-3))",
            },
            esportes: {
              label: "Esportes",
              color: "hsl(var(--chart-4))",
            },
            outros: {
              label: "Outros",
              color: "hsl(var(--chart-5))",
            },
          }}
          className="h-[200px] sm:h-[250px] lg:h-[300px] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={30}
                outerRadius={70}
                paddingAngle={3}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <ChartTooltip 
                content={<ChartTooltipContent />}
                wrapperStyle={{ fontSize: '14px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
        <div className="mt-4 space-y-2">
          {categoryData.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between text-xs sm:text-sm"
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="truncate">{item.name}</span>
              </div>
              <Badge variant="secondary" className="text-xs">{item.value}%</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
