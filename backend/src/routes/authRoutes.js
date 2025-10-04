import { Router } from 'express';
import { login, registerAtendente, registerMedico } from '../controllers/authController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/login', login);

router.post('/register/atendente', authMiddleware, registerAtendente);
router.post('/register/medico', authMiddleware, registerMedico);

export default router;