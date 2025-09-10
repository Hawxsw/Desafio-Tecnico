"use client";

import { CreateUserSchema, type CreateUserType } from "@/lib/user/user.schema";
import { UserService } from "@/services/clients/user.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { ThemeSwitch } from "@/components/theme-switch";
import { HorizontalLogo } from "@/components/shared/horizontal-logo";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { LuLoaderCircle, LuEye, LuEyeOff } from "react-icons/lu";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTheme } from "@/lib/hooks/useTheme";
import { api } from "@/services/api";

export const SignUp = () => {
  const { theme } = useTheme();
  const userService = new UserService(api.api);
  const [isLoading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
    setShowPassword(!showPassword);
  };

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
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirmar Senha"
                  {...register("verifyPassword")}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white text-black"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? <LuEyeOff /> : <LuEye />}
                </button>
              </div>
              {errors?.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}
              <span className="font-medium">Confirmar Senha</span>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirmar Senha"
                  {...register("verifyPassword")}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white text-black"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? <LuEyeOff /> : <LuEye />}
                </button>
              </div>
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
              <div className="flex gap-2 mt-2">
                <Button
                  type="submit"
                  variant="faded"
                  className="w-1/2 hover:opacity-80 rounded-lg bg-primary text-white"
                >
                  {isLoading ? (
                    <LuLoaderCircle className="rotate w-4 h-4" />
                  ) : (
                    "Cadastrar"
                  )}
                </Button>
                <Link href="/signin" className="w-1/2">
                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full text-primary"
                  >
                    Voltar
                  </Button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
