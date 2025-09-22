import React, { useState } from 'react';
import Logo from "../assets/images/logo.svg";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#services', label: 'Services' },
    { href: '#about', label: 'About Us' },
    { href: '#speccialists', label: 'Our Speccialists' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-blue-400 to-blue-300">
      <div className="container flex items-center justify-between px-4 py-4 mx-auto">
        <a href="/" className="flex items-center space-x-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-950"
        >
          <img
            src={Logo}
            alt="Logo da Clínica Viver"
            className="object-contain w-10 h-10"
          />
          <h1 className="text-2xl font-bold text-blue-900">Clínica Viver</h1>
        </a>

        <nav aria-label="Primary navigation">
          <ul className="hidden space-x-8 md:flex">
            {navLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  className="text-gray-700 transition-colors duration-200 hover:text-blue-600 focus:outline-none focus:ring-pink-600 focus:rounded"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <button
          className="p-2 rounded md-hidden focus:outline-none focus:ring-2 focus:ring-blue-600"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          <svg
            className="w-6 h-6"
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
              ></path>
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              ></path>
            )}
          </svg>
        </button>
        {isMenuOpen && (
          <aside
            id="mobile-menu"
            className="absolute left-0 right-0 px-4 py-4 bg-white shadow-lg md:hidden top-16"
            aria-label="Mobile menu"
          >
            <nav aria-label="Mobile navigation">
              <ul className="flex flex-col space-y-4">
                {
                  navLinks.map[
                    (link, index) => (
                      <li key={index}>
                        <a
                          href={link.href}
                          className="block px-2 py-2 text-gray-700 transition-colors duration-200 hover:text-blue-600 focus:outline-none focus:ring-blue-600 focus:rounded"
                          onClick={toggleMenu}
                        >
                          {link.label}
                        </a>
                      </li>
                    )
                  ]
                }
              </ul>
            </nav>
          </aside>
        )}
        <nav className="hidden md:block" aria-label="Appointment booking">
          <a
            href="#appointment"
            className="px-6 py-2 text-white duration-200 bg-blue-600 rounded shadow-md transition-color hover:bg-blue-700-full focus-outline-none focus:ring-2 focus:ring-blue-800 focus:ring-offset-2"
          >
            Book Appointment
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
