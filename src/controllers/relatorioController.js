import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const estatisticas = async (req, res) => {
  try {
    // Quantidade de pacientes atendidos por médico
    const pacientesPorMedico = await prisma.atendimento.groupBy({
      by: ["medicoId"],
      _count: { id: true },
    });

    // Tempo médio de atendimento
    const atendimentos = await prisma.atendimento.findMany({
      where: { status: "finalizado" },
      select: { horaInicio: true, horaFim: true }
    });

    const tempos = atendimentos.map(a => (new Date(a.horaFim) - new Date(a.horaInicio))/1000); // segundos
    const tempoMedio = tempos.length ? tempos.reduce((a,b)=>a+b,0)/tempos.length : 0;

    // Quantidade de pacientes por prioridade
    const pacientesPorPrioridade = await prisma.paciente.groupBy({
      by: ["prioridade"],
      _count: { id: true }
    });

    res.json({
      pacientesPorMedico,
      tempoMedioSegundos: tempoMedio,
      pacientesPorPrioridade
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
