"use client";

import { useEffect, useCallback } from "react";
import { useProductStore } from "@/stores/product.store";
import { useRouter } from "next/navigation";
import { PlusCircle } from "lucide-react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { flexRender } from "@tanstack/react-table";
import { useProductsTable } from "@/components/useProductsTable";

interface ProductsHeaderProps {
  handleCreateProduct: () => void;
}

const ProductsHeader = ({ handleCreateProduct }: ProductsHeaderProps) => (
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
      className="rounded-xl shadow-md w-[10rem] text-white hover:bg-primary/90 focus:bg-primary/90 active:bg-primary/80"
    >
      Novo Produto
    </Button>
  </div>
);

interface ProductsSearchAndFilterProps {
  globalFilter: string;
  setGlobalFilter: (filter: string) => void;
  filteredRowCount: number;
  totalProductCount: number;
}

const ProductsSearchAndFilter = ({
  globalFilter,
  setGlobalFilter,
  filteredRowCount,
  totalProductCount,
}: ProductsSearchAndFilterProps) => (
  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
    <div className="relative flex-1 max-w-sm">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
      <Input
        placeholder="Buscar produtos..."
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
        className="pl-10"
      />
    </div>
    <div className="text-sm text-gray-500">
      {filteredRowCount} de {totalProductCount} produtos
    </div>
  </div>
);

interface ProductsTableProps {
  table: ReturnType<typeof useProductsTable>['table'];
  isLoading: boolean;
  columnsLength: number;
  handleViewProduct: (id: string) => void;
  handleCreateProduct: () => void;
}

const ProductsTable = ({
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

interface ProductsPaginationProps {
  table: ReturnType<typeof useProductsTable>['table'];
}

const ProductsPagination = ({ table }: ProductsPaginationProps) => (
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

export const Products = () => {
  const router = useRouter();
  const { products, status, fetchAllProducts } = useProductStore();
  const isLoading = status === "loading";

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  const handleCreateProduct = useCallback(() => {
    router.push("/dashboard/products/new");
  }, [router]);

  const handleViewProduct = useCallback(
    (id: string) => {
      router.push(`/dashboard/products/${id}`);
    },
    [router]
  );

  const { table, globalFilter, setGlobalFilter } = useProductsTable(products);

  return (
    <div className="space-y-6 p-6">
      <ProductsHeader handleCreateProduct={handleCreateProduct} />
      <ProductsSearchAndFilter
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        filteredRowCount={table.getFilteredRowModel().rows.length}
        totalProductCount={products.length}
      />
      <ProductsTable
        table={table}
        isLoading={isLoading}
        columnsLength={table.getAllColumns().length}
        handleViewProduct={handleViewProduct}
        handleCreateProduct={handleCreateProduct}
      />
      <ProductsPagination table={table} />
    </div>
  );
};