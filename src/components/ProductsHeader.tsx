"use client";

import { Button } from "@heroui/button";
import { PlusCircle } from "lucide-react";

interface ProductsHeaderProps {
  handleCreateProduct: () => void;
}

export const ProductsHeader = ({ handleCreateProduct }: ProductsHeaderProps) => (
  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Produtos</h1>
      <p className="text-sm text-gray-500">
        Gerencie seus produtos e visualize seu desempenho
      </p>
    </div>
    <Button
      color="primary"
      startContent={<PlusCircle className="h-4 w-4" />}
      onPress={handleCreateProduct}
    >
      Novo Produto
    </Button>
  </div>
);
