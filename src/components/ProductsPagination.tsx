"use client";

import { Button } from "@heroui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useProductsTable } from "./useProductsTable";

interface ProductsPaginationProps {
  table: ReturnType<typeof useProductsTable>['table'];
}

export const ProductsPagination = ({ table }: ProductsPaginationProps) => (
  table.getPageCount() > 1 && (
    <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700">
            Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
          </span>
          <span className="text-sm text-gray-500">
            ({table.getFilteredRowModel().rows.length} resultados)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="bordered"
            size="sm"
            onPress={() => table.previousPage()}
            isDisabled={!table.getCanPreviousPage()}
            startContent={<ChevronLeft className="h-4 w-4" />}
          >
            Anterior
          </Button>
          <Button
            variant="bordered"
            size="sm"
            onPress={() => table.nextPage()}
            isDisabled={!table.getCanNextPage()}
            endContent={<ChevronRight className="h-4 w-4" />}
          >
            Próxima
          </Button>
        </div>
      </div>
    </div>
  )
);
