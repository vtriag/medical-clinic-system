import express from "express";
import { createMedico, listMedicos } from "../controllers/medicoController.js";
import { protect } from "../middlewares/auth.js";
import { authorizeRoles } from "../middlewares/role.js";

const router = express.Router();

// Somente administrador/atendente pode cadastrar médico
router.post("/", protect, authorizeRoles("atendente"), createMedico);

// Lista os médicos
router.get("/", protect, listMedicos);

export default router;
