import { z } from "zod";

export const LoginUserSchema = z.object({
  email: z.string().email("Email invalide !"),
  password: z
    .string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères !"),
});

export const RegisterUserSchema = z.object({
  username: z
    .string()
    .min(6, "Le nom de l'utilisateur doit avoir 6 caractères !"),
  email: z.string().email("Email invalide !"),
  password: z
    .string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères !"),
});

export type LoginUser = z.infer<typeof LoginUserSchema>;
export type RegisterUser = z.infer<typeof RegisterUserSchema>;
