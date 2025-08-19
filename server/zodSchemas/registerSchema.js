import { z } from 'zod';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "El nombre debe tener al menos 3 caracteres" })
      .max(50, { message: "El nombre no puede superar los 50 caracteres" }),

    lastname: z
      .string()
      .min(3, { message: "El apellido debe tener al menos 3 caracteres" })
      .max(50, { message: "El apellido no puede superar los 100 caracteres" }),

    email: z
      .string()
      .min(1, { message: "El email es obligatorio" })
      .email({ message: "Email no válido" }),

    phone_number: z
      .string()
      .min(1, { message: "El número de teléfono es obligatorio" })
      .regex(/^\+?\d{7,15}$/, {
        message:
          "Número de teléfono no válido (7–15 dígitos, puede empezar con '+')",
      }),

    dni: z
      .string()
      .min(1, { message: "El DNI es obligatorio" })
      .max(20, { message: "El DNI no puede superar los 20 caracteres" }),

    address: z
      .string()
      .min(1, { message: "La dirección es obligatoria" })
      .max(255, { message: "La dirección no puede superar los 255 caracteres" }),

    agency: z
      .string()
      .max(100, { message: "La agencia no puede superar los 100 caracteres" })
      .optional(),

    password: z
      .string()
      .min(1, { message: "La contraseña es obligatoria" })
      .regex(passwordRegex, {
        message:
          "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial",
      }),

    repPassword: z.string().min(1, { message: "Debes repetir la contraseña" }),
  })
  .refine((data) => data.repPassword === data.password, {
    message: "Las contraseñas no coinciden",
    path: ["repPassword"]
  });
