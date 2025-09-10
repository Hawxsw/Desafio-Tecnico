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
import {Select, SelectSection, SelectItem} from "@heroui/select";
import { motion } from "framer-motion";

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <>
      <ThemeSwitch className="fixed top-2 right-2 h-[4rem] w-[4rem]" />
      <div className="w-full min-h-screen flex flex-col sm:flex-row">
        <motion.div
          className={`w-full sm:w-1/2 min-h-[30vh] sm:min-h-screen ${theme === "light" ? "bg-primary" : "bg-primary"} flex justify-center items-center p-4`}
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <HorizontalLogo className="w-2/3 max-w-sm" inverted />
        </motion.div>
        <motion.div
          className="w-full sm:w-1/2 flex justify-center items-center p-4 min-h-[70vh] sm:min-h-screen"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-full max-w-md"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="w-full sm:hidden flex justify-center mb-6">
              <HorizontalLogo className="w-2/3 max-w-[200px]" inverted />
            </div>
            <motion.h1 variants={itemVariants} className="text-3xl font-bold mb-2">Bem vindo, de volta!</motion.h1>
            <motion.h2 variants={itemVariants} className="text-md mb-6 text-gray-600 dark:text-gray-300">Painel de criação de Produto</motion.h2>
            <motion.form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.span variants={itemVariants} className="font-medium text-lg">Nome</motion.span>
              <motion.div variants={itemVariants}>
                <Input
                  placeholder="Nome"
                  {...register("name")}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-white dark:text-white text-black"
                />
                {errors?.name && (
                  <span className="text-red-500 text-sm mt-1 block">
                    {errors.name.message}
                  </span>
                )}
              </motion.div>
              <motion.span variants={itemVariants} className="font-medium text-lg">Email</motion.span>
              <motion.div variants={itemVariants}>
                <Input
                  placeholder="Email"
                  {...register("email")}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-white dark:text-white text-black"
                />
                {errors?.email && (
                  <span className="text-red-500 text-sm mt-1 block">
                    {errors.email.message}
                  </span>
                )}
              </motion.div>
              <motion.span variants={itemVariants} className="font-medium text-lg">Senha</motion.span>
              <motion.div variants={itemVariants} className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Senha"
                  {...register("password")}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-white dark:text-white text-black"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-500"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <LuEyeOff className="w-5 h-5" /> : <LuEye className="w-5 h-5" />}
                </button>
              </motion.div>
              {errors?.password && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.password.message}
                </span>
              )}
              <motion.span variants={itemVariants} className="font-medium text-lg">Confirmar Senha</motion.span>
              <motion.div variants={itemVariants} className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirmar Senha"
                  {...register("verifyPassword")}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-white dark:text-white text-black"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-500"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? <LuEyeOff className="w-5 h-5" /> : <LuEye className="w-5 h-5" />}
                </button>
              </motion.div>
              {errors?.verifyPassword && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.verifyPassword.message}
                </span>
              )}
              <motion.span variants={itemVariants} className="font-medium text-lg">País</motion.span>
              <motion.div variants={itemVariants}>
                <Select
                  placeholder="Selecione o País"
                  {...register("phone.country")}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-white dark:text-black text-black"
                >
                  <SelectSection title="Países" className="max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-500 bg-white dark:bg-white border border-gray-200 dark:border-white rounded-xl shadow-lg p-2 dark:text-black">
                    <SelectItem key="BR">Brasil</SelectItem>
                    <SelectItem key="US">Estados Unidos</SelectItem>
                    <SelectItem key="CA">Canadá</SelectItem>
                    <SelectItem key="GB">Reino Unido</SelectItem>
                    <SelectItem key="DE">Alemanha</SelectItem>
                    <SelectItem key="FR">França</SelectItem>
                    <SelectItem key="ES">Espanha</SelectItem>
                    <SelectItem key="PT">Portugal</SelectItem>
                  </SelectSection>
                </Select>
                {errors?.phone?.country && (
                  <span className="text-red-500 text-sm mt-1 block">
                    {errors.phone.country.message}
                  </span>
                )}
              </motion.div>
              <motion.div variants={itemVariants} className="flex gap-4">
                <div className="flex-none w-1/3">
                  <span className="font-medium text-lg">DDD</span>
                  <Input
                    placeholder="DDD"
                    {...register("phone.ddd")}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-white dark:text-white text-black"
                  />
                  {errors?.phone?.ddd && (
                    <span className="text-red-500 text-sm mt-1 block">
                      {errors.phone.ddd.message}
                    </span>
                  )}
                </div>
                <div className="flex-1">
                  <span className="font-medium text-lg">Número</span>
                  <Input
                    placeholder="Número"
                    {...register("phone.number")}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-white dark:text-white text-black"
                  />
                  {errors?.phone?.number && (
                    <span className="text-red-500 text-sm mt-1 block">
                      {errors.phone.number.message}
                    </span>
                  )}
                </div>
              </motion.div>
              <motion.div variants={itemVariants} className="flex gap-4 mt-4">
                <Button
                  type="submit"
                  variant="faded"
                  className="w-1/2 py-3 hover:opacity-80 rounded-lg bg-primary text-white text-lg font-semibold"
                >
                  {isLoading ? (
                    <LuLoaderCircle className="animate-spin w-5 h-5 mx-auto" />
                  ) : (
                    "Cadastrar"
                  )}
                </Button>
                <Link href="/signin" className="w-1/2">
                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full text-primary rounded-lg border border-primary dark:text-white"
                  >
                    Voltar
                  </Button>
                </Link>
              </motion.div>
            </motion.form>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};
