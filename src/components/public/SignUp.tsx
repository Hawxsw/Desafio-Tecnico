"use client";

import { useTheme } from "@/hooks/useTheme";
import { CreateUserSchema, type CreateUserType } from "@/schemas/user.schema";
import { UserService } from "@/services/clients/user.service";
import { api } from "../../services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { ThemeSwitch } from "@/components/theme-switch";
import { HorizontalLogo } from "@/components/shared/horizontal-logo";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { LuLoaderCircle } from "react-icons/lu";
import { useRouter } from "next/navigation";

export const SignUp = () => {
  const { theme } = useTheme();
  const userService = new UserService(api.api);
  const [isLoading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserType>({
    resolver: zodResolver(CreateUserSchema),
  });

  const onSubmit = useCallback(
    async (data: CreateUserType) => {
      setLoading(true);
      try {
        await userService.createUser(data);
        toast.success("Usuário criado com sucesso!");
        router.push("/");
      } catch (error) {
        toast.error("Erro ao ao criar usuario");
        setLoading(false);
      } finally {
        setLoading(false);
      }
    },
    [userService, router],
  );

  return (
    <>
      <ThemeSwitch />
      <div className="w-[100vw] h-[100vh] flex justify-between items-center sm:flex-row flex-col">
        <div
          className={`w-[50%] h-[100%] ${theme === "light" ? "bg-primary" : "bg-primary"} sm:flex justify-center items-center hidden`}
        >
          <HorizontalLogo className="w-[60%]" inverted />
        </div>
        <div className="w-[100%] sm:w-[50%] flex justify-center items-center flex-col h-[90vh]">
          <div className="sm:w-[50%] w-[80%]">
            <div className="w-[100%] sm:hidden flex justify-center ">
              <HorizontalLogo className="w-[60%]" inverted />
            </div>
            <h1 className="text-2xl font-bold">Bem vindo, de volta!</h1>
            <h2 className="text-sm mb-5">Painel de criação de Produto</h2>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-2"
            >
              <span className="font-medium">Nome</span>
              <Input
                placeholder="Nome"
                {...register("name")}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white text-black"
              />
              {errors?.name && (
                <span className="text-red-500 text-sm">
                  {errors.name.message}
                </span>
              )}
              <span className="font-medium">Email</span>
              <Input
                placeholder="Email"
                {...register("email")}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white text-black"
              />
              {errors?.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
              <span className="font-medium">Senha</span>
              <Input
                placeholder="Senha"
                {...register("password")}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white text-black"
              />
              {errors?.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}
              <span className="font-medium">Confirmar Senha</span>
              <Input
                placeholder="Confirmar Senha"
                {...register("verifyPassword")}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white text-black"
              />
              {errors?.verifyPassword && (
                <span className="text-red-500 text-sm">
                  {errors.verifyPassword.message}
                </span>
              )}
              <span className="font-medium">País</span>
              <Input
                placeholder="País"
                {...register("phone.country")}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white text-black"
              />
              {errors?.phone?.country && (
                <span className="text-red-500 text-sm">
                  {errors.phone.country.message}
                </span>
              )}
              <div className="flex gap-2">
                <div className="flex-none w-1/3">
                  <span className="font-medium">DDD</span>
                  <Input
                    placeholder="DDD"
                    {...register("phone.ddd")}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white text-black"
                  />
                  {errors?.phone?.ddd && (
                    <span className="text-red-500 text-sm">
                      {errors.phone.ddd.message}
                    </span>
                  )}
                </div>
                <div className="flex-1">
                  <span className="font-medium">Número</span>
                  <Input
                    placeholder="Número"
                    {...register("phone.number")}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white text-black"
                  />
                  {errors?.phone?.number && (
                    <span className="text-red-500 text-sm">
                      {errors.phone.number.message}
                    </span>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                variant="faded"
                className="w-[100%] mt-2 hover:text-primary"
              >
                {isLoading ? (
                  <LuLoaderCircle className="rotate w-4 h-4" />
                ) : (
                  "Cadastrar"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
