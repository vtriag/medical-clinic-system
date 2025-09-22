import express from "express";
import { protect } from "../middlewares/auth.js";
import { authorizeRoles } from "../middlewares/role.js";
import {
  iniciarAtendimento, finalizarAtendimento, historicoAtendimentos } from "../controllers/atendimentoController.js";

const router = express.Router();

// Somente médicos podem iniciar/finalizar atendimento
router.post("/iniciar", protect, authorizeRoles("medico"), iniciarAtendimento);
router.post("/finalizar/:id", protect, authorizeRoles("medico"), finalizarAtendimento);

// Histórico acessível a médicos e atendentes
router.get("/historico", protect, historicoAtendimentos);

export default router;
