// src/pages/RegisterMedicoPage.js
import React, { useState } from 'react';
import axios from 'axios';

const RegisterMedicoPage = () => {
  const [nome, setNome] = useState('');
  const [especialidade, setEspecialidade] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    // 1. Pega o token que foi guardado no localStorage
    const token = localStorage.getItem('authToken');

    if (!token) {
      setError('Você não está autenticado.');
      return;
    }

    try {
      // 2. Cria o cabeçalho de autorização
      const config = {
        headers: {
          Authorization: `Bearer ${token}` // Formato padrão: "Bearer SEU_TOKEN_AQUI"
        }
      };

      // 3. Envia os dados do novo médico JUNTO com o cabeçalho
      const response = await axios.post(
        'http://localhost:3000/api/auth/register/medico',
        { nome, especialidade, email, senha },
        config // Passa a configuração com o header aqui
      );
      
      setMessage(response.data.message); // "Médico cadastrado com sucesso!"

    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error); // Ex: "Acesso negado." ou "E-mail já cadastrado."
      } else {
        setError('Ocorreu um erro no cadastro.');
      }
    }
  };

  // Aqui iria o formulário de cadastro, similar ao de login
  return (
    <div>
      <h2>Cadastrar Novo Médico</h2>
      <form onSubmit={handleRegister}>
        {/* Campos para nome, especialidade, email, senha */}
        {/* ... */}
        <button type="submit">Cadastrar Médico</button>
        {message && <p style={{ color: 'green' }}>{message}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default RegisterMedicoPage;