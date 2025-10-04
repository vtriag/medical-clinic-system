// src/components/LogoutButton.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutButton = ({ className }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove todas as informações do usuário
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userProfile"); // caso exista
    localStorage.removeItem("userId"); // caso exista

    // Redireciona para login
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className={`px-4 py-2 text-sm font-medium text-red-600 border border-red-200 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors duration-200 ${className || ""}`}
    >
      Sair
    </button>
  );
};

export default LogoutButton;
