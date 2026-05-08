import React from 'react';
import { Baby, BookOpen, GraduationCap, Clock, Globe, Laptop, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Página informativa de la Oferta Académica (Niveles Educativos).
 * Describe el Nivel Inicial, Primario y Secundario con tarjetas y llamadas a la acción (CTA).
 */
export const LevelsPage: React.FC = () => {
  // Arreglo de los distintos niveles formativos del colegio con estilos de fondos personalizados
  const levels = [
    {
      icon: <Baby size={32} className="text-edu-primary" />,
      title: 'Nivel Inicial',
      chip: 'Salas 3, 4 y 5 años',
      desc: 'Aprendizaje a través del juego y la exploración. Primeros pasos en la socialización y el desarrollo cognitivo y emocional. Docentes especializadas en primera infancia.',
      bg: 'bg-[#D6EAF8]/50',
    },
    {
      icon: <BookOpen size={32} className="text-[#166534]" />,
      title: 'Nivel Primario',
      chip: '1° a 6° grado',
      desc: 'Desarrollo de habilidades fundamentales. Programa de inglés desde 1° grado. Educación física, artes y valores. Seguimiento personalizado del aprendizaje de cada estudiante.',
      bg: 'bg-[#DCFCE7]/50',
    },
    {
      icon: <GraduationCap size={32} className="text-[#92400E]" />,
      title: 'Nivel Secundario',
      chip: '1° a 5° año',
      desc: 'Orientaciones en Economía e Informática. Laboratorios tecnológicos y talleres prácticos de programación. Preparación de excelencia para el acceso universitario y el mundo laboral.',
      bg: 'bg-[#FEF3C7]/50',
    },
  ];

  // Pilares o propuestas pedagógicas destacadas al pie de la sección académica
  const highlights = [
    { icon: <Clock size={24} className="text-edu-primary" />, label: 'Jornada completa' },
    { icon: <Globe size={24} className="text-edu-primary" />, label: 'Inglés curricular' },
    { icon: <Laptop size={24} className="text-edu-primary" />, label: 'Laboratorios TIC' },
  ];

  return (
    <div className="animate-fadeIn">
      {/* Sección Hero: Encabezado contextual */}
      <section className="bg-gradient-to-br from-edu-primary to-edu-secondary text-white py-16 px-4 text-center relative overflow-hidden">
        <div className="absolute bottom-[-30px] right-[-30px] w-48 h-48 rounded-full bg-white/5 pointer-events-none" />
        <div className="max-w-3xl mx-auto relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Niveles Educativos</h1>
          <p className="text-edu-accent text-sm md:text-base max-w-xl mx-auto">
            Acompañamos a tus hijos en cada etapa de su desarrollo con una formación de calidad
          </p>
        </div>
      </section>

      {/* Sección de la Oferta Académica */}
      <section className="py-12 max-w-4xl mx-auto px-4">
        <h2 className="text-lg md:text-xl font-semibold text-edu-primary border-b border-edu-light pb-2 mb-8">
          Nuestra oferta académica
        </h2>

        <div className="space-y-8">
          {levels.map((level, index) => (
            <div key={index} className="flex flex-col sm:flex-row gap-6 items-start p-4 hover:bg-slate-50 rounded-lg transition-colors">
              {/* Contenedor del icono con fondo específico del nivel */}
              <div className={`w-20 h-20 min-w-20 rounded-lg ${level.bg} flex items-center justify-center shadow-sm`}>
                {level.icon}
              </div>

              {/* Información y chips descriptivos */}
              <div className="space-y-2 flex-grow">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-sm font-semibold text-edu-primary">{level.title}</h3>
                  <span className="bg-edu-light text-edu-primary border border-edu-accent/30 rounded-full px-3 py-0.5 text-[9px] font-medium">
                    {level.chip}
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{level.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Muestra de Pilares Pedagógicos Destacados */}
        <div className="mt-12 pt-8 border-t border-slate-100">
          <div className="grid grid-cols-3 gap-4">
            {highlights.map((item, index) => (
              <div
                key={index}
                className="bg-edu-card border border-slate-200/60 rounded-lg p-5 text-center flex flex-col items-center justify-center hover:shadow-sm transition-all"
              >
                <div className="w-10 h-10 rounded-full bg-edu-light flex items-center justify-center mb-2">
                  {item.icon}
                </div>
                <span className="text-[10px] font-semibold text-slate-600">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sección CTA: Banner inferior con redireccionamiento interactivo a la solicitud de admisión */}
      <section className="bg-edu-primary text-white py-12 px-4 text-center">
        <div className="max-w-xl mx-auto space-y-4">
          <h3 className="text-base md:text-lg font-bold">¿Querés formar parte de nuestra comunidad?</h3>
          <p className="text-edu-accent text-xs">Iniciá el proceso de inscripción para el ciclo lectivo 2025</p>
          
          <div className="flex gap-4 justify-center pt-2">
            <Link
              to="/inscripcion"
              className="inline-flex items-center gap-1.5 bg-white text-edu-primary hover:bg-slate-50 font-semibold text-xs px-5 py-2.5 rounded shadow-sm transition-all cursor-pointer"
            >
              <span>SOLICITAR INSCRIPCIÓN</span>
              <ArrowRight size={14} />
            </Link>
            <Link
              to="/"
              className="inline-flex items-center bg-transparent text-edu-accent hover:text-white border border-edu-accent hover:border-white text-xs px-5 py-2.5 rounded transition-all"
            >
              <span>CONTACTAR</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
