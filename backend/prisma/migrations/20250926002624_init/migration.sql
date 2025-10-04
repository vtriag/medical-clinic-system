-- CreateEnum
CREATE TYPE "public"."Prioridade" AS ENUM ('VERMELHO', 'AMARELO', 'VERDE');

-- CreateEnum
CREATE TYPE "public"."StatusPaciente" AS ENUM ('NA_FILA', 'EM_ATENDIMENTO', 'ATENDIDO');

-- CreateEnum
CREATE TYPE "public"."StatusAtendimento" AS ENUM ('INICIADO', 'FINALIZADO');

-- CreateEnum
CREATE TYPE "public"."Especialidade" AS ENUM ('CLINICO_GERAL', 'CARDIOLOGIA', 'PEDIATRIA', 'ORTOPEDIA', 'GINECOLOGIA', 'DERMATOLOGIA', 'NEUROLOGIA', 'PSIQUIATRIA', 'OUTRA');

-- CreateTable
CREATE TABLE "public"."Medico" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "especialidade" "public"."Especialidade" NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,

    CONSTRAINT "Medico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Atendente" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,

    CONSTRAINT "Atendente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Paciente" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "motivo" TEXT NOT NULL,
    "prioridade" "public"."Prioridade" NOT NULL,
    "status" "public"."StatusPaciente" NOT NULL DEFAULT 'NA_FILA',
    "dataCadastro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Paciente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Atendimento" (
    "id" SERIAL NOT NULL,
    "pacienteId" INTEGER NOT NULL,
    "medicoId" INTEGER NOT NULL,
    "horaInicio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "horaFim" TIMESTAMP(3),
    "status" "public"."StatusAtendimento" NOT NULL DEFAULT 'INICIADO',

    CONSTRAINT "Atendimento_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Medico_email_key" ON "public"."Medico"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Atendente_email_key" ON "public"."Atendente"("email");

-- AddForeignKey
ALTER TABLE "public"."Atendimento" ADD CONSTRAINT "Atendimento_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "public"."Paciente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Atendimento" ADD CONSTRAINT "Atendimento_medicoId_fkey" FOREIGN KEY ("medicoId") REFERENCES "public"."Medico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
