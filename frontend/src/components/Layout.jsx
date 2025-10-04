// frontend/src/components/Layout.jsx
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import HeaderAtendente from './HeaderAtendente';
import HeaderMedico from './HeaderMedico';
import Header from './Header'; // header padrão para visitantes
import Footer from './Footer';
import { useAuth } from '../contexts/AuthContext';

const Layout = () => {
  const location = useLocation();
  const { userType } = useAuth(); // 'atendente' | 'medico' | null

  const isLoginPage = location.pathname === '/login';

  let HeaderComponent = null;

  if (!isLoginPage) {
    if (userType === 'atendente') HeaderComponent = <HeaderAtendente />;
    else if (userType === 'medico') HeaderComponent = <HeaderMedico />;
    else HeaderComponent = <Header />;
  }

  return (
    <>
      {HeaderComponent}
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
