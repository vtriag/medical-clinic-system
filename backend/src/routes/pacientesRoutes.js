import { Router } from 'express';
import { createPaciente, listPacientesFila, updatePacienteStatus } from '../controllers/pacientesController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

router.use(authMiddleware);

router.post('/cadastrar', createPaciente);
router.get('/fila', listPacientesFila);
router.patch('/:id/status', updatePacienteStatus);

export default router;