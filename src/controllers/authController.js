import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const registerUser = async (req, res) => {
  const { nome, email, senha, role, especialidade } = req.body;

  try {
    const hashed = await bcrypt.hash(senha, 10);
    let user;

    if (role === "medico") {
      user = await prisma.medico.create({
        data: { nome, email, senha: hashed, especialidade },
      });
    } else if (role === "atendente") {
      user = await prisma.atendente.create({
        data: { nome, email, senha: hashed },
      });
    } else {
      return res.status(400).json({ message: "Role inválida" });
    }

    const token = jwt.sign({ id: user.id, role }, process.env.JWT_SECRET, { expiresIn: "8h" });
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, senha, role } = req.body;

  try {
    let user;

    if (role === "medico") user = await prisma.medico.findUnique({ where: { email } });
    else if (role === "atendente") user = await prisma.atendente.findUnique({ where: { email } });
    else return res.status(400).json({ message: "Role inválida" });

    if (!user) return res.status(404).json({ message: "Usuário não encontrado" });

    const valid = await bcrypt.compare(senha, user.senha);
    if (!valid) return res.status(401).json({ message: "Senha incorreta" });

    const token = jwt.sign({ id: user.id, role }, process.env.JWT_SECRET, { expiresIn: "8h" });
    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
