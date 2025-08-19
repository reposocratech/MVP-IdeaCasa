import { z } from "zod";

export const adminRegisterSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "El nombre debe tener al menos 3 caracteres" })
      .max(50, { message: "El nombre no puede superar los 50 caracteres" }),

    email: z
      .string()
      .min(1, { message: "El email es obligatorio" })
      .email({ message: "Email no válido" }),

    password: z
      .string()
      .min(4, { message: "La contraseña debe tener al menos 4 caracteres" }),

    repPassword: z
      .string()
      .min(4, { message: "Debes repetir la contraseña" }),
  })
  .refine((data) => data.repPassword === data.password, {
    message: "Las contraseñas no coinciden",
    path: ["repPassword"],
  });
