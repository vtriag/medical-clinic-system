const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log('Populando banco de dados!')

  // Criando atendentes
  const atendentes = await prisma.atendente.createMany({
    data: [
      { nome: "Wesley Sousa", email: "wesley@hospital.com", senha: "123456" },
      { nome: "Mickael do Nascimento", email: "mickael@hospital.com", senha: "123456" },
      { nome: "Diemes Alien", email: "diemes@hospital.com", senha: "123456" },
    ],
  })

  // Criando médicos
  const medicos = await prisma.medico.createMany({
    data: [
      { nome: "Dr. Gabriel Delfes", especialidade: "Psicologia", email: "delfes@hospital.com", senha: "123456" },
      { nome: "Dra. Vitória Prudêncio", especialidade: "Pediatria", email: "vitoria@hospital.com", senha: "123456" },
      { nome: "Dr. Eliakim Gama", especialidade: "Clínico Geral", email: "eliakim@hospital.com", senha: "123456" },
    ],
  })

  // Criando pacientes
  const pacientes = await prisma.paciente.createMany({
    data: [
      { nome: "Raimundo Leonardo", motivo: "Dor no peito", prioridade: "VERMELHO" },
      { nome: "Ranielly Agostinho", motivo: "Febre alta", prioridade: "AMARELO" },
      { nome: "Vladimir Lima", motivo: "Torção no pé", prioridade: "VERDE" },
    ],
  })

  // Buscar IDs de médicos e pacientes para criar atendimentos
  const todosMedicos = await prisma.medico.findMany()
  const todosPacientes = await prisma.paciente.findMany()

  // Criar atendimentos
  for (let i = 0; i < 10; i++) {
    const paciente = todosPacientes[i]
    const medico = todosMedicos[i]

    await prisma.atendimento.create({
      data: {
        pacienteId: paciente.id,
        medicoId: medico.id,
        status: i % 2 === 0 ? "FINALIZADO" : "INICIADO",
        horaFim: i % 2 === 0 ? new Date() : null,
      },
    })
  }

  console.log('Banco populado com sucesso!')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
