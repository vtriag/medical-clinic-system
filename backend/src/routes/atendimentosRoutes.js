import express from 'express';
import { 
  getFila, 
  getAtendimentosAtivos, 
  iniciarAtendimento, 
  finalizarAtendimento,
  getHistorico  // ✨ adicionar o controller do histórico
} from '../controllers/atendimentosController.js';

const router = express.Router();

router.get('/fila', getFila);
router.get('/ativos', getAtendimentosAtivos);
router.get('/historico', getHistorico);
router.post('/iniciar', iniciarAtendimento);
router.post('/finalizar', finalizarAtendimento);

export default router;
