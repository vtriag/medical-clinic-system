import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import morgan from 'morgan';

import authRoutes from './routes/authRoutes.js';
import pacientesRoutes from './routes/pacientesRoutes.js';
import atendimentosRoutes from './routes/atendimentosRoutes.js';
import relatoriosRoutes from './routes/relatoriosRoutes.js';

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(morgan('dev'));

// rota de teste da API
app.get('/api', (req, res) => {
  res.send('API está no ar!');
});

// rotas principais
app.use('/api/auth', authRoutes);
app.use('/api/pacientes', pacientesRoutes);
app.use('/api/atendimentos', atendimentosRoutes);
app.use('/api/relatorios', relatoriosRoutes);

export default app;
