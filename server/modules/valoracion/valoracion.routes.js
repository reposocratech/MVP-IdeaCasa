import express from 'express';
import ValoracionController from './valoracion.controllers.js';
import { validateForms } from '../../middlewares/validateForms.js';
import { valoracionSchema } from '../../schemas/valoracionSchema.js';

const router = express.Router();

router.post(
  '/solicitar',
  validateForms(valoracionSchema),
  ValoracionController.solicitarValoracion
);

export default router;
