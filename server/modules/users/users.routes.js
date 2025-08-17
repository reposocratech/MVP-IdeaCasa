//entrada a la ruta http://localhost:4000/api/users

import express from 'express';
import usersController from './users.controllers.js';

const router = express.Router();

router.post("/register", usersController.register);

export default router;