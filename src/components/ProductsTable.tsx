"use client";

import { flexRender } from "@tanstack/react-table";
import { PlusCircle } from "lucide-react";
import { Button } from "@heroui/button";
import { useProductsTable } from "./useProductsTable";

interface ProductsTableProps {
  table: ReturnType<typeof useProductsTable>['table'];
  isLoading: boolean;
  columnsLength: number;
  handleViewProduct: (id: string) => void;
  handleCreateProduct: () => void;
}

export const ProductsTable = ({
  table,
  isLoading,
  columnsLength,
  handleViewProduct,
  handleCreateProduct,
}: ProductsTableProps) => (
  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  style={{ width: header.getSize() !== 150 ? header.getSize() : undefined }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {isLoading ? (
            <tr>
              <td colSpan={columnsLength} className="px-6 py-12 text-center">
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
                <p className="mt-2 text-sm text-gray-500">Carregando produtos...</p>
              </td>
            </tr>
          ) : table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => handleViewProduct(row.original.id)}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-6 py-4 whitespace-nowrap"
                    onClick={(e) => {
                      if (cell.column.id === "actions") {
                        e.stopPropagation();
                      }
                    }}
                  >
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columnsLength} className="px-6 py-12 text-center">
                <div className="text-gray-400">
                  <PlusCircle className="mx-auto h-12 w-12 mb-4" />
                  <h3 className="text-sm font-medium text-gray-900 mb-1">
                    Nenhum produto encontrado
                  </h3>
                  <p className="text-sm text-gray-500">
                    Comece criando seu primeiro produto.
                  </p>
                  <Button
                    color="primary"
                    className="mt-4"
                    onPress={handleCreateProduct}
                  >
                    Criar Produto
                  </Button>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);
