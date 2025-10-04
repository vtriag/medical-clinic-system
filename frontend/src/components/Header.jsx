import React, { useState } from "react";
import Logo from "../assets/images/logo.svg";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((s) => !s);
  };

  const navLinks = [
    { href: "#home", label: "Início" },
    { href: "#about-us", label: "Sobre Nós" },
    { href: "#services", label: "Nossos Serviços" },
  ];

  return (
    <header className="sticky top-0 z-50 font-sans bg-white shadow-md">
      <div className="container flex items-center justify-between px-4 py-4 mx-auto">
        {/* Logo */}
        <a
          href="/"
          className="flex items-center space-x-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <img
            src={Logo}
            alt="Logo da Clínica Viver"
            className="object-contain w-10 h-10"
          />
          <h1 className="text-2xl font-bold text-blue-950">Clínica Viver</h1>
        </a>

        {/* Desktop Menu */}
        <nav
          aria-label="Primary navigation"
          className="justify-center flex-grow hidden md:flex"
        >
          <ul className="flex space-x-8">
            {navLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  className="text-gray-700 transition-colors duration-200 rounded hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop Auth Button */}
        <nav className="hidden space-x-4 md:flex" aria-label="Authentication">
          <a
            href="/login"
            className="px-6 py-2 text-gray-700 border border-gray-400 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign In
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="p-2 rounded md:hidden focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          <svg
            className="w-6 h-6 text-blue-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <aside
          id="mobile-menu"
          className="absolute left-0 right-0 bg-white shadow-lg top-16 md:hidden"
          aria-label="Mobile navigation"
        >
          <nav>
            <ul className="flex flex-col px-4 py-4 space-y-4">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="block px-2 py-2 text-gray-700 transition-colors duration-200 rounded hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}

              {/* Mobile Auth Button */}
              <li>
                <a
                  href="/login"
                  className="block w-full px-2 py-2 text-center text-gray-700 border border-gray-400 rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </a>
              </li>
            </ul>
          </nav>
        </aside>
      )}
    </header>
  );
};

export default Header;
