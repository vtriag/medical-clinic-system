// src/components/Login.jsx
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Aqui você pode colocar a lógica de autenticação (API, JWT, etc.)
    console.log("Email:", email);
    console.log("Password:", password);
    alert("Login enviado!"); 
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-xl">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">Login</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="mb-1 text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-gray-700">Senha</label>
            <input
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="py-2 mt-4 text-white transition bg-blue-700 rounded-md hover:bg-blue-800"
          >
            Entrar
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-500">
          Não tem conta? <a href="/register" className="text-blue-600 hover:underline">Cadastre-se</a>
        </p>
      </div>
    </div>
  );
}
