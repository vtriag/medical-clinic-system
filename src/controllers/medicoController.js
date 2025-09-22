import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createMedico = async (req, res) => {
  const { nome, email, senha, especialidade } = req.body;
  try {
    const hashedSenha = senha;
    const medico = await prisma.medico.create({
      data: { nome, email, senha: hashedSenha, especialidade }
    });
    res.status(201).json(medico);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const listMedicos = async (req, res) => {
  try {
    const medicos = await prisma.medico.findMany();
    res.json(medicos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
