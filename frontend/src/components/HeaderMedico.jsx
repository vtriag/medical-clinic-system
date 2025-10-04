import React, { useState } from "react";
import LogoutButton from '../components/LogoutButton';
import Logo from "../assets/images/logo.svg";

export default function HeaderMedico({ activePage }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((s) => !s);

  const navLinks = [
    { href: "/atendimento", label: "Tela de Atendimento" },
  ];

  return (
    <header className="sticky top-0 z-50 font-sans bg-white shadow-md">
      <div className="container flex items-center justify-between px-4 py-3 mx-auto">
        <a
          href="/atendimento"
          className="flex items-center space-x-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <img src={Logo} alt="Logo da Clínica Viver" className="object-contain w-10 h-10" />
          <h1 className="text-xl font-bold text-blue-950 md:text-2xl">Clínica Viver</h1>
        </a>

        <nav aria-label="Navegação Principal" className="justify-center flex-grow hidden md:flex">
          <ul className="flex space-x-6">
            {navLinks.map((link) => {
              const isActive = activePage === link.label;
              return (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className={`px-3 py-2 text-sm font-medium transition-colors duration-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      isActive ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:text-blue-600"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="items-center hidden md:flex">
          <LogoutButton />
        </div>

        <button
          className="p-2 rounded md:hidden focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={toggleMenu}
          aria-label="Abrir Menu"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          <svg className="w-6 h-6 text-blue-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <aside
          id="mobile-menu"
          className="absolute left-0 right-0 bg-white shadow-lg top-16 md:hidden"
          aria-label="Navegação Mobile"
        >
          <nav>
            <ul className="flex flex-col px-4 pt-2 pb-4 space-y-2">
              {navLinks.map((link) => {
                const isActive = activePage === link.label;
                return (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className={`block px-3 py-2 font-medium rounded transition-colors duration-200 ${
                        isActive
                          ? "text-blue-600 bg-blue-50"
                          : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}

              <li>
                <hr className="my-2 border-gray-200" />
              </li>

              <li className="px-3 py-2">
                <LogoutButton />
              </li>
            </ul>
          </nav>
        </aside>
      )}
    </header>
  );
}
