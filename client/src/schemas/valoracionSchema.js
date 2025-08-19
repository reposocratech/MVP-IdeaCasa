// server/schemas/valoracionSchema.js
import { z } from 'zod';

export const valoracionSchema = z.object({
    tipo: z
        .string({ message: "El tipo de inmueble debe ser un texto." })
        .nonempty({ message: "El tipo de inmueble es obligatorio." })
        .max(100, { message: "El tipo no puede exceder los 100 caracteres." }),
    ciudad: z
        .string({ message: "La ciudad debe ser un texto." })
        .nonempty({ message: "La ciudad es obligatoria." })
        .max(100, { message: "La ciudad no puede exceder los 100 caracteres." }),
    provincia: z
        .string({ message: "La provincia debe ser un texto." })
        .max(100, { message: "La provincia no puede exceder los 100 caracteres." })
        .optional()
        .or(z.literal('')),
    calle: z
        .string({ message: "La calle debe ser un texto." })
        .max(200, { message: "La calle no puede exceder los 200 caracteres." })
        .optional()
        .or(z.literal('')),
    codigoPostal: z
        .string({ message: "El código postal debe ser un texto." })
        .max(10, { message: "El código postal no puede exceder los 10 caracteres." })
        .optional()
        .or(z.literal('')),
    planta: z
        .string({ message: "La planta debe ser un texto." })
        .max(50, { message: "La planta no puede exceder los 50 caracteres." })
        .optional()
        .or(z.literal('')),
    dormitorios: z
        .preprocess(
            (val) => (val === '' ? undefined : Number(val)), // Preprocesa string vacío a undefined
            z.number({ message: "El número de dormitorios debe ser un número." })
                .int({ message: "El número de dormitorios debe ser un número entero." })
                .min(0, { message: "El número de dormitorios no puede ser negativo." })
                .max(99, { message: "El número de dormitorios no puede ser mayor de 99." })
                .optional()
        ),
    superficie: z
        .preprocess(
            (val) => (val === '' ? undefined : Number(val)),
            z.number({ message: "La superficie debe ser un número." })
                .positive({ message: "La superficie debe ser un número positivo." })
                .min(1, { message: "La superficie debe ser al menos 1 m²." })
                .max(99999, { message: "La superficie no puede ser mayor de 99999 m²." })
                .optional()
        ),
    baños: z
        .preprocess(
            (val) => (val === '' ? undefined : Number(val)),
            z.number({ message: "El número de baños debe ser un número." })
                .int({ message: "El número de baños debe ser un número entero." })
                .min(0, { message: "El número de baños no puede ser negativo." })
                .max(99, { message: "El número de baños no puede ser mayor de 99." })
                .optional()
        ),
    nombreContacto: z
        .string({ message: "El nombre de contacto debe ser un texto." })
        .nonempty({ message: "El nombre de contacto es obligatorio." })
        .min(3, { message: "El nombre de contacto debe tener al menos 3 caracteres." })
        .max(100, { message: "El nombre de contacto no puede exceder los 100 caracteres." }),
    telefonoContacto: z
        .string({ message: "El teléfono de contacto debe ser un texto." })
        .max(20, { message: "El teléfono no puede exceder los 20 caracteres." })
        .optional()
        .or(z.literal('')),
    emailContacto: z
        .string({ message: "El email de contacto debe ser un texto." })
        .nonempty({ message: "El email de contacto es obligatorio." })
        .email({ message: "El email de contacto no es válido." }),
    mensajeContacto: z
        .string({ message: "El mensaje debe ser un texto." })
        .max(1000, { message: "El mensaje no puede exceder los 1000 caracteres." })
        .optional()
        .or(z.literal('')),
    aceptoPrivacidad: z.boolean({ message: "Debe aceptar la política de privacidad." })
        .refine(val => val === true, { message: "Debe aceptar la política de privacidad." }), // Asegura que sea true
    aceptoNovedades: z.boolean({ message: "La aceptación de novedades debe ser un booleano." })
        .optional()
});
