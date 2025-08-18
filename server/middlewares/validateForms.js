import { ZodError } from 'zod';

export const validateForms = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        error: error.errors.map((er) => ({
          path: er.path[0],
          message: er.message
        }))
      });
    } else {
      res.status(500).json("Ha habido algún error");
    }
  }
}