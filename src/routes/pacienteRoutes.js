import express from "express";
import { createPaciente, listFilaPacientes, updateStatusPaciente } from "../controllers/pacienteController.js";
import { protect } from "../middlewares/auth.js";
import { authorizeRoles } from "../middlewares/role.js";

const router = express.Router();

// Somente atendente pode cadastrar paciente adicionar protect
router.post("/",   createPaciente);

// Lista fila de pacientes por prioridade // adicionar protect
router.get("/fila",  listFilaPacientes);

// Atualiza status de um paciente
router.patch("/:id/status", protect,  updateStatusPaciente);

export default router;