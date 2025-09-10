"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { ProductListItem } from "@/lib/products/product.schema";
import { Button } from "@heroui/button";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { Tooltip } from "@heroui/tooltip";
import { ProductStatusBadge } from "./ProductStatusBadge";
import { ProductActionsDropdown } from "./ProductActionsDropdown";

const columnHelper = createColumnHelper<ProductListItem>();

export const columns = [
  columnHelper.accessor("thumbnail", {
    header: "",
    cell: (info) => {
      const thumbnail = info.getValue();
      const title = info.row.original.title;
      return (
        <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
          {thumbnail ? (
            <img
              src={thumbnail.url}
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
          onPress={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-8 px-2 lg:px-3 justify-start font-medium text-black dark:text-white"
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
          <div className="font-medium text-black dark:text-white">{product.title}</div>
          {product.description && (
            <div className="text-sm text-black dark:text-white max-w-xs truncate">
              {product.description}
            </div>
          )}
        </div>
      );
    },
    filterFn: "includesString",
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => <ProductStatusBadge status={info.getValue()} />,
  }),
  columnHelper.accessor("updatedAt", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onPress={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-8 px-2 lg:px-3 justify-start font-medium text-black dark:text-white"
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
          <span className="text-sm text-black dark:text-white">
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
    cell: (info) => <ProductActionsDropdown product={info.row.original} />,
    size: 50,
  }),
];
