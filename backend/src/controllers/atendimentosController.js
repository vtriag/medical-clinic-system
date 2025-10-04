import prisma from '../prismaClient.js';

// Buscar pacientes na fila
export const getFila = async (req, res) => {
  try {
    const fila = await prisma.paciente.findMany({
      where: { status: 'NA_FILA' },
      orderBy: [
        { prioridade: 'desc' }, // VERMELHO > AMARELO > VERDE
        { dataCadastro: 'asc' }, // Quem chegou primeiro
      ],
    });
    res.status(200).json(fila);
  } catch (err) {
    console.error('Erro ao buscar fila:', err);
    res.status(500).json({ error: 'Erro ao buscar fila' });
  }
};

// Buscar atendimentos ativos
export const getAtendimentosAtivos = async (req, res) => {
  try {
    const ativos = await prisma.atendimento.findMany({
      where: { status: 'INICIADO' },
      include: { paciente: true, medico: true },
      orderBy: { horaInicio: 'asc' },
    });

    // Adicionar medicoId direto para facilitar frontend
    const ativosComMedicoId = ativos.map(a => ({
      ...a,
      medicoId: a.medico?.id || null,
    }));

    res.json(ativosComMedicoId);
  } catch (err) {
    console.error('Erro ao buscar atendimentos ativos:', err);
    res.status(500).json({ error: 'Erro ao buscar atendimentos ativos' });
  }
};

// Iniciar atendimento
export const iniciarAtendimento = async (req, res) => {
  const { pacienteId, medicoId } = req.body;
  try {
    await prisma.paciente.update({
      where: { id: pacienteId },
      data: { status: 'EM_ATENDIMENTO' },
    });

    const atendimento = await prisma.atendimento.create({
      data: { pacienteId, medicoId },
      include: { paciente: true, medico: true },
    });

    res.status(201).json(atendimento);
  } catch (err) {
    console.error('Erro ao iniciar atendimento:', err);
    res.status(500).json({ error: 'Erro ao iniciar atendimento' });
  }
};

// Finalizar atendimento
export const finalizarAtendimento = async (req, res) => {
  const { atendimentoId } = req.body;
  try {
    const atendimento = await prisma.atendimento.update({
      where: { id: atendimentoId },
      data: { status: 'FINALIZADO', horaFim: new Date() },
      include: { paciente: true, medico: true },
    });

    await prisma.paciente.update({
      where: { id: atendimento.pacienteId },
      data: { status: 'ATENDIDO' },
    });

    res.json(atendimento);
  } catch (err) {
    console.error('Erro ao finalizar atendimento:', err);
    res.status(500).json({ error: 'Erro ao finalizar atendimento' });
  }
};

// Histórico de atendimentos finalizados
export const getHistorico = async (req, res) => {
  try {
    const historico = await prisma.atendimento.findMany({
      where: { status: 'FINALIZADO' },
      include: { paciente: true, medico: true },
      orderBy: { horaFim: 'desc' }, // mais recentes primeiro
    });

    // Adicionar medicoId direto
    const historicoComMedicoId = historico.map(h => ({
      ...h,
      medicoId: h.medico?.id || null,
    }));

    res.json(historicoComMedicoId);
  } catch (err) {
    console.error('Erro ao buscar histórico:', err);
    res.status(500).json({ error: 'Erro ao buscar histórico' });
  }
};
