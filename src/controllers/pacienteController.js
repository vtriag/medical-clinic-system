import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createPaciente = async (req, res) => {
  const { nome, motivo, prioridade } = req.body;
  try {
    const paciente = await prisma.paciente.create({
      data: { nome, motivo, prioridade }
    });
    res.status(201).json(paciente);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const listFilaPacientes = async (req, res) => {
  try {
    const pacientes = await prisma.paciente.findMany({
      orderBy: { prioridade: "desc" }, // vermelho > amarelo > verde
    });
    res.json(pacientes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateStatusPaciente = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const paciente = await prisma.paciente.update({
      where: { id: Number(id) },
      data: { status }
    });
    res.json(paciente);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
