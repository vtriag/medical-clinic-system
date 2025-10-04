// contexts/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userType, setUserType] = useState(null); // 'atendente' | 'medico' | null

  useEffect(() => {
    // Carrega do localStorage se o usuário já estiver logado
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser?.perfil) {
      setUserType(storedUser.perfil);
    }
  }, []);

  const login = (perfil) => {
    setUserType(perfil);
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUserType(null);
  };

  return (
    <AuthContext.Provider value={{ userType, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
