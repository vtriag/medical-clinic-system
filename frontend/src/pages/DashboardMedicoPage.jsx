import React, { useEffect, useState, useMemo, useCallback } from "react";
import { History, ServerCrash, Inbox, Search, X, Clock } from "lucide-react";
import api from "../api/api";

// --- COMPONENTES AUXILIARES (Reutilizados do dashboard anterior) ---

const SkeletonLoader = () => (
  <div className="flex flex-col p-4 space-y-3 bg-white border border-gray-200 rounded-lg animate-pulse">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
      <div className="w-1/3 h-4 bg-gray-200 rounded-md"></div>
    </div>
    <div className="w-3/4 h-3 bg-gray-200 rounded-md"></div>
    <div className="w-1/2 h-3 bg-gray-200 rounded-md"></div>
  </div>
);

const InfoState = ({ icon, title, message }) => (
  <div className="flex flex-col items-center justify-center h-full p-8 text-center text-gray-500 rounded-lg bg-slate-50 min-h-[300px]">
    <div className="p-4 mb-4 bg-gray-200 rounded-full">{icon}</div>
    <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
    <p className="text-sm">{message}</p>
  </div>
);

const HistoricoItem = ({ registro }) => {
  const priorityStyles = {
    VERMELHO: "bg-red-100 text-red-800",
    AMARELO: "bg-yellow-100 text-yellow-800",
    VERDE: "bg-green-100 text-green-800",
    DEFAULT: "bg-gray-100 text-gray-800",
  };
  const pacienteNome = registro?.paciente?.nome || "Não informado";
  const motivo = registro?.paciente?.motivo || "Não informado";
  const prioridade = registro?.paciente?.prioridade || "DEFAULT";
  const medicoNome = registro?.medico?.nome || "Não atribuído";

  const formatDate = (dateString) =>
    dateString
      ? new Date(dateString).toLocaleString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "-";

  const horaInicio = formatDate(registro?.horaInicio);
  const horaFim = formatDate(registro?.horaFim);

  return (
    <li className="p-4 transition-all duration-200 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:border-indigo-300">
      <div className="grid items-start grid-cols-1 gap-4 md:grid-cols-4">
        <div className="flex items-center gap-3 md:col-span-1">
          <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 font-bold text-white bg-indigo-500 rounded-full">
            {pacienteNome.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-semibold text-gray-900">{pacienteNome}</p>
            <span
              className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${priorityStyles[prioridade]}`}
            >
              Triagem: {prioridade.charAt(0) + prioridade.slice(1).toLowerCase()}
            </span>
          </div>
        </div>
        <div className="text-sm md:col-span-2">
          <p className="text-gray-700">
            <span className="font-semibold text-gray-800">Motivo da Visita:</span>{" "}
            {motivo}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold text-gray-800">Médico Responsável:</span>{" "}
            {medicoNome}
          </p>
        </div>
        <div className="flex items-start gap-2 text-xs text-gray-600 md:col-span-1 md:justify-end">
          <Clock size={14} className="mt-0.5 flex-shrink-0 text-gray-400" />
          <div>
            <p>Início: {horaInicio}</p>
            <p>Fim: &nbsp;&nbsp;&nbsp;{horaFim}</p>
          </div>
        </div>
      </div>
    </li>
  );
};

// --- DASHBOARD PRINCIPAL DO MÉDICO (FOCO NO HISTÓRICO) ---
export default function DashboardMedicoPage() {
  const [historico, setHistorico] = useState([]);
  const [loadingHistorico, setLoadingHistorico] = useState(true);
  const [historicoError, setHistoricoError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState("");

  const fetchHistorico = useCallback(async () => {
    setLoadingHistorico(true);
    try {
      const token = localStorage.getItem("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const historicoRes = await api.get("/atendimentos/historico", { headers });
      setHistorico(historicoRes.data);
      setHistoricoError("");
    } catch (err) {
      console.error(err);
      setHistoricoError("Não foi possível carregar o histórico de atendimentos.");
    } finally {
      setLoadingHistorico(false);
    }
  }, []);

  useEffect(() => {
    fetchHistorico();
  }, [fetchHistorico]);

  const filteredHistorico = useMemo(
    () =>
      historico.filter((r) => {
        const nomePaciente = r?.paciente?.nome?.toLowerCase() || "";
        const matchNome = nomePaciente.includes(searchTerm.toLowerCase());
        if (filterDate) {
          const dataAtendimento = r?.horaFim
            ? new Date(r.horaFim).toISOString().split("T")[0]
            : "";
          return matchNome && dataAtendimento === filterDate;
        }
        return matchNome;
      }),
    [historico, searchTerm, filterDate]
  );

  const clearFilters = () => {
    setSearchTerm("");
    setFilterDate("");
  };

  return (
    <main className="min-h-screen p-4 font-sans bg-slate-50 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Painel do Médico</h1>
          <p className="mt-1 text-gray-600">
            Consulte o histórico de atendimentos realizados.
          </p>
        </header>

        <section className="bg-white border border-gray-100 shadow-sm rounded-xl">
          <header className="flex items-center gap-3 p-4 border-b border-gray-100">
            <History className="text-indigo-500" size={20} />
            <h2 className="font-semibold text-gray-800">
              Histórico de Atendimentos
            </h2>
          </header>

          <div className="flex flex-col gap-3 p-4 border-b border-gray-100 sm:flex-row sm:items-center bg-slate-50/80">
            <div className="relative flex-1">
              <Search className="absolute w-4 h-4 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
              <input
                type="text"
                placeholder="Buscar por nome do paciente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-2 pl-10 pr-4 text-sm text-gray-700 transition-shadow bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="px-4 py-2 text-sm text-gray-700 transition-shadow bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            {(searchTerm || filterDate) && (
              <button
                onClick={clearFilters}
                className="flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-red-600 bg-red-100 rounded-lg hover:bg-red-200"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <div className="p-4 space-y-4">
            {loadingHistorico
              ? Array.from({ length: 5 }).map((_, i) => <SkeletonLoader key={i} />)
              : historicoError
              ? <InfoState icon={<ServerCrash size={32} className="text-red-500"/>} title="Erro ao Carregar" message={historicoError} />
              : historico.length === 0
              ? <InfoState icon={<Inbox size={32} className="text-gray-400" />} title="Nenhum Registro Encontrado" message="Ainda não há atendimentos no histórico." />
              : filteredHistorico.length === 0
              ? <InfoState icon={<Search size={32} className="text-gray-400" />} title="Nenhum Resultado" message="Nenhum registro corresponde aos filtros aplicados." />
              : <ul className="space-y-3">
                  {filteredHistorico.map((r) => (
                    <HistoricoItem key={r.id} registro={r} />
                  ))}
                </ul>}
          </div>
        </section>
      </div>
    </main>
  );
}