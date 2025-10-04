// src/pages/ReportPage.jsx
import React, { useState, useEffect } from 'react';
import ExportButton from '../components/ExportButton';
import api from '../api/api';
import { Clock, Users, Stethoscope, ListTodo, ServerCrash, FileWarning } from 'lucide-react';

const exportToJSON = (data, filename = 'relatorio') => {
  if (!data || data.length === 0) return;
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${filename}.json`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const exportToCSV = (data, filename = 'relatorio') => {
  if (!data || data.length === 0) return;
  const dataArray = Array.isArray(data) ? data : [data];
  if (dataArray.length === 0) return;
  const headers = Object.keys(dataArray[0]);
  const rows = dataArray.map(obj =>
    headers.map(header => JSON.stringify(obj[header], (key, value) => value === null ? '' : value)).join(',')
  );
  const csv = [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const StatCard = ({ icon, title, value, unit }) => (
  <div className="flex flex-col p-6 transition-shadow duration-300 bg-white border shadow-sm border-slate-200 rounded-xl hover:shadow-lg">
    <div className="flex items-center justify-between">
      <h3 className="text-base font-medium text-slate-500">{title}</h3>
      <div className="p-2 bg-indigo-100 rounded-full">
        {React.cloneElement(icon, { className: "w-6 h-6 text-indigo-600" })}
      </div>
    </div>
    <p className="mt-2 text-3xl font-bold text-slate-800 sm:text-4xl">
      {value}
      {unit && <span className="ml-2 text-xl font-medium text-slate-400">{unit}</span>}
    </p>
  </div>
);

const ReportPanel = ({ title, icon, actions, children }) => (
  <div className="bg-white border shadow-sm border-slate-200 rounded-xl">
    <div className="flex flex-col items-start gap-3 p-4 border-b sm:flex-row sm:items-center sm:justify-between border-slate-200">
      <div className="flex items-center space-x-3">
        {React.cloneElement(icon, { className: "w-6 h-6 text-slate-500" })}
        <h2 className="text-lg font-normal text-slate-700">{title}</h2>
      </div>
      <div className="flex flex-wrap gap-2">{actions}</div>
    </div>
    <div className="p-4">{children}</div>
  </div>
);

const ReportPage = () => {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Pegando o token do localStorage (depois do login)
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Usuário não autenticado');

        const response = await api.get('/relatorios/estatisticas', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setReportData(response.data);
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
        setError('Falha ao carregar o relatório. Verifique a conexão ou se você está autenticado.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleExport = (format, dataToExport, filename) => {
    if (!dataToExport || dataToExport.length === 0) return;
    if (format === 'json') exportToJSON(dataToExport, filename);
    if (format === 'csv') exportToCSV(dataToExport, filename);
  };

  const totalPacientesFila = reportData?.pacientesNaFilaPorPrioridade?.reduce((acc, item) => acc + item.quantidade, 0) || 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-50">
        <div className="text-center">
          <svg className="w-12 h-12 mx-auto text-indigo-500 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-4 text-lg font-medium text-slate-600">Carregando estatísticas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-50">
        <div className="p-8 text-center bg-white border border-red-200 rounded-lg shadow-md">
          <ServerCrash className="w-16 h-16 mx-auto text-red-500" />
          <h2 className="mt-4 text-2xl font-bold text-slate-800">Oops! Algo deu errado.</h2>
          <p className="mt-2 text-slate-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-slate-50">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-3xl font-light tracking-tight text-slate-700 sm:text-4xl">Dashboard de Estatísticas</h1>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={<Clock />}
            title="Tempo Médio Atendimento"
            value={reportData?.tempoMedioAtendimentoMinutos?.toFixed(1) || 0}
            unit="min"
          />
          <StatCard
            icon={<Users />}
            title="Pacientes na Fila"
            value={totalPacientesFila}
          />
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Atendimentos por Médico */}
          <ReportPanel
            title="Atendimentos por Médico"
            icon={<Stethoscope />}
            actions={
              <>
                <ExportButton format="csv" onExport={() => handleExport('csv', reportData?.pacientesAtendidosPorMedico, 'atendimentos_por_medico')} disabled={!reportData?.pacientesAtendidosPorMedico?.length} />
                <ExportButton format="json" onExport={() => handleExport('json', reportData?.pacientesAtendidosPorMedico, 'atendimentos_por_medico')} disabled={!reportData?.pacientesAtendidosPorMedico?.length} />
              </>
            }
          >
            <div className="w-full overflow-x-auto">
              <table className="min-w-full text-sm divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-xs font-medium tracking-wider text-left uppercase text-slate-500">Médico</th>
                    <th className="px-4 py-3 text-xs font-medium tracking-wider text-left uppercase text-slate-500">Total de Atendimentos</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {reportData?.pacientesAtendidosPorMedico?.length > 0 ? (
                    reportData.pacientesAtendidosPorMedico.map((item, index) => (
                      <tr key={index} className="hover:bg-slate-50">
                        <td className="px-4 py-3 whitespace-nowrap">{item.medico}</td>
                        <td className="px-4 py-3 font-semibold whitespace-nowrap">{item.totalAtendimentos}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2" className="px-4 py-12 text-center">
                        <FileWarning className="w-12 h-12 mx-auto text-slate-300" />
                        <p className="mt-2 text-sm text-slate-500">Nenhum dado disponível.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </ReportPanel>

          {/* Fila por Prioridade */}
          <ReportPanel
            title="Fila por Prioridade"
            icon={<ListTodo />}
            actions={
              <>
                <ExportButton format="csv" onExport={() => handleExport('csv', reportData?.pacientesNaFilaPorPrioridade, 'fila_por_prioridade')} disabled={!reportData?.pacientesNaFilaPorPrioridade?.length} />
                <ExportButton format="json" onExport={() => handleExport('json', reportData?.pacientesNaFilaPorPrioridade, 'fila_por_prioridade')} disabled={!reportData?.pacientesNaFilaPorPrioridade?.length} />
              </>
            }
          >
            <div className="w-full overflow-x-auto">
              <table className="min-w-full text-sm divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-xs font-medium tracking-wider text-left uppercase text-slate-500">Prioridade</th>
                    <th className="px-4 py-3 text-xs font-medium tracking-wider text-left uppercase text-slate-500">Quantidade</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {reportData?.pacientesNaFilaPorPrioridade?.length > 0 ? (
                    reportData.pacientesNaFilaPorPrioridade.map((item, index) => (
                      <tr key={index} className="hover:bg-slate-50">
                        <td className="px-4 py-3">
                          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                            item.prioridade === 'ALTA' ? 'bg-red-100 text-red-800' :
                            item.prioridade === 'MEDIA' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {item.prioridade}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-semibold whitespace-nowrap">{item.quantidade}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2" className="px-4 py-12 text-center">
                        <FileWarning className="w-12 h-12 mx-auto text-slate-300" />
                        <p className="mt-2 text-sm text-slate-500">Nenhum paciente na fila.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </ReportPanel>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
