import React from 'react';
import { ArrowRight } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-edu-primary to-edu-secondary text-white py-20 px-4 overflow-hidden">
      {/* Decorative circles to match wireframe visual hints */}
      <div className="absolute top-[-60px] right-[-40px] w-64 h-64 rounded-full bg-white/5 pointer-events-none" />
      <div className="absolute bottom-[-20px] left-10 w-40 h-40 rounded-full bg-white/4 pointer-events-none" />

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
