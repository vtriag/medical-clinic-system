import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import jwt from "jsonwebtoken";




export const createMedico = async (req, res) => {
  const { nome, email, senha, especialidade } = req.body;
  try {
    const hashedSenha = senha;
    const medico = await prisma.medico.create({
      data: { nome, email, senha: hashedSenha, especialidade }
    });
    res.status(201).json(medico);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const listMedicos = async (req, res) => {
  try {
    const medicos = await prisma.medico.findMany();
    res.json(medicos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const loginMedico = async (req, res) => {
  const { email, senha } = req.body;

  try {
    // Verifica se médico existe
    const medico = await prisma.medico.findUnique({
      where: { email }
    });

    if (!medico) {
      return res.status(401).json({ message: "Email ou senha inválidos" });
    }

    // Compara senha
    // const senhaValida = await bcrypt.compare(senha, medico.senha);
    // if (!senhaValida) {
    //   return res.status(401).json({ message: "Email ou senha inválidos" });
    // }

    // Gera token JWT
    const token = jwt.sign(
      { id: medico.id, email: medico.email }, // payload
      process.env.JWT_SECRET,                 // chave secreta
      { expiresIn: "8h" }                     // expiração
    );

    res.status(200).json({
      message: "Login realizado com sucesso",
      token,
      medico: {
        id: medico.id,
        nome: medico.nome,
        email: medico.email,
        especialidade: medico.especialidade
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
