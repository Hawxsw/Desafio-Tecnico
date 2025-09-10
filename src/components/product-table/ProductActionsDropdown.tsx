"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/button";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/dropdown";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "@heroui/modal";
import {
  Edit,
  Trash2,
  MoreVertical,
  Eye,
  Copy
} from "lucide-react";
import { toast } from "sonner";
import { useProductStore } from "@/stores/product.store";
import { ProductListItem } from "@/lib/products/product.schema";

export const ProductActionsDropdown = ({ product }: { product: ProductListItem }) => {
  const { deleteProduct } = useProductStore();
  const router = useRouter();
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

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
    (product: ProductListItem) => {
      toast.success("Produto duplicado com sucesso!");
    },
    []
  );

  const openDeleteModal = (id: string) => {
    setProductToDelete(id);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setProductToDelete(null);
    setDeleteModalOpen(false);
  };

  const confirmDeleteProduct = useCallback(async () => {
    if (productToDelete) {
      try {
        await deleteProduct(productToDelete);
        toast.success("Produto excluído com sucesso!");
      } catch (error) {
        toast.error("Falha ao excluir produto.");
      } finally {
        closeDeleteModal();
      }
    }
  }, [productToDelete, deleteProduct]);

  return (
    <>
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
        <DropdownMenu aria-label="Ações do produto" className="min-w-[160px] rounded-md border border-gray-200 bg-white shadow-md dark:border-white/10 dark:bg-background">
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
            onPress={() => openDeleteModal(product.id)}
          >
            Excluir
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <Modal
        isOpen={isDeleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        placement="center"
        backdrop="blur"
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
      >
        <ModalContent className="bg-white dark:bg-background text-black dark:text-white rounded-lg p-6 shadow-lg w-full max-w-md mx-auto">
          <ModalHeader className="text-lg font-bold mb-4 text-center text-black dark:text-white">Confirmar Exclusão</ModalHeader>
          <ModalBody>
            <p className="text-sm text-black dark:text-white mb-4 text-center">Tem certeza que deseja excluir este produto?</p>
          </ModalBody>
          <ModalFooter className="flex justify-end mt-4 space-x-2 text-center text-black dark:text-white">
            <Button variant="light" onPress={closeDeleteModal}>
              Não
            </Button>
            <Button onPress={confirmDeleteProduct} className="shadow-md rounded-md bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 ml-3 w-24">
              Sim
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
