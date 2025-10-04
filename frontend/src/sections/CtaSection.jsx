import React from "react";
import FundoCTA from "../assets/images/cta.jpg";

const CtaSection = () => {
  return (
    <section className="relative flex items-center justify-center w-full min-h-[70vh]">
      {/* Imagem de fundo */}
      <img
        src={FundoCTA}
        alt="Fundo"
        className="absolute inset-0 object-cover w-full h-full"
      />

      {/* Overlay sutil para contraste */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Conteúdo */}
      <div className="relative z-10 max-w-3xl px-6 text-center text-white">
        <h2 className="text-3xl font-light sm:text-4xl md:text-5xl">
          Saúde e tecnologia, lado a lado
        </h2>
        <p className="mt-4 text-base font-light text-gray-200 sm:text-lg md:text-xl">
          Um sistema hospitalar moderno para cuidar melhor de quem importa.
        </p>
      </div>
    </section>
  );
};

export default CtaSection;
