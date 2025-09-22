import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const iniciarAtendimento = async (req, res) => {
  const { pacienteId } = req.body;
  const medicoId = req.user.id;

  try {
    const atendimento = await prisma.atendimento.create({
      data: { pacienteId, medicoId }
    });
    res.status(201).json(atendimento);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const finalizarAtendimento = async (req, res) => {
  const { id } = req.params;
  try {
    const atendimento = await prisma.atendimento.update({
      where: { id: Number(id) },
      data: { horaFim: new Date(), status: "finalizado" }
    });
    res.json(atendimento);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const historicoAtendimentos = async (req, res) => {
  try {
    const historico = await prisma.atendimento.findMany({
      include: { paciente: true, medico: true }
    });
    res.json(historico);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
