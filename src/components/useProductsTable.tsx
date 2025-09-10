"use client";

import { useCallback, useMemo, useState } from "react";
import { useProductStore } from "@/stores/product.store";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/button";
import { Badge } from "@heroui/badge";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/dropdown";
import { Tooltip } from "@heroui/tooltip";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  ColumnFiltersState,
  SortingState,
  PaginationState,
} from "@tanstack/react-table";
import {
  Edit,
  PlusCircle,
  Trash2,
  MoreVertical,
  Search,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Eye,
  Copy
} from "lucide-react";
import { toast } from "sonner";
import { IProduct } from "@/lib/types/product";

const columnHelper = createColumnHelper<IProduct>();

const StatusBadge = ({ status }: { status?: string }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "success";
      case "inactive":
        return "danger";
      case "draft":
        return "warning";
      default:
        return "default";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Ativo";
      case "inactive":
        return "Inativo";
      case "draft":
        return "Rascunho";
      default:
        return "Desconhecido";
    }
  };

  return (
    <Badge color={getStatusColor(status || "default")} variant="flat">
      {getStatusText(status || "default")}
    </Badge>
  );
};

const ActionsDropdown = ({ product }: { product: IProduct }) => {
  const { deleteProduct } = useProductStore();
  const router = useRouter();

  const handleEditProduct = useCallback(
    (id: string) => {
      router.push(`/dashboard/products/${id}`);
    },
    [router]
  );

  const handleViewProduct = useCallback(
    (id: string) => {
      router.push(`/dashboard/products/${id}`);
    },
    [router]
  );

  const handleDuplicateProduct = useCallback(
    (product: IProduct) => {
      toast.success("Produto duplicado com sucesso!");
    },
    []
  );

  const handleDeleteProduct = useCallback(
    async (id: string) => {
      if (confirm("Tem certeza que deseja excluir este produto?")) {
        try {
          await deleteProduct(id);
          toast.success("Produto excluído com sucesso!");
        } catch (error) {
          toast.error("Falha ao excluir produto.");
        }
      }
    },
    [deleteProduct]
  );

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          variant="light"
          size="sm"
          isIconOnly
        >
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Ações do produto">
        <DropdownItem
          key="view"
          startContent={<Eye className="h-4 w-4" />}
          onPress={() => handleViewProduct(product.id)}
        >
          Visualizar
        </DropdownItem>
        <DropdownItem
          key="edit"
          startContent={<Edit className="h-4 w-4" />}
          onPress={() => handleEditProduct(product.id)}
        >
          Editar
        </DropdownItem>
        <DropdownItem
          key="duplicate"
          startContent={<Copy className="h-4 w-4" />}
          onPress={() => handleDuplicateProduct(product)}
        >
          Duplicar
        </DropdownItem>
        <DropdownItem
          key="delete"
          color="danger"
          startContent={<Trash2 className="h-4 w-4" />}
          onPress={() => handleDeleteProduct(product.id)}
        >
          Excluir
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export const useProductsTable = (products: IProduct[]) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [globalFilter, setGlobalFilter] = useState("");

  const columns = useMemo(() => [
    columnHelper.accessor("thumbnail", {
      header: "",
      cell: (info) => {
        const thumbnail = info.getValue();
        const title = info.row.original.title;
        return (
          <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
            {thumbnail ? (
              <img
                src={thumbnail as string}
                alt={title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <span className="text-xs text-gray-500 font-medium">
                  {title.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>
        );
      },
      enableSorting: false,
      size: 60,
    }),
    columnHelper.accessor("title", {
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-8 px-2 lg:px-3 justify-start font-medium"
          >
            Produto
            {column.getIsSorted() === "desc" ? (
              <ArrowDown className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === "asc" ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : (
              <ArrowUpDown className="ml-2 h-4 w-4" />
            )}
          </Button>
        );
      },
      cell: (info) => {
        const product = info.row.original;
        return (
          <div className="space-y-1">
            <div className="font-medium text-gray-900">{product.title}</div>
            {product.description && (
              <div className="text-sm text-gray-500 max-w-xs truncate">
                {product.description}
              </div>
            )}
          </div>
        );
      },
      filterFn: "includesString",
    }),
    columnHelper.accessor("updatedAt", {
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-8 px-2 lg:px-3 justify-start font-medium"
          >
            Atualizado em
            {column.getIsSorted() === "desc" ? (
              <ArrowDown className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === "asc" ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : (
              <ArrowUpDown className="ml-2 h-4 w-4" />
            )}
          </Button>
        );
      },
      cell: (info) => {
        const date = info.getValue();
        return date ? (
          <Tooltip content={new Date(date).toLocaleString("pt-BR")}>
            <span className="text-sm text-gray-500">
              {new Intl.RelativeTimeFormat("pt-BR").format(
                Math.floor((new Date(date).getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
                "day"
              )}
            </span>
          </Tooltip>
        ) : (
          <span className="text-gray-400">-</span>
        );
      },
    }),
    columnHelper.display({
      id: "actions",
      header: "",
      cell: (info) => <ActionsDropdown product={info.row.original} />,
      size: 50,
    }),
  ], []);

  const table = useReactTable({
    data: products,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "includesString",
    state: {
      sorting,
      columnFilters,
      pagination,
      globalFilter,
    },
  });

  return {
    table,
    globalFilter,
    setGlobalFilter,
  };
};
