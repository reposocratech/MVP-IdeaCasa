import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "El email es obligatorio" })
    .email({ message: "Email no válido" }),
  password: z
    .string()
    .min(4, { message: "La contraseña es obligatoria" }),
});