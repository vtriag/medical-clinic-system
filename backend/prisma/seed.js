import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando o script de seed...');

  // Crie um atendente para ser o primeiro usuário do sistema
  // Ele terá permissão para cadastrar outros médicos e atendentes
  const senhaAtendente = await hash('senha123456', 10);
  const atendente = await prisma.atendente.create({
    data: {
      nome: 'Atendente Master',
      email: 'atendente.master@clinicaviver.com',
      senha: senhaAtendente,
    },
  });
  console.log(`Atendente criado: ${atendente.email}`);

  // Crie um médico de exemplo
  const senhaMedico = await hash('medico123', 10);
  const medico = await prisma.medico.create({
    data: {
      nome: 'Dr. João Silva',
      especialidade: 'CARDIOLOGIA',
      email: 'joao.silva@medico.com',
      senha: senhaMedico,
    },
  });
  console.log(`Médico criado: ${medico.email}`);

  // Crie alguns pacientes de exemplo para a fila
  const paciente1 = await prisma.paciente.create({
    data: {
      nome: 'Maria Oliveira',
      motivo: 'Forte dor no peito',
      prioridade: 'VERMELHO',
    },
  });
  console.log(`Paciente na fila: ${paciente1.nome} (Prioridade: ${paciente1.prioridade})`);

  const paciente2 = await prisma.paciente.create({
    data: {
      nome: 'Carlos Souza',
      motivo: 'Febre alta e tosse',
      prioridade: 'AMARELO',
    },
  });
  console.log(`Paciente na fila: ${paciente2.nome} (Prioridade: ${paciente2.prioridade})`);

  const paciente3 = await prisma.paciente.create({
    data: {
      nome: 'Ana Paula',
      motivo: 'Pequena lesão no pé',
      prioridade: 'VERDE',
    },
  });
  console.log(`Paciente na fila: ${paciente3.nome} (Prioridade: ${paciente3.prioridade})`);

  console.log('Script de seed finalizado com sucesso.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });