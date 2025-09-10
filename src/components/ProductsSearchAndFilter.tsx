"use client";

import { Input } from "@heroui/input";
import { Search } from "lucide-react";

interface ProductsSearchAndFilterProps {
  globalFilter: string;
  setGlobalFilter: (filter: string) => void;
  filteredRowCount: number;
  totalProductCount: number;
}

export const ProductsSearchAndFilter = ({
  globalFilter,
  setGlobalFilter,
  filteredRowCount,
  totalProductCount,
}: ProductsSearchAndFilterProps) => (
  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
    <div className="relative flex-1 max-w-sm">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black dark:text-white" />
      <Input
        placeholder="Buscar produtos..."
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
        className="pl-10 bg-white text-black dark:bg-background dark:text-white"
      />
    </div>
    <div className="text-sm text-gray-500">
      {filteredRowCount} de {totalProductCount} produtos
    </div>
  </div>
);
