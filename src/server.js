import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import pacienteRoutes from "./routes/pacienteRoutes.js";
import medicoRoutes from "./routes/medicoRoutes.js";
import atendimentoRoutes from "./routes/atendimentoRoutes.js";
import relatorioRoutes from "./routes/relatorioRoutes.js";

import { errorHandler } from "./middlewares/error.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Rotas
app.use("/auth", authRoutes);
app.use("/pacientes", pacienteRoutes);
app.use("/medicos", medicoRoutes);
app.use("/atendimentos", atendimentoRoutes);
app.use("/relatorios", relatorioRoutes);

// Rota de teste
app.get("/", (req, res) => res.send("API rodando"));

// Middleware de erro
app.use(errorHandler);

app.listen(process.env.PORT || 5000, () =>
  console.log(`Servidor rodando em http://localhost:${process.env.PORT || 5000}`)
);