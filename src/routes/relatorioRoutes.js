import express from "express";
import { protect } from "../middlewares/auth.js";
import { authorizeRoles } from "../middlewares/role.js";
import { estatisticas } from "../controllers/relatorioController.js";

const router = express.Router();

router.get("/estatisticas", protect,  estatisticas);

export default router;
