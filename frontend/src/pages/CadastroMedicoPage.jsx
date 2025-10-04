import React, { useState } from "react";
import api from "../api/api";

const especialidadesDisponiveis = [
  { value: "CLINICO_GERAL", label: "Clínico Geral" },
  { value: "CARDIOLOGIA", label: "Cardiologia" },
  { value: "PEDIATRIA", label: "Pediatria" },
  { value: "ORTOPEDIA", label: "Ortopedia" },
  { value: "GINECOLOGIA", label: "Ginecologia" },
  { value: "DERMATOLOGIA", label: "Dermatologia" },
  { value: "NEUROLOGIA", label: "Neurologia" },
  { value: "PSIQUIATRIA", label: "Psiquiatria" },
  { value: "OUTRA", label: "Outra" },
];

const CadastroMedicoPage = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [especialidade, setEspecialidade] = useState(""); // Estado inicial vazio
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!nome || !email || !senha || !especialidade) {
      setError("Preencha todos os campos obrigatórios.");
      return;
    }

    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Acesso não autorizado. Faça o login novamente.");
        setIsLoading(false);
        return;
      }

      // Linha corrigida
    const response = await api.post(
      "/auth/register/medico", // Rota correta, igual à do backend
      { nome, email, senha, especialidade },
      { headers: { Authorization: `Bearer ${token}` } }
    );
      
      setSuccess(response.data.message || "Médico cadastrado com sucesso!");
      // Limpa o formulário após o sucesso
      setNome("");
      setEmail("");
      setSenha("");
      setEspecialidade("");
    } catch (err) {
      // Exibe a mensagem de erro específica vinda do backend
      setError(err.response?.data?.error || "Erro ao cadastrar médico. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-xl">
        <h2 className="text-2xl font-bold text-center text-gray-800">Cadastrar Novo Médico</h2>
        
        {error && <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg">{error}</div>}
        {success && <div className="p-3 text-sm text-green-700 bg-green-100 rounded-lg">{success}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="nome" className="block mb-2 text-sm font-medium text-gray-700">Nome Completo</label>
            <input
              id="nome"
              type="text"
              placeholder="Dr. João da Silva"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              placeholder="joao.silva@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="senha" className="block mb-2 text-sm font-medium text-gray-700">Senha</label>
            <input
              id="senha"
              type="password"
              placeholder="••••••••"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="especialidade" className="block mb-2 text-sm font-medium text-gray-700">Especialidade</label>
            <select
              id="especialidade"
              value={especialidade}
              onChange={(e) => setEspecialidade(e.target.value)}
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" disabled>Selecione uma especialidade</option>
              {especialidadesDisponiveis.map((esp) => (
                <option key={esp.value} value={esp.value}>
                  {esp.label}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            {isLoading ? "Cadastrando..." : "Cadastrar Médico"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CadastroMedicoPage;