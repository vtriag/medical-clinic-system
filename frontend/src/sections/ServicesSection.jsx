import React from "react";
import { HeartPulse, Stethoscope, Brain, Baby, Syringe, Microscope } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: <HeartPulse className="w-10 h-10 text-blue-700" />,
      title: "Cardiologia",
      description:
        "Atendimento especializado para prevenção, diagnóstico e tratamento de doenças do coração.",
    },
    {
      icon: <Stethoscope className="w-10 h-10 text-blue-700" />,
      title: "Clínica Geral",
      description:
        "Consultas médicas completas com foco em avaliação global e encaminhamento adequado.",
    },
    {
      icon: <Brain className="w-10 h-10 text-blue-700" />,
      title: "Neurologia",
      description:
        "Diagnóstico e acompanhamento de distúrbios do sistema nervoso, como enxaquecas e epilepsia.",
    },
    {
      icon: <Baby className="w-10 h-10 text-blue-700" />,
      title: "Pediatria",
      description:
        "Cuidado humanizado para crianças e adolescentes em todas as fases do desenvolvimento.",
    },
    {
      icon: <Syringe className="w-10 h-10 text-blue-700" />,
      title: "Vacinação",
      description:
        "Imunizações seguras e atualizadas para todas as idades, seguindo protocolos oficiais.",
    },
    {
      icon: <Microscope className="w-10 h-10 text-blue-700" />,
      title: "Exames Laboratoriais",
      description:
        "Resultados rápidos e confiáveis para apoiar diagnósticos e tratamentos médicos.",
    },
  ];

  return (
    <section id="services" className="px-6 py-16 bg-white md:py-24">
      <div className="container max-w-6xl mx-auto text-center">
        {/* Título */}
        <h2 className="font-sans text-3xl font-semibold text-blue-950 sm:text-4xl md:text-5xl">
          Nossos <span className="text-blue-700">Serviços</span>
        </h2>

        <p className="mx-auto mt-6 text-base font-light leading-relaxed text-gray-700 md:text-lg md:max-w-3xl">
          Contamos com uma equipe multidisciplinar e infraestrutura moderna para
          oferecer atendimento de excelência em diversas especialidades médicas.
        </p>

        {/* Cards */}
        <div className="grid gap-8 mt-12 sm:grid-cols-2 md:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-6 text-center transition-shadow shadow-md bg-gray-50 rounded-xl hover:shadow-lg"
            >
              {service.icon}
              <h3 className="mt-4 text-lg font-semibold text-blue-950">
                {service.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
