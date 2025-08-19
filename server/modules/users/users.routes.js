//entrada a la ruta http://localhost:4000/api/users

import express from 'express';
import usersController from './users.controllers.js';
import { validateForms } from '../../middlewares/validateForms.js';
import { registerSchema } from '../../zodSchemas/registerSchema.js';
import { adminRegisterSchema } from '../../zodSchemas/adminRegisterSchema.js';

const router = express.Router();

router.post("/adminRegister", validateForms(adminRegisterSchema), usersController.adminRegister);

router.post("/register", validateForms(registerSchema), usersController.register);

export default router;