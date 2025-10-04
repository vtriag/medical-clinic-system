import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Cadastrar paciente
export const createPaciente = async (req, res) => {
  try {
    const { nome, motivo, prioridade } = req.body;

    if (!nome || !motivo || !prioridade) {
      return res.status(400).json({ error: "Nome, motivo e prioridade são obrigatórios." });
    }

    const paciente = await prisma.paciente.create({
      data: {
        nome,
        motivo,
        prioridade,
        status: "NA_FILA"
      }
    });

    res.status(201).json(paciente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao cadastrar paciente" });
  }
};

// Listar pacientes na fila
export const listPacientesFila = async (req, res) => {
  try {
    const fila = await prisma.paciente.findMany({
      where: { status: "NA_FILA" },
      // CORRIGIDO: Ordenação por prioridade e depois por data
      // 'desc' (decrescente) funciona para Enums em ordem alfabética (VERMELHO > VERDE > AMARELO),
      // então criamos uma ordenação customizada com raw query.
      orderBy: {
        dataCadastro: 'asc' // Ordena por chegada como critério secundário
      }
    });

    // Mapeamento de prioridades para ordenação manual
    const priorityOrder = { 'VERMELHO': 1, 'AMARELO': 2, 'VERDE': 3 };
    
    fila.sort((a, b) => priorityOrder[a.prioridade] - priorityOrder[b.prioridade]);

    res.json(fila);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar fila" });
  }
};


// Atualizar status do paciente
export const updatePacienteStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const paciente = await prisma.paciente.update({
      where: { id: Number(id) },
      data: { status }
    });

    res.json(paciente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar status do paciente" });
  }
};