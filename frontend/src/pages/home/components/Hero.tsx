import React from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import heroPeople from '../../../assets/service/hero-view-future.png';

export const Hero: React.FC = () => {
  return (
    <section className="relative h-[95vh] w-full overflow-hidden flex items-end bg-edu-dark">
      {/* Dramatic background image covering full area */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src={heroPeople} 
          alt="Estudiantes colaborando en el campus" 
          className="w-full h-full object-cover object-center scale-100 animate-[ken-burns_30s_ease-in-out_infinite_alternate]"
        />
        {/* Deep unified dark bottom gradient with complete solid color coverage at baseline */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      </div>

      {/* Main Content anchored even deeper to the bottom to occupy full attention space */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pb-12 md:pb-20">
        <div className="max-w-4xl">
          {/* Subtle mini-label */}
          <div className="inline-block bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded mb-5">
            <span className="text-xs md:text-sm font-bold tracking-[0.15em] text-white uppercase">
              Comunidad Educativa
            </span>
          </div>

          {/* Re-calibrated larger header closer to center-bottom of frame */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white leading-[0.95] tracking-tighter mb-6 drop-shadow-xl">
            Formando el futuro <br /> 
            junto a ti
          </h1>

          <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-10 font-medium leading-relaxed drop-shadow">
            Vivi la excelencia de una educación diseñada para nutrir el potencial humano, inspirar valores sólidos y potenciar el talento de cada estudiante.
          </p>

          {/* Expanded prominent action buttons */}
          <div className="flex flex-wrap gap-4">
            <button className="inline-flex items-center gap-3 bg-edu-primary hover:bg-edu-secondary text-white font-bold px-10 py-4 text-sm md:text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all cursor-pointer group">
              <span>INSCRIBITE AQUÍ</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button className="inline-flex items-center gap-2 bg-white/10 border border-white/40 hover:bg-white hover:text-edu-dark text-white font-semibold px-8 py-4 text-sm md:text-base backdrop-blur-sm transition-all hover:-translate-y-1 cursor-pointer">
              SOLICITAR INFORMACIÓN
            </button>
          </div>
        </div>
      </div>

      {/* Fixed scroll indicator that stands out more */}
      <div className="absolute bottom-10 right-12 z-10 hidden lg:flex flex-col items-center gap-2 animate-bounce text-white/80">
        <ChevronDown size={24} />
      </div>

      <style>{`
        @keyframes ken-burns {
          0% { transform: scale(1); }
          100% { transform: scale(1.12); }
        }
      `}</style>
    </section>
  );
};
