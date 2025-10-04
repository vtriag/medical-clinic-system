import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getEstatisticas = async (req, res) => {
  try {
    // 1. Quantidade de pacientes atendidos por médico
    const atendimentosPorMedico = await prisma.atendimento.groupBy({
      by: ['medicoId'],
      _count: {
        id: true,
      },
      where: {
        status: 'FINALIZADO',
      },
    });

    // Para exibir o nome do médico, precisa buscar os dados dele.
    const medicosComAtendimentos = await Promise.all(
      atendimentosPorMedico.map(async (atendimento) => {
        const medico = await prisma.medico.findUnique({
          where: { id: atendimento.medicoId },
          select: { nome: true },
        });
        return {
          medico: medico.nome,
          totalAtendimentos: atendimento._count.id,
        };
      })
    );

    // 2. Tempo médio de espera (vamos considerar o tempo médio de atendimento para este exemplo)
    const atendimentosFinalizados = await prisma.atendimento.findMany({
      where: {
        status: 'FINALIZADO',
        horaFim: { not: null },
      },
    });

    const tempoTotalAtendimentoMs = atendimentosFinalizados.reduce((acc, atendimento) => {
      const inicio = atendimento.horaInicio.getTime();
      const fim = atendimento.horaFim.getTime();
      return acc + (fim - inicio);
    }, 0);

    const tempoMedioEmMinutos = atendimentosFinalizados.length > 0
      ? Math.round(tempoTotalAtendimentoMs / atendimentosFinalizados.length / 60000)
      : 0;
    
    // 3. Quantidade de pacientes por prioridade (na fila)
    const pacientesPorPrioridade = await prisma.paciente.groupBy({
      by: ['prioridade'],
      _count: {
        id: true,
      },
      where: {
        status: 'NA_FILA',
      },
    });

    const prioridadesFormatadas = pacientesPorPrioridade.map(item => ({
      prioridade: item.prioridade,
      quantidade: item._count.id
    }));


    res.status(200).json({
      pacientesAtendidosPorMedico: medicosComAtendimentos,
      tempoMedioAtendimentoMinutos: tempoMedioEmMinutos,
      pacientesNaFilaPorPrioridade: prioridadesFormatadas,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao gerar relatório.' });
  }
};