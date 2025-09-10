"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

import { useProductStore } from "@/stores/product.store";
import {
  ProductCreationSchema,
  ProductUpdateSchema,
  ProductCreation,
  ProductUpdate,
} from "@/lib/products/product.schema";

import { useRouter, useParams } from "next/navigation";
import { Input, Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { motion } from "framer-motion";

export const ProductDetails = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const isNew = id === "new";

  const {
    createProduct,
    updateProduct,
    deleteProduct,
    fetchProductById,
    currentProduct,
    status,
  } = useProductStore();

  const isLoading = status === "loading";

  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  type ProductUpdateWithThumbnail = ProductUpdate & { thumbnail?: File | undefined };

  const form = useForm<
    typeof isNew extends true ? ProductCreation : ProductUpdateWithThumbnail
  >({
    resolver: zodResolver(isNew ? ProductCreationSchema : ProductUpdateSchema),
    defaultValues: isNew
      ? {
          title: "",
          description: "",
        }
      : {
          title: "",
          description: "",
        },
  });

  const handleThumbnailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result as string);
        form.setValue("thumbnail", file);
      };
      reader.readAsDataURL(file);
    } else {
      setThumbnailPreview(null);
      form.setValue("thumbnail", undefined);
    }
  };

  useEffect(() => {
    if (id && !isNew) {
      fetchProductById(id);
    }
  }, [fetchProductById, id, isNew]);

  useEffect(() => {
    if (currentProduct && !isNew) {
      form.setValue("title", currentProduct.title);
      form.setValue("description", currentProduct.description);
      if (currentProduct.thumbnail) {
        setThumbnailPreview(currentProduct.thumbnail.url);
      }
    }
  }, [currentProduct, isNew, form.setValue]);

  const handleSubmitProduct = useCallback(
    async (data: typeof isNew extends true ? ProductCreation : ProductUpdate) => {
      try {
        if (isNew) {
          const newProduct = await createProduct(data as ProductCreation);
          toast.success("Produto criado com sucesso!");
          router.push("/dashboard/products");
        } else if (id) {
          const updateData: ProductUpdate = {
            title: data.title,
            description: data.description,
          };
          await updateProduct(id, updateData);
          toast.success("Produto atualizado com sucesso!");
        }
      } catch (error: any) {
        toast.error(error.message || "Erro ao salvar produto.");
      }
    },
    [createProduct, updateProduct, id, isNew, router]
  );

  const handleDeleteProduct = useCallback(async () => {
    if (id) {
      try {
        await deleteProduct(id);
        toast.success("Produto excluído com sucesso!");
        router.push("/dashboard/products");
      } catch (error: any) {
        toast.error(error.message || "Erro ao excluir produto.");
      }
    }
  }, [deleteProduct, id, router]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 sm:p-8 lg:p-10"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Card className="w-full max-w-3xl mx-auto shadow-lg rounded-2xl border border-gray-200">
          <CardHeader className="pb-4 border-b">
            <CardTitle className="text-3xl font-bold tracking-tight">
              {isNew ? "Criar Produto" : "Editar Produto"}
            </CardTitle>
          </CardHeader>

          <form onSubmit={form.handleSubmit(handleSubmitProduct)}>
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Titulo</label>
                <Input
                  id="title"
                  {...form.register("title")}
                  placeholder="Digite o nome do produto"
                  isInvalid={!!form.formState.errors.title}
                  errorMessage={form.formState.errors?.title?.message}
                  isDisabled={isLoading}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Descrição</label>
                <Textarea
                  id="description"
                  {...form.register("description")}
                  placeholder="Escreva a descrição do produto"
                  isInvalid={!!form.formState.errors.description}
                  errorMessage={form.formState.errors?.description?.message}
                  isDisabled={isLoading}
                  minRows={4}
                  className="w-full h-24 resize-none"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="thumbnail" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Thumbnail</label>
                <input
                  id="thumbnail"
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={isLoading}
                />
                {thumbnailPreview && (
                  <div className="mt-2">
                    <img src={thumbnailPreview} alt="Thumbnail Preview" className="max-w-xs h-auto rounded-md" />
                  </div>
                )}
              </div>
            </CardContent>

            <CardFooter className="flex justify-between items-center pt-6 border-t">
              <Button
                color="danger"
                variant="flat"
                onPress={handleDeleteProduct}
                 startContent={<Trash2 className="w-4 h-4" />}
                isDisabled={isNew || isLoading}
                className="rounded-xl bg-[#ff0000] text-white shadow-md"
                as={motion.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Deletar
              </Button>

              <div className="flex gap-3">
                <Button
                  color="default"
                  variant="bordered"
                  onPress={() => router.push("/dashboard/products")}
                  isDisabled={isLoading}
                  className="rounded-xl"
                  as={motion.button}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Voltar
                </Button>

                <Button
                  color="primary"
                  type="submit"
                  isLoading={isLoading}
                  className="rounded-xl shadow-md  text-white w-24 bg-primary"
                  as={motion.button}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isNew ? "Criar" : "Salvar"}
                </Button>
              </div>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </motion.div>
  );
};
