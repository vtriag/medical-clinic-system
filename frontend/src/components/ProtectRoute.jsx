// src/components/ProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';

const ProtectRoute = ({ allowedProfiles }) => {
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;

  // Se não está logado, redireciona pro login
  if (!user) return <Navigate to="/login" replace />;

  // Se o perfil não está na lista de permitidos, redireciona para dashboard padrão
  if (!allowedProfiles.includes(user.perfil)) return <Navigate to="/dashboard" replace />;

  // Senão, renderiza a rota
  return <Outlet />;
};

export default ProtectRoute;
