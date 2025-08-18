import { ZodError } from 'zod';

export const validateForms = (schema, data) => {
  try {
    schema.parse(data);
    return { valid: true, errors: {} }; // si todo va bien
  } catch (error) {
    if (error instanceof ZodError) {
      const objTemp = {};
      error.issues.forEach((er) => {
        objTemp[er.path[0]] = er.message;
      });
      return { valid: false, errors: objTemp };
    }

    //error no de validacion
    return { valid: false, errors: { message: "Error inesperado en validación" } };
  }
}