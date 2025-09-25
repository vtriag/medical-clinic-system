import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const iniciarAtendimento = async (req, res) => {
  const { pacienteId } = req.body;
  const medicoId = req.user.id;

  try {
    const atendimento = await prisma.atendimento.create({
      data: {
        pacienteId,
        medicoId
      }
    });

    // Atualiza o status do paciente para EM_ATENDIMENTO
    await prisma.paciente.update({
      where: { id: pacienteId },
      data: { status: "EM_ATENDIMENTO" }
    });

    res.status(201).json({
      message: "Atendimento iniciado com sucesso",
      atendimento
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const finalizarAtendimento = async (req, res) => {
  const { id } = req.params;

  try {
    const atendimentoExistente = await prisma.atendimento.findUnique({
      where: { id: Number(id) },
    });

    if (!atendimentoExistente) {
      return res.status(404).json({ message: "Atendimento não encontrado" });
    }

    const atendimento = await prisma.atendimento.update({
      where: { id: Number(id) },
      data: { horaFim: new Date(), status: "FINALIZADO" } // <-- aqui
    });

    res.json(atendimento);
  } catch (error) {
    console.error("Erro ao finalizar atendimento:", error);
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
