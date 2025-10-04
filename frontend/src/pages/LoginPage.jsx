// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api'; // Axios configurado
import { useAuth } from '../contexts/AuthContext';

// Ícone do olho (mostrar/ocultar senha)
const EyeIcon = ({ closed }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
       strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
    {closed ? (
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 
      7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 
      10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 
      10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 
      3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 
      0a3 3 0 10-4.243-4.243m4.243 4.243L6.228 6.228" />
    ) : (
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 
      010-.639C3.423 7.51 7.36 4.5 12 
      4.5c4.638 0 8.573 3.007 9.963 
      7.178.07.207.07.432 0 .639C20.577 
      16.49 16.64 19.5 12 19.5c-4.638 
      0-8.573-3.007-9.963-7.178z" />
    )}
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth(); // pega função do AuthContext

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Por favor, preencha o email e a senha.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.post('/auth/login', { email, senha: password });
      const { token, perfil, id, nome } = response.data;

      // Salva no localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({ id, nome, perfil }));

      // Atualiza contexto
      login(perfil);

      // Redireciona conforme perfil
      if (perfil === 'medico') navigate('/dashboard-medico');
      else if (perfil === 'atendente') navigate('/dashboard-atendente');
      else navigate('/');
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Não foi possível conectar ao servidor.';
      setError(errorMessage);
      console.error('Erro no login:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="flex w-full max-w-5xl overflow-hidden bg-white shadow-2xl rounded-3xl">
        
        {/* Painel Esquerdo (Branding) */}
        <div className="flex-col justify-center flex-1 hidden p-12 text-white bg-blue-600 lg:flex">
          <div className="max-w-md">
            <h2 className="text-lg font-light tracking-wider">Seja bem-vindo à</h2>
            <h1 className="mt-2 mb-6 text-4xl font-bold">Clínica Viver</h1>
            <p className="leading-relaxed text-blue-100">
              Sistema de gestão para médicos e atendentes, simples e intuitivo.
            </p>
          </div>
        </div>

        {/* Painel Direito (Formulário) */}
        <div className="flex flex-col justify-center w-full p-8 lg:w-1/2 md:p-16">
          <div className="w-full max-w-md mx-auto">
            <h3 className="mb-2 text-3xl font-semibold text-gray-800">Sign in</h3>
            <p className="mb-8 text-gray-500">Acesse sua conta com email e senha</p>
            
            <form onSubmit={handleLogin} noValidate>
              <div className="mb-5">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu.email@exemplo.com"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="mb-5">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center px-4"
                  >
                    <EyeIcon closed={showPassword} />
                  </button>
                </div>
              </div>
              
              {error && (
                <div className="relative px-4 py-3 mb-5 text-center text-red-700 bg-red-100 border border-red-400 rounded-lg" role="alert">
                  <span className="block sm:inline">{error}</span>
                </div>
              )}

              <div className="flex items-center justify-between mb-6 text-sm">
                <div className="flex items-center">
                  <input type="checkbox" id="remember" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                  <label htmlFor="remember" className="ml-2 text-gray-600">Remember me</label>
                </div>
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">Forgot Password?</a>
              </div>
              
              <button 
                type="submit" 
                className="w-full px-4 py-3 font-bold text-white transition-colors duration-300 bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:bg-blue-400 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? 'Entrando...' : 'Sign In'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
