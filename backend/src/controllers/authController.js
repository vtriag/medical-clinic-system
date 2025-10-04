import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

// Lógica de login para médicos e atendentes
export const login = async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
  }

  try {
    // Tenta encontrar o usuário como médico
    let user = await prisma.medico.findUnique({ where: { email } });
    let perfil = 'medico';

    if (!user) {
      // Se não for médico, tenta como atendente
      user = await prisma.atendente.findUnique({ where: { email } });
      perfil = 'atendente';
    }

    if (!user || !(await bcrypt.compare(senha, user.senha))) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    // Gera o token JWT com o ID e o perfil
    const token = jwt.sign({ id: user.id, perfil }, JWT_SECRET, { expiresIn: '8h' }); // Aumentei a duração do token

    // Retorna um objeto completo com os dados do usuário
    res.status(200).json({
      token,
      perfil,
      id: user.id,
      nome: user.nome, // Enviando o nome para o frontend
    });

  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ error: 'Erro interno no servidor. Tente novamente.' });
  }
};

// Lógica para cadastrar um médico (requer que um atendente esteja logado)
export const registerMedico = async (req, res) => {
  // O middleware já validou o token. Agora, verificamos o perfil.
  if (req.userProfile !== 'atendente') {
    return res.status(403).json({ error: 'Acesso negado. Apenas atendentes podem cadastrar médicos.' });
  }

  const { nome, especialidade, email, senha } = req.body;

  if (!nome || !especialidade || !email || !senha) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(senha, 10);
    const medico = await prisma.medico.create({
      data: {
        nome,
        especialidade,
        email,
        senha: hashedPassword,
      },
    });
    // Remove a senha da resposta para segurança
    const { senha: _, ...medicoSemSenha } = medico;
    res.status(201).json({ message: 'Médico cadastrado com sucesso!', medico: medicoSemSenha });

  } catch (error) {
    // Se o erro for de e-mail duplicado (código 'P2002' do Prisma)
    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'E-mail já cadastrado.' });
    }
    console.error('Erro ao registrar médico:', error);
    res.status(500).json({ error: 'Erro interno no servidor. Tente novamente.' });
  }
};

// Lógica para cadastrar um atendente (requer que um atendente esteja logado)
export const registerAtendente = async (req, res) => {
  if (req.userProfile !== 'atendente') {
    return res.status(403).json({ error: 'Acesso negado. Apenas atendentes podem cadastrar outros atendentes.' });
  }
  
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(senha, 10);
    const atendente = await prisma.atendente.create({
      data: {
        nome,
        email,
        senha: hashedPassword,
      },
    });
    const { senha: _, ...atendenteSemSenha } = atendente;
    res.status(201).json({ message: 'Atendente cadastrado com sucesso!', atendente: atendenteSemSenha });

  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'E-mail já cadastrado.' });
    }
    console.error('Erro ao registrar atendente:', error);
    res.status(500).json({ error: 'Erro interno no servidor. Tente novamente.' });
  }
};
