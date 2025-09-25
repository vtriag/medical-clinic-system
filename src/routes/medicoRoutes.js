import express from "express";
import { createMedico, listMedicos, loginMedico } from "../controllers/medicoController.js";
import { protect } from "../middlewares/auth.js";
import { authorizeRoles } from "../middlewares/role.js";

const router = express.Router();

// Somente administrador/atendente pode cadastrar médico adicionar o protect
router.post("/",   createMedico);
router.post('/login', loginMedico)
// Lista os médicos
router.get("/",  listMedicos);

export default router;
