import React from "react";
import { Facebook, Instagram, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 text-white bg-blue-900">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col items-center justify-between space-y-8 md:flex-row md:items-start md:space-y-0">
          
          {/* Logo e descrição */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <h2 className="mb-2 text-3xl font-bold">
              Clínica <span className="text-blue-300">Viver</span>
            </h2>
            <p className="max-w-sm text-sm text-gray-200">
              Cuidando da sua saúde e bem-estar com dedicação e profissionalismo.
            </p>
          </div>
          
          {/* Links rápidos */}
          <div className="text-center md:text-left">
            <h3 className="mb-4 text-lg font-semibold">Links</h3>
            <ul className="space-y-2 text-gray-200">
              <li>
                <a href="#home" className="transition-colors duration-200 hover:text-blue-300">
                  Início
                </a>
              </li>
              <li>
                <a href="#servicos" className="transition-colors duration-200 hover:text-blue-300">
                  Serviços
                </a>
              </li>
              <li>
                <a href="#sobre" className="transition-colors duration-200 hover:text-blue-300">
                  Sobre Nós
                </a>
              </li>
            </ul>
          </div>
          
          {/* Redes sociais */}
          <div className="text-center md:text-left">
            <h3 className="mb-4 text-lg font-semibold">Siga-nos</h3>
            <div className="flex justify-center space-x-4 md:justify-start">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-200 transition-colors duration-200 hover:text-blue-300"
              >
                <Facebook size={26} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-200 transition-colors duration-200 hover:text-blue-300"
              >
                <Instagram size={26} />
              </a>
              <a 
                href="tel:+5511999999999" 
                className="text-gray-200 transition-colors duration-200 hover:text-blue-300"
              >
                <Phone size={26} />
              </a>
            </div>
          </div>
        </div>
        
        {/* Direitos Autorais */}
        <div className="mt-8 text-sm text-center text-gray-300">
          © {new Date().getFullYear()} Clínica Viver. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
