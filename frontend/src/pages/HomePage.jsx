// src/pages/HomePage.jsx

import React from 'react';
import HeroSection from '../sections/HeroSection';
import AboutSection from '../sections/AboutSection';
import ServicesSection from '../sections/ServicesSection';
import CtaSection from '../sections/CtaSection';

function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <CtaSection />
    </>
  );
}

export default HomePage;