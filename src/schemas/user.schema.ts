import { z } from 'zod';

export const PhoneSchema = z.object({
  country: z.string().min(1, 'O país é obrigatório.'),
  ddd: z.string().min(1, 'O DDD é obrigatório.'),
  number: z.string().min(1, 'O número é obrigatório.'),
});

export const CreateUserSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório.'),
  email: z.string().email('E-mail inválido.'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres.'),
  verifyPassword: z.string().min(6, 'A confirmação da senha é obrigatória.'),
  phone: PhoneSchema,
}).refine((data) => data.password === data.verifyPassword, {
  message: 'As senhas não conferem',
  path: ['verifyPassword'],
});

export type CreateUserType = z.infer<typeof CreateUserSchema>;

export const LoginSchema = z.object({
  email: z.string().email('E-mail inválido.'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres.'),
});

export type LoginType = z.infer<typeof LoginSchema>;
