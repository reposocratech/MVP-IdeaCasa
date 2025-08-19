import express from 'express';
import valoracionController from './valoracion.controllers.js';

const router = express.Router();

router.post('/solicitar', valoracionController.solicitarValoracion);

export default router;
