// backend/routes/relatoriosRoutes.js
import { Router } from 'express';
import { getEstatisticas } from '../controllers/relatoriosController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

// Aplica o middleware de autenticação em todas as rotas deste router
router.use(authMiddleware);

// Rota para obter estatísticas
router.get('/estatisticas', getEstatisticas);

export default router;
