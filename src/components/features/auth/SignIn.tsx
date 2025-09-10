"use client";

import Link from "next/link";
import { LoginSchema, LoginType, } from "@/lib/user/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { ThemeSwitch } from "@/components/theme-switch";
import { HorizontalLogo } from "@/components/shared/horizontal-logo";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { LuLoaderCircle, LuEye, LuEyeOff } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { useTheme } from "@/lib/hooks/useTheme";
import { useAuthStore } from "@/stores/auth.store";

export const SignIn = () => {
  const { theme } = useTheme();
  const { login, loading, error, success } = useAuthStore();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (success) {
      toast.success("Login realizado com sucesso!");
      router.push("/dashboard");
    }

    if (error) {
      toast.error(error);
    }
  }, [success, error, router]);


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = useCallback(
    async (data: LoginType) => {
      await login(data);
    },
    [login],
  );

  return (
    <>
      <ThemeSwitch className="fixed top-2 right-2 h-[4rem] w-[4rem]" />
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
              <span className="font-medium">Email</span>
              <Input
                placeholder="Email"
                {...register("email")}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-white dark:text-white text-black"
              />
              {errors?.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
              <span className="font-medium">Senha</span>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Senha"
                  {...register("password")}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-white dark:text-black text-black"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <LuEyeOff /> : <LuEye />}
                </button>
              </div>
              {errors?.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}
              <div className="flex gap-2 mt-2">
                <Button
                  type="submit"
                  variant="faded"
                  className="w-1/2 hover:opacity-80 rounded-lg bg-primary text-white"
                >
                  {loading ? (
                    <LuLoaderCircle className="rotate w-4 h-4" />
                  ) : (
                    "Login"
                  )}
                </Button>
                <Link href="/signup" className="w-1/2">
                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full text-primary rounded-lg border border-primary dark:text-white"
                  >
                    Registrar
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

