import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import lifeInicial from '../../../assets/service/life-inicial.png';
import lifePrimario from '../../../assets/service/life-primario.png';
import lifeSecundario from '../../../assets/service/life-secundario.png';
import lifeDeportes from '../../../assets/service/life-deportes.png';

const cardItems = [
  {
    id: 'inicial',
    title: 'Nivel Inicial',
    subtitle: 'Juego y Exploración',
    desc: 'Iniciamos el aprendizaje estimulando la curiosidad natural a través de la socialización creativa.',
    img: lifeInicial,
  },
  {
    id: 'primario',
    title: 'Nivel Primario',
    subtitle: 'Habilidades Fundamentales',
    desc: 'Formamos las bases académicas sólidas con inglés intensivo, artes y valores esenciales.',
    img: lifePrimario,
  },
  {
    id: 'secundario',
    title: 'Nivel Secundario',
    subtitle: 'Tecnología y Futuro',
    desc: 'Preparación de excelencia enfocada en IT, economía y competencias para el siglo XXI.',
    img: lifeSecundario,
  },
  {
    id: 'deportes',
    title: 'Vida Activa',
    subtitle: 'Deporte y Disciplina',
    desc: 'Potenciamos la salud física, el trabajo en equipo y el liderazgo en el campo de juego.',
    img: lifeDeportes,
  },
];

export const FluidStackSection: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section className="pt-6 pb-10 px-4 max-w-7xl mx-auto flex flex-col items-center overflow-hidden">
      {/* Compact separating line */}
      <div className="w-full max-w-4xl mx-auto border-t border-slate-200 opacity-70 mb-12"></div>

      {/* Header Context */}
      <div className="text-center max-w-3xl mb-12">
        <h2 className="text-3xl md:text-5xl font-bold text-edu-dark tracking-tight mb-4">
          Vida Estudiantil
        </h2>
        <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
          La inspiración, el aprendizaje y la innovación se unen en nuestro campus, 
          creando el ecosistema perfecto para formar a los líderes del mañana.
        </p>
      </div>

      {/* Desktop Fluid Stack */}
      <div className="hidden md:flex w-full h-[450px] gap-3 mb-12">
        {cardItems.map((item) => {
          const isExpanded = expandedId === item.id;
          // If something is expanded, items that are NOT expanded shrink. If nothing is expanded, default is equal width.
          const flexValue = isExpanded ? '3' : (expandedId === null ? '1' : '0.5');

          return (
            <div
              key={item.id}
              onMouseEnter={() => setExpandedId(item.id)}
              onMouseLeave={() => setExpandedId(null)}
              style={{ flex: flexValue }}
              className="relative h-full rounded-2xl overflow-hidden cursor-pointer group transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
            >
              <div className="absolute inset-0 z-0">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/80" />
              </div>

              <div className={`absolute inset-0 z-10 p-8 flex flex-col justify-end text-white transition-opacity duration-300`}>
                <h3 className={`font-bold leading-tight tracking-tight transition-all duration-300 ${isExpanded ? 'text-4xl mb-2' : 'text-xl mb-0'}`}>
                  {item.title}
                </h3>
                <p className={`font-medium text-edu-accent transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
                  {item.subtitle}
                </p>
                <p 
                  className={`text-white/90 mt-4 max-w-md transition-all duration-300 ${isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 h-0 pointer-events-none overflow-hidden'}`}
                >
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile Stack View */}
      <div className="flex md:hidden flex-col w-full gap-4 mb-10">
        {cardItems.map((item) => (
          <div key={item.id} className="relative h-64 rounded-xl overflow-hidden">
            <img src={item.img} alt={item.title} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
              <h3 className="font-bold text-2xl">{item.title}</h3>
              <p className="text-sm text-white/90 mt-1">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <button className="inline-flex items-center gap-2 bg-edu-primary hover:bg-edu-secondary text-white font-semibold px-8 py-4 rounded-full shadow-lg shadow-edu-primary/20 hover:shadow-xl transition-all transform hover:-translate-y-0.5 cursor-pointer text-lg">
        <span>Descúbrelo</span>
        <ArrowRight size={20} />
      </button>
    </section>
  );
};
