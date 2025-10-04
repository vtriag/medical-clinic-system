// src/pages/AtendimentoPage.jsx

import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Play, Check, Loader2, LogOut } from "lucide-react";

// --- Componente Auxiliar para o Indicador de Prioridade ---
const PrioridadeBadge = ({ prioridade }) => {
  const cores = {
    VERMELHO: "bg-red-500",
    AMARELO: "bg-yellow-500",
    VERDE: "bg-green-500",
  };

  const formatarTexto = (str) => str.charAt(0) + str.slice(1).toLowerCase();

  return (
    <div className="flex items-center gap-2 mt-2">
      <span className={`w-3 h-3 rounded-full ${cores[prioridade]}`}></span>
      <span className="text-sm font-medium text-gray-700">
        {formatarTexto(prioridade)}
      </span>
    </div>
  );
};

// --- Componente Principal da Página ---
function AtendimentoPage() {
  const [fila, setFila] = useState([]);
  const [atendimentosAtivos, setAtendimentosAtivos] = useState([]);
  const [loadingIniciar, setLoadingIniciar] = useState(null);
  const [loadingFinalizar, setLoadingFinalizar] = useState(null);

  const API_BASE = "http://localhost:5000/api/atendimentos";

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const isMedico = user?.perfil === "medico";

  const getAuthHeaders = useCallback(() => ({
    headers: { Authorization: `Bearer ${token}` },
  }), [token]);

  const fetchData = useCallback(async () => {
    if (!token) return;
    try {
      const [filaRes, ativosRes] = await Promise.all([
        axios.get(`${API_BASE}/fila`, getAuthHeaders()),
        axios.get(`${API_BASE}/ativos`, getAuthHeaders()),
      ]);
      setFila(filaRes.data);
      setAtendimentosAtivos(ativosRes.data);
    } catch (err) {
      console.error("Erro ao buscar dados:", err);
      if (err.response?.status === 401) handleLogout();
    }
  }, [getAuthHeaders, token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleIniciar = async (pacienteId) => {
    setLoadingIniciar(pacienteId);
    try {
      await axios.post(`${API_BASE}/iniciar`, { pacienteId, medicoId: user.id }, getAuthHeaders());
      await fetchData();
    } catch (err) {
      console.error("Erro ao iniciar atendimento:", err);
      alert(err.response?.data?.error || "Não foi possível iniciar o atendimento.");
    } finally {
      setLoadingIniciar(null);
    }
  };

  const handleFinalizar = async (atendimentoId) => {
    setLoadingFinalizar(atendimentoId);
    try {
      await axios.post(`${API_BASE}/finalizar`, { atendimentoId }, getAuthHeaders());
      await fetchData();
    } catch (err) {
      console.error("Erro ao finalizar atendimento:", err);
      alert(err.response?.data?.error || "Não foi possível finalizar o atendimento.");
    } finally {
      setLoadingFinalizar(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen font-sans bg-gray-50">
      {/* --- Cabeçalho --- */}
      <header className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Painel de Atendimento</h1>
          <p className="text-sm text-gray-500">
            Bem-vindo(a), {isMedico ? "Dr(a). " : ""}{user?.nome}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 transition-colors bg-gray-100 rounded-md hover:bg-gray-200"
        >
          <LogOut size={16} />
          Sair
        </button>
      </header>

      <main className="p-6 space-y-10">
        {/* --- Fila de Pacientes --- */}
        <section>
          <h2 className="mb-4 text-xl font-semibold text-gray-700">Fila de Pacientes</h2>
          {fila.length === 0 ? (
            <p className="italic text-gray-500">Nenhum paciente na fila no momento.</p>
          ) : (
            <ul className="space-y-4">
              {fila.map((paciente) => (
                <li
                  key={paciente.id}
                  className="flex flex-col items-start justify-between gap-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex-row sm:items-center"
                >
                  <div className="flex-1">
                    <p className="text-lg font-semibold text-gray-900">{paciente.nome}</p>
                    <p className="text-sm text-gray-600">{paciente.motivo}</p>
                    <PrioridadeBadge prioridade={paciente.prioridade} />
                  </div>
                  {isMedico && (
                    <button
                      onClick={() => handleIniciar(paciente.id)}
                      disabled={loadingIniciar === paciente.id || loadingFinalizar}
                      className="flex items-center justify-center w-full gap-2 px-4 py-2 text-sm font-medium text-white transition-colors bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed sm:w-auto"
                    >
                      {loadingIniciar === paciente.id ? (
                        <Loader2 className="animate-spin" size={20} />
                      ) : (
                        <Play size={20} />
                      )}
                      <span>Iniciar Atendimento</span>
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* --- Atendimentos em Andamento --- */}
        <section>
          <h2 className="mb-4 text-xl font-semibold text-gray-700">Atendimentos em Andamento</h2>
          {atendimentosAtivos.length === 0 ? (
            <p className="italic text-gray-500">Nenhum atendimento em andamento.</p>
          ) : (
            <ul className="space-y-4">
              {atendimentosAtivos.map((at) => (
                <li
                  key={at.id}
                  className="flex flex-col items-start justify-between gap-4 p-4 bg-white border-l-4 rounded-lg shadow-sm border-emerald-500 sm:flex-row sm:items-center"
                >
                  <div className="flex-1">
                    <p className="text-lg font-semibold text-gray-900">{at.paciente.nome}</p>
                    <p className="text-sm text-gray-600">
                      Atendido por: Dr(a). {at.medico?.nome || "—"}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      Início:{" "}
                      {at.horaInicio
                        ? new Date(at.horaInicio).toLocaleTimeString("pt-BR", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "—"}
                    </p>
                  </div>
                  {isMedico && user.id === at.medicoId && (
                    <button
                      onClick={() => handleFinalizar(at.id)}
                      disabled={loadingFinalizar === at.id || loadingIniciar}
                      className="flex items-center justify-center w-full gap-2 px-4 py-2 text-sm font-medium text-white transition-colors rounded-md shadow-sm bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300 disabled:cursor-not-allowed sm:w-auto"
                    >
                      {loadingFinalizar === at.id ? (
                        <Loader2 className="animate-spin" size={20} />
                      ) : (
                        <Check size={20} />
                      )}
                      <span>Finalizar Atendimento</span>
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}

export default AtendimentoPage;
