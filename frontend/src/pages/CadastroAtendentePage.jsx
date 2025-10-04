import React, { useState } from "react";
import api from "../api/api"; // Certifique-se que o caminho para sua API está correto

const CadastroAtendentePage = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!nome || !email || !senha) {
      setError("Preencha todos os campos obrigatórios.");
      return;
    }

    setIsLoading(true);

    try {
      // Pega o token do usuário logado (que deve ser outro atendente)
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Acesso não autorizado. Faça o login novamente.");
        setIsLoading(false);
        return;
      }

      // **CHAMADA CORRIGIDA PARA A ROTA DO BACKEND**
      const response = await api.post(
        "/auth/register/atendente", // Rota correta
        { nome, email, senha },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccess(response.data.message || "Atendente cadastrado com sucesso!");
      // Limpa o formulário após o sucesso
      setNome("");
      setEmail("");
      setSenha("");
    } catch (err) {
      // Exibe a mensagem de erro específica vinda do backend
      setError(err.response?.data?.error || "Erro ao cadastrar atendente. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-xl">
        <h2 className="text-2xl font-bold text-center text-gray-800">Cadastrar Novo Atendente</h2>
        
        {error && <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg">{error}</div>}
        {success && <div className="p-3 text-sm text-green-700 bg-green-100 rounded-lg">{success}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="nome" className="block mb-2 text-sm font-medium text-gray-700">Nome Completo</label>
            <input
              id="nome"
              type="text"
              placeholder="Maria Souza"
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
              placeholder="maria.souza@email.com"
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

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            {isLoading ? "Cadastrando..." : "Cadastrar Atendente"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CadastroAtendentePage;
