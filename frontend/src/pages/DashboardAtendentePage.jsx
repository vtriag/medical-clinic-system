import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Plus, Users, History, ServerCrash, Inbox, Search, X, Clock } from 'lucide-react';
import api from '../api/api';

// --- MODAL DE CADASTRO ---
const CadastroPacienteModal = ({ isOpen, onClose, onCadastroSuccess }) => {
  const [nome, setNome] = useState('');
  const [motivo, setMotivo] = useState('');
  const [prioridade, setPrioridade] = useState('VERDE');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (isOpen) {
      setNome('');
      setMotivo('');
      setPrioridade('VERDE');
      setError('');
      setSuccess('');
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const handleSubmit = async e => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setError('');
    setSuccess('');
    try {
      const token = localStorage.getItem('token');
      await api.post('/pacientes/cadastrar', { nome, motivo, prioridade }, { headers: { Authorization: `Bearer ${token}` } });
      setSuccess('Paciente adicionado à fila com sucesso!');
      onCadastroSuccess();
      setTimeout(() => onClose(), 1500);
    } catch (err) {
      const message = err.response?.data?.error || 'Erro ao cadastrar paciente.';
      setError(message);
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="relative w-full max-w-md p-6 bg-white shadow-2xl rounded-xl">
        <button onClick={onClose} className="absolute text-gray-400 top-4 right-4 hover:text-gray-600">
          <X size={20} />
        </button>
        <h2 className="mb-6 text-xl font-semibold text-gray-800">Adicionar Novo Paciente</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">Nome Completo</label>
            <input type="text" value={nome} onChange={e => setNome(e.target.value)} required
              className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">Motivo do Atendimento</label>
            <textarea value={motivo} onChange={e => setMotivo(e.target.value)} required rows={3}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">Prioridade</label>
            <select value={prioridade} onChange={e => setPrioridade(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
              <option value="VERDE">Normal</option>
              <option value="AMARELO">Intermediário</option>
              <option value="VERMELHO">Urgente</option>
            </select>
          </div>
          {error && <div className="p-3 text-sm text-center text-red-800 bg-red-100 rounded-lg">{error}</div>}
          {success && <div className="p-3 text-sm text-center text-green-800 bg-green-100 rounded-lg">{success}</div>}
          <div className="flex flex-col justify-end gap-2 pt-4 sm:flex-row">
            <button type="button" onClick={onClose} disabled={isSubmitting}
              className="px-5 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 disabled:opacity-50">
              Cancelar
            </button>
            <button type="submit" disabled={isSubmitting}
              className="px-5 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50">
              {isSubmitting ? 'Adicionando...' : 'Adicionar à Fila'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- AUXILIARES ---
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
  <div className="flex flex-col items-center justify-center h-full p-8 text-center text-gray-500 rounded-lg bg-slate-50">
    <div className="p-4 mb-4 bg-gray-200 rounded-full">{icon}</div>
    <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
    <p className="text-sm">{message}</p>
  </div>
);

const HistoricoItem = ({ registro }) => {
  const priorityStyles = {
    VERMELHO: 'bg-red-100 text-red-800',
    AMARELO: 'bg-yellow-100 text-yellow-800',
    VERDE: 'bg-green-100 text-green-800',
    DEFAULT: 'bg-gray-100 text-gray-800',
  };
  const pacienteNome = registro?.paciente?.nome || 'Não informado';
  const motivo = registro?.paciente?.motivo || 'Não informado';
  const prioridade = registro?.paciente?.prioridade || 'DEFAULT';
  const medicoNome = registro?.medico?.nome || 'Não atribuído';
  const formatDate = dateString => dateString ? new Date(dateString).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '-';
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
            <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${priorityStyles[prioridade]}`}>
              Triagem: {prioridade.charAt(0) + prioridade.slice(1).toLowerCase()}
            </span>
          </div>
        </div>
        <div className="text-sm md:col-span-2">
          <p className="text-gray-700"><span className="font-semibold text-gray-800">Motivo da Visita:</span> {motivo}</p>
          <p className="text-gray-700"><span className="font-semibold text-gray-800">Médico Responsável:</span> {medicoNome}</p>
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

// --- DASHBOARD ---
export default function DashboardAtendentePage() {
  const [fila, setFila] = useState([]);
  const [historico, setHistorico] = useState([]);
  const [loadingFila, setLoadingFila] = useState(true);
  const [loadingHistorico, setLoadingHistorico] = useState(true);
  const [filaError, setFilaError] = useState('');
  const [historicoError, setHistoricoError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchFila = useCallback(async () => {
    setLoadingFila(true);
    setFilaError('');
    try {
      const token = localStorage.getItem('token');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const res = await api.get('/atendimentos/fila', { headers });
      setFila(res.data);
    } catch (err) {
      console.error(err);
      setFilaError('Não foi possível carregar os dados da fila.');
    } finally {
      setLoadingFila(false);
    }
  }, []);

  const fetchHistorico = useCallback(async () => {
    setLoadingHistorico(true);
    setHistoricoError('');
    try {
      const token = localStorage.getItem('token');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const res = await api.get('/atendimentos/historico', { headers });
      setHistorico(res.data);
    } catch (err) {
      console.error(err);
      setHistoricoError('Não foi possível carregar o histórico.');
    } finally {
      setLoadingHistorico(false);
    }
  }, []);

  const fetchData = useCallback(() => {
    fetchFila();
    fetchHistorico();
  }, [fetchFila, fetchHistorico]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCadastroSuccess = () => fetchData();

  const sortedFila = [...fila].sort(
    (a, b) => ({ VERMELHO: 1, AMARELO: 2, VERDE: 3 }[a.prioridade] - { VERMELHO: 1, AMARELO: 2, VERDE: 3 }[b.prioridade])
  );

  const filteredHistorico = useMemo(
    () =>
      historico.filter(r => {
        const nomePaciente = r?.paciente?.nome?.toLowerCase() || '';
        const matchNome = nomePaciente.includes(searchTerm.toLowerCase());
        if (filterDate) {
          const dataAtendimento = r?.horaFim ? new Date(r.horaFim).toISOString().split('T')[0] : '';
          return matchNome && dataAtendimento === filterDate;
        }
        return matchNome;
      }),
    [historico, searchTerm, filterDate]
  );

  const clearFilters = () => {
    setSearchTerm('');
    setFilterDate('');
  };

  const priorityStylesFila = {
    VERMELHO: { dot: 'bg-red-500' },
    AMARELO: { dot: 'bg-yellow-500' },
    VERDE: { dot: 'bg-green-500' },
  };

  return (
    <>
      <CadastroPacienteModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onCadastroSuccess={handleCadastroSuccess} />
      <main className="min-h-screen p-4 font-sans bg-slate-50 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
          <header className="flex flex-col items-center justify-between gap-4 mb-8 sm:flex-row">
            <h1 className="text-3xl font-bold text-center text-gray-800 sm:text-left">
              Seja bem-vindo, atendente!
            </h1>
            <button onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 rounded-lg shadow-sm hover:bg-indigo-700 active:scale-95">
              <Plus size={16} /> Novo Paciente
            </button>
          </header>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* FILA */}
            <section className="flex flex-col bg-white border border-gray-100 shadow-sm rounded-xl">
              <header className="flex items-center gap-3 p-4 border-b border-gray-100">
                <Users className="text-indigo-500" size={20} />
                <h2 className="font-semibold text-gray-800">Fila de Atendimento</h2>
              </header>
              <div className="p-4 space-y-4 overflow-auto max-h-[60vh]">
                {loadingFila ? (
                  Array.from({ length: 5 }).map((_, i) => <SkeletonLoader key={i} />)
                ) : filaError ? (
                  <InfoState icon={<ServerCrash size={32} className="text-red-500" />} title="Erro" message={filaError} />
                ) : sortedFila.length === 0 ? (
                  <InfoState icon={<Inbox size={32} className="text-gray-400" />} title="Fila Vazia" message="Não há pacientes aguardando." />
                ) : (
                  <ul className="space-y-3">
                    {sortedFila.map(p => (
                      <li key={p.id} className="flex items-start p-3 transition-colors bg-white border border-gray-100 rounded-lg hover:bg-gray-50/80">
                        <div className={`flex-shrink-0 w-2.5 h-2.5 mt-2 mr-4 rounded-full ${priorityStylesFila[p.prioridade]?.dot}`}></div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">{p.nome}</p>
                          <p className="text-sm text-gray-500">{p.motivo}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>

            {/* HISTÓRICO */}
            <section className="flex flex-col bg-white border border-gray-100 shadow-sm rounded-xl">
              <header className="flex items-center gap-3 p-4 border-b border-gray-100">
                <History className="text-indigo-500" size={20} />
                <h2 className="font-semibold text-gray-800">Histórico de Atendimentos</h2>
              </header>
              <div className="flex flex-col gap-3 p-4 border-b border-gray-100 sm:flex-row sm:items-center bg-slate-50/80">
                <div className="relative flex-1">
                  <Search className="absolute w-4 h-4 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
                  <input type="text" placeholder="Buscar por nome..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                    className="w-full py-2 pl-10 pr-4 text-sm text-gray-700 transition-shadow bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                <input type="date" value={filterDate} onChange={e => setFilterDate(e.target.value)}
                  className="px-4 py-2 text-sm text-gray-700 transition-shadow bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
                {(searchTerm || filterDate) && (
                  <button onClick={clearFilters} className="flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-red-600 bg-red-100 rounded-lg hover:bg-red-200">
                    <X size={14} />
                  </button>
                )}
              </div>

              <div className="p-4 space-y-4 overflow-auto max-h-[calc(60vh-100px)]">
                {loadingHistorico ? (
                  Array.from({ length: 5 }).map((_, i) => <SkeletonLoader key={i} />)
                ) : historicoError ? (
                  <InfoState icon={<ServerCrash size={32} className="text-red-500" />} title="Erro" message={historicoError} />
                ) : historico.length === 0 ? (
                  <InfoState icon={<Inbox size={32} className="text-gray-400" />} title="Nenhum Registro" message="O histórico está vazio." />
                ) : filteredHistorico.length === 0 ? (
                  <InfoState icon={<Search size={32} className="text-gray-400" />} title="Nenhum Resultado" message="Nenhum registro encontrado." />
                ) : (
                  <ul className="space-y-3">{filteredHistorico.map(r => <HistoricoItem key={r.id} registro={r} />)}</ul>
                )}
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
