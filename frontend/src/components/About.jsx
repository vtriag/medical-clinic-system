import React from "react";
import { ShieldCheck, HeartPulse, Cpu } from "lucide-react"; // ícones

const AboutUs = () => {
  const features = [
    {
      icon: <ShieldCheck className="w-10 h-10 text-blue-700" />,
      title: "Segurança",
      description:
        "Proteção total dos dados de pacientes e profissionais de saúde, com criptografia e conformidade legal.",
    },
    {
      icon: <HeartPulse className="w-10 h-10 text-blue-700" />,
      title: "Humanização",
      description:
        "Tecnologia aliada ao cuidado humano, garantindo experiências mais acolhedoras e eficientes.",
    },
    {
      icon: <Cpu className="w-10 h-10 text-blue-700" />,
      title: "Inovação",
      description:
        "Soluções modernas que integram processos hospitalares e otimizam a rotina de equipes médicas.",
    },
  ];

  return (
    <section id="about-us" className="px-6 py-16 bg-gray-50 md:py-24">
      <div className="container max-w-6xl mx-auto text-center">
        {/* Título */}
        <h2 className="font-sans text-3xl font-semibold text-blue-950 sm:text-4xl md:text-5xl">
          Sobre <span className="text-blue-700">Nós</span>
        </h2>

        {/* Texto */}
        <p className="mx-auto mt-6 text-base font-light leading-relaxed text-gray-700 md:text-lg md:max-w-3xl">
          Nosso sistema hospitalar foi desenvolvido para transformar a gestão de
          clínicas e hospitais. Conectamos pacientes, profissionais e equipes
          administrativas em uma única plataforma, garantindo mais eficiência,
          segurança e qualidade no atendimento.
        </p>

        {/* Features */}
        <div className="grid gap-8 mt-12 sm:grid-cols-2 md:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-6 text-center transition-shadow bg-white shadow-md rounded-xl hover:shadow-lg"
            >
              {feature.icon}
              <h3 className="mt-4 text-lg font-semibold text-blue-950">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
