import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shadcn/ui/card";
import { TrendingUp, TrendingDown, Users, ShoppingCart, DollarSign, Activity } from "lucide-react";

export function SummaryCards() {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8"
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.1 } },
      }}
    >
      <motion.div variants={cardVariants}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">R$ 45.231</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              <span className="hidden sm:inline">+20.1% em relação ao mês anterior</span>
              <span className="sm:hidden">+20.1%</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={cardVariants}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuários Ativos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">5.124</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              <span className="hidden sm:inline">+15.3% em relação ao mês anterior</span>
              <span className="sm:hidden">+15.3%</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={cardVariants}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pedidos</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">1.234</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
              <span className="hidden sm:inline">-2.5% em relação ao mês anterior</span>
              <span className="sm:hidden">-2.5%</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={cardVariants}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">3.2%</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              <span className="hidden sm:inline">+0.8% em relação ao mês anterior</span>
              <span className="sm:hidden">+0.8%</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}

