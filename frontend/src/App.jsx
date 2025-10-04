// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import DashboardMedicoPage from './pages/DashboardMedicoPage';
import DashboardAtendentePage from './pages/DashboardAtendentePage';
import ReportPage from './pages/ReportPage';
import CadastroMedicoPage from './pages/CadastroMedicoPage';
import CadastroAtendentePage from './pages/CadastroAtendentePage';
import AtendimentoPage from './pages/AtendimentoPage';
import ProtectRoute from './components/ProtectRoute';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Rotas públicas */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Rotas de médico protegidas */}
        <Route element={<ProtectRoute allowedProfiles={['medico']} />}>
          <Route path="/dashboard-medico" element={<DashboardMedicoPage />} />
          <Route path="/atendimento" element={<AtendimentoPage />} />
        </Route>

        {/* Rotas de atendente protegidas */}
        <Route element={<ProtectRoute allowedProfiles={['atendente']} />}>
          <Route path="/dashboard-atendente" element={<DashboardAtendentePage />} />
          <Route path="/relatorios" element={<ReportPage />} />
          <Route path="/cadastroMedico" element={<CadastroMedicoPage />} />
          <Route path="/cadastroAtendente" element={<CadastroAtendentePage />} />
        </Route>

        {/* Rota fallback */}
        <Route path="*" element={<HomePage />} />
      </Route>
    </Routes>
  );
}

export default App;
