import express from "express";
import { createPaciente, listFilaPacientes, updateStatusPaciente } from "../controllers/pacienteController.js";
import { protect } from "../middlewares/auth.js";
import { authorizeRoles } from "../middlewares/role.js";

const router = express.Router();

// Somente atendente pode cadastrar paciente
router.post("/", protect, authorizeRoles("atendente"), createPaciente);

// Lista fila de pacientes por prioridade
router.get("/fila", protect, listFilaPacientes);

// Atualiza status de um paciente
router.patch("/:id/status", protect, authorizeRoles("atendente"), updateStatusPaciente);

export default router;