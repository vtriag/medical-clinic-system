import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // <- import do hook
import { logiMedico } from "../services/medico";

const LoginMedico = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate(); // <- inicializa navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await logiMedico({ email, senha });

     if (response.token) {
  localStorage.setItem("token", response.token);
  navigate("/triagem");
} else {
        alert(response.message || "Erro no login");
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao conectar com o servidor");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-xl">
        <h2 className="mb-6 text-2xl font-bold text-center text-blue-900">
          Login Médico
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:ring focus:outline-none"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:ring focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-900 rounded-lg hover:bg-blue-700"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginMedico;
