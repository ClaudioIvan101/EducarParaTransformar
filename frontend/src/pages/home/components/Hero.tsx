import React from 'react';
import { ArrowRight } from 'lucide-react';
import imagen_hero_principal from '../../../assets/service/hero-principal.jpg';

export const Hero: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-edu-primary to-edu-secondary text-white py-20 px-4 overflow-hidden">
      <img src={imagen_hero_principal} alt="" className='absolute inset-0 w-full h-full object-cover opacity-50' />
      {/* Decorative circles to match wireframe visual hints */}

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">
          Formando el futuro de Resistencia
        </h1>
        <p className="text-edu-accent text-sm md:text-lg mb-8 max-w-xl mx-auto">
          Educación de calidad en niveles Inicial, Primario y Secundario
        </p>
        <button className="inline-flex items-center gap-2 bg-white text-edu-primary hover:bg-slate-100 font-semibold px-6 py-3 rounded-md shadow-md hover:shadow-lg transition-all cursor-pointer">
          <span>INSCRIBITE AQUÍ</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </section>
  );
};
