import React from "react";
import HomeImage from "../assets/images/hero.jpg";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="flex flex-col items-center justify-center min-h-screen px-6 bg-white md:flex-row md:px-12"
    >
      {/* Coluna Texto */}
      <div className="flex-1 text-center md:text-left">
        <h2 className="font-sans text-3xl font-light leading-snug text-blue-950 sm:text-4xl md:text-5xl">
          <span className="block">Seja bem-vindo à</span>
          <span className="block mt-2 font-medium text-blue-700">
            Clínica Viver
          </span>
        </h2>

        <p className="mt-4 text-base font-light text-gray-700 md:text-lg">
          Mais que saúde, um cuidado humano para você viver melhor.
        </p>

        {/* CTA Home */}
        <div className="flex justify-center mt-6 space-x-3 md:justify-start">
          <a
            href="#services"
            className="px-5 py-2.5 text-sm md:text-base text-white bg-blue-900 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-950 focus:ring-offset-2"
          >
            Nossos Serviços
          </a>
        </div>
      </div>

      {/* Coluna Imagem (só aparece em desktop) */}
      <div className="justify-center flex-1 hidden mt-10 md:flex md:mt-0 md:ml-12">
        <img
          src={HomeImage}
          alt="Clínica Viver"
          className="object-contain w-full max-w-md shadow-lg md:max-w-lg rounded-xl"
        />
      </div>
    </section>
  );
};

export default HeroSection;
