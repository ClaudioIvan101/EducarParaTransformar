import React, { useState, useEffect, useRef } from 'react';
import { 
  Brain, Heart, Trophy, BookOpen, ChevronDown, ChevronUp, Quote,
  Users, Stethoscope, Utensils, Bus, ShieldCheck, 
  GraduationCap, Smile, MessageSquare, Activity, ArrowRight
} from 'lucide-react';
import imagenHero from '../assets/service/hero-bienestar-estudiantil.jpg';

interface FAQ {
  question: string;
  answer: string;
}

// COMPONENTE ENVOLVENTE: CONTROL TOTAL DEL TIEMPO PARA ANIMACIONES SUAVES Y LENTAS
const ScrollReveal: React.FC<{ children: React.ReactNode; durationMs?: number; delayMs?: number }> = ({ 
  children, 
  durationMs = 2000, 
  delayMs = 0        
}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      { 
        rootMargin: '-60px 0px -60px 0px', 
        threshold: 0.05 
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        transitionProperty: 'all',
        transitionTimingFunction: 'cubic-bezier(0.25, 1, 0.5, 1)',
        transitionDuration: `${durationMs}ms`,
        transitionDelay: `${delayMs}ms`,
      }}
      className={`transform ${
        isIntersecting 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-24'
      }`}
    >
      {children}
    </div>
  );
};

export const BienestarPage: React.FC = () => {
  const pilares = [
    { 
      icon: <Brain size={24} />, 
      title: 'Gabinete Psicopedagógico', 
      desc: 'Apoyo emocional y orientación escolar personalizada para superar desafíos de aprendizaje.',
      image: 'https://images.unsplash.com/photo-1516534775068-ba3e7458af70?q=80&w=600' 
    },
    { 
      icon: <Heart size={24} />, 
      title: 'Salud y Nutrición', 
      desc: 'Seguimiento de hábitos saludables, coordinación de la enfermería y menús del comedor.',
      image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=600' 
    },
    { 
      icon: <Trophy size={24} />, 
      title: 'Actividades Extracurriculares', 
      desc: 'Talleres formativos, disciplinas artísticas y proyectos de fuerte impacto comunitario.',
      image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=600' 
    },
    { 
      icon: <BookOpen size={24} />, 
      title: 'Tutorías', 
      desc: 'Espacios de refuerzo personalizado para consolidar los objetivos académicos individuales.',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=600' 
    },
  ];

  const servicios = [
    { 
      icon: <Users size={24} />, 
      title: 'Acompañamiento Estudiantil', 
      desc: 'Orientación psicopedagógica y talleres de contención emocional para los alumnos.',
      image: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?q=80&w=600' 
    },
    { 
      icon: <Stethoscope size={24} />, 
      title: 'Enfermería', 
      desc: 'Atención primaria de salud y asistencia inmediata ante cualquier eventualidad médica.',
      image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=600' 
    },
    { 
      icon: <Utensils size={24} />, 
      title: 'Comedor Escolar', 
      desc: 'Menús balanceados y supervisados por especialistas para un óptimo desarrollo.',
      image: 'https://images.unsplash.com/photo-1555243896-c709bfa0b564?q=80&w=600' 
    },
    { 
      icon: <Trophy size={24} />, 
      title: 'Actividades Deportivas', 
      desc: 'Fomento de la salud física, el compañerismo y la disciplina a través del deporte.',
      image: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?q=80&w=600' 
    },
    { 
      icon: <Bus size={24} />, 
      title: 'Transporte Escolar', 
      desc: 'Servicio seguro, regulado y coordinado para la tranquilidad de las familias.',
      image: 'https://images.unsplash.com/photo-1557223562-6c77ef16210f?q=80&w=600' 
    },
    { 
      icon: <ShieldCheck size={24} />, 
      title: 'Espacios Seguros', 
      desc: 'Ambientes e infraestructura diseñados para garantizar una convivencia sana y protegida.',
      image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=600' 
    },
  ];

  const [activePilar, setActivePilar] = useState<string>('Académico');

  const tabsCrecimiento = [
    { 
      id: 'Académico', 
      label: 'Académico', 
      icon: <GraduationCap size={20} />, 
      title: 'Excelencia y Desarrollo Cognitivo',
      desc: 'Nos enfocamos en brindar herramientas clave para el autoaprendizaje continuo, estimulando el pensamiento crítico, la curiosidad científica y el máximo rendimiento pedagógico adaptado a cada etapa del estudiante.',
      colorClass: 'text-blue-600 bg-blue-50 border-blue-200',
      accentBg: 'bg-blue-600'
    },
    { 
      id: 'Emocional', 
      label: 'Emocional', 
      icon: <Smile size={20} />, 
      title: 'Acompañamiento y Resiliencia',
      desc: 'Gestionamos espacios seguros para el autoconocimiento, la inteligencia emocional y el desarrollo de la autoestima. Nuestro equipo psicopedagógico acompaña activamente para contener y dotar de herramientas de resolución afectiva.',
      colorClass: 'text-pink-600 bg-pink-50 border-pink-200',
      accentBg: 'bg-pink-600'
    },
    { 
      id: 'Social', 
      label: 'Social', 
      icon: <MessageSquare size={20} />, 
      title: 'Convivencia y Sentido de Comunidad',
      desc: 'Fomentamos la construcción de vínculos sanos, la empatía, los valores ciudadanos y el trabajo colaborativo. Impulsamos actividades colectivas donde cada estudiante aprende el valor del respeto mutuo y la vida en sociedad.',
      colorClass: 'text-purple-600 bg-purple-50 border-purple-200',
      accentBg: 'bg-purple-600'
    },
    { 
      id: 'Físico', 
      label: 'Físico', 
      icon: <Activity size={20} />, 
      title: 'Hábitos Saludables y Vitalidad',
      desc: 'Promovemos el bienestar corporal a través de la educación física, disciplinas deportivas y una nutrición balanceada. Entendemos el movimiento y el cuidado del cuerpo como pilares fundamentales para un cerebro activo y sano.',
      colorClass: 'text-amber-600 bg-amber-50 border-amber-200',
      accentBg: 'bg-amber-600'
    }
  ];

  const currentPilarData = tabsCrecimiento.find(t => t.id === activePilar) || tabsCrecimiento[0];

  const faqs: FAQ[] = [
    { question: '¿Cómo solicito una entrevista con psicopedagogía?', answer: 'Podés solicitarla directamente a través de nuestro portal de acceso privado o en la secretaría del colegio. Los turnos de orientación se confirman en un plazo de 48 horas hábiles.' },
    { question: '¿Cuáles son los horarios del comedor?', answer: 'El comedor escolar funciona de lunes a viernes en dos turnos: de 12:00 a 13:00 para nivel inicial y primario, y de 13:00 a 14:00 para nivel secundario.' },
    { question: '¿Cómo me anoto en actividades extracurriculares?', answer: 'La inscripción se realiza de manera online durante las primeras tres semanas de cada cuatrimestre a través del portal académico.' },
    { question: '¿Quién puede solicitar tutoría de apoyo?', answer: 'Abierto a todos los estudiantes, ya sea por recomendación docente o petición directa de las familias.' },
  ];

  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(0);

  return (
    <div className="pb-16 bg-white overflow-hidden font-sans animate-page-fade">
      <style>{`
        @keyframes pageFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes softFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .animate-page-fade { animation: pageFadeIn 1s cubic-bezier(0.25, 1, 0.5, 1) forwards; }
        .animate-soft-float { animation: softFloat 3.5s infinite ease-in-out; }
      `}</style>

      {/* Sección Hero */}
      <section className="bg-gradient-to-br from-edu-primary to-edu-secondary text-white py-24 px-4 text-center relative overflow-hidden">
        <img src={imagenHero} alt="" className='absolute inset-0 w-full h-full object-cover opacity-25 scale-105' />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30" />
        <div className="max-w-3xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 drop-shadow-sm">Bienestar Estudiantil</h1>
          <p className="text-slate-100 text-base md:text-lg opacity-95 max-w-2xl mx-auto leading-relaxed">
            Un entorno diseñado para potenciar el crecimiento humano y académico de cada estudiante.
          </p>
        </div>
      </section>

      {/* Sección: Compromiso */}
      <section className="py-16 bg-slate-50 border-b border-slate-100">
        <ScrollReveal durationMs={1500}>
          <div className="max-w-3xl mx-auto px-4 text-center relative">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white border border-slate-200 shadow-md shadow-slate-200/80 mb-4 animate-soft-float relative group transition-all duration-300">
              <div className="absolute inset-0 rounded-full bg-edu-primary/20 blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
              <Quote className="text-edu-primary relative z-10" size={24} />
            </div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-edu-primary mb-3">Nuestro Enfoque</h2>
            <p className="text-slate-600 text-base md:text-lg italic leading-relaxed font-medium px-4">
              "Creemos que una educación de excelencia comienza en un entorno donde cada estudiante se siente acompañado, valorado y motivado a desarrollar todo su potencial académico, emocional y humano."
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* SECCIÓN: CRECIMIENTO INTEGRAL */}
      <section className="py-20 max-w-5xl mx-auto px-4">
        <ScrollReveal durationMs={1800}>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-edu-primary bg-slate-100 px-3 py-1 rounded-full inline-block mb-3">Dimensiones</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-edu-dark tracking-tight">Crecimiento Integral</h2>
            <p className="text-slate-500 text-sm mt-2">Explorá los pilares sobre los que construimos la formación de nuestros alumnos.</p>
          </div>

          <div className="bg-slate-50/70 border border-slate-200/60 rounded-3xl p-4 md:p-8 shadow-sm">
            <div className="flex flex-wrap justify-center gap-2 mb-8 bg-white p-1.5 rounded-2xl max-w-2xl mx-auto border border-slate-200/60 shadow-sm">
              {tabsCrecimiento.map((tab) => {
                const isSelected = activePilar === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActivePilar(tab.id)}
                    className={`flex items-center gap-2 px-5 py-3 text-xs md:text-sm font-bold rounded-xl transition-all duration-300 cursor-pointer ${
                      isSelected 
                        ? 'bg-edu-primary text-white shadow-md md:scale-105' 
                        : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100/80'
                    }`}
                  >
                    <span className={`transition-colors duration-300 ${isSelected ? 'text-white' : 'text-slate-400'}`}>
                      {tab.icon}
                    </span>
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <div className="bg-white border border-slate-200/70 rounded-2xl p-6 md:p-10 shadow-md transition-all duration-500 relative overflow-hidden min-h-[200px] flex flex-col md:flex-row gap-6 items-start md:items-center">
              <div className={`absolute top-0 left-0 bottom-0 w-1.5 ${currentPilarData.accentBg}`} />
              <div className={`p-5 rounded-2xl shrink-0 border transition-all duration-500 ${currentPilarData.colorClass}`}>
                {React.cloneElement(currentPilarData.icon, { size: 36 })}
              </div>
              <div className="space-y-3">
                <h3 className="text-lg md:text-xl font-extrabold text-edu-dark tracking-tight">
                  {currentPilarData.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed font-light">
                  {currentPilarData.desc}
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ÁREAS DE APOYO ESCOLAR */}
      <section className="py-20 bg-slate-50/60 border-t border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-bold uppercase tracking-widest text-edu-primary bg-slate-200/50 px-3 py-1 rounded-full inline-block mb-3">Cobertura</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-edu-dark tracking-tight">Áreas de Apoyo Escolar</h2>
              <p className="text-slate-500 text-sm mt-2">Programas dedicados a orientar, potenciar y acompañar el camino educativo de cada alumno.</p>
            </div>
          </ScrollReveal>
          
          {/* ACÁ ESTÁ EL CAMBIO: El ScrollReveal envuelve la grilla completa */}
          <ScrollReveal durationMs={2000}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {pilares.map((pilar, index) => (
                <div key={index} className="bg-white border border-slate-200/70 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 ease-out group flex flex-col min-h-[380px] h-full overflow-hidden">
                  
                  {/* Cabecera con Imagen Fotográfica Real */}
                  <div className="relative h-44 w-full overflow-hidden shrink-0 bg-slate-100">
                    <img 
                      src={pilar.image} 
                      alt={pilar.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-edu-dark/10 group-hover:bg-transparent transition-colors duration-300"></div>
                  </div>

                  {/* Contenido de la Tarjeta */}
                  <div className="p-6 flex flex-col flex-grow relative">
                    
                    {/* Ícono flotante */}
                    <div className="absolute -top-7 right-6 p-3 bg-white text-edu-primary rounded-xl shadow-md border border-slate-100 group-hover:bg-edu-primary group-hover:text-white group-hover:-translate-y-1 transition-all duration-300 z-10">
                      {pilar.icon}
                    </div>

                    <div className="w-full mt-2 flex flex-col flex-grow">
                      <h3 className="text-lg font-bold text-edu-dark mb-2 tracking-tight group-hover:text-edu-primary transition-colors duration-200 pr-12">
                        {pilar.title}
                      </h3>
                      <p className="text-[13px] text-slate-500 leading-relaxed font-light mb-6 flex-grow">
                        {pilar.desc}
                      </p>
                    </div>

                    <button className="flex items-center gap-1.5 text-xs font-bold text-edu-primary/80 group-hover:text-edu-primary border border-slate-100 bg-slate-50/50 px-3 py-2.5 rounded-xl transition-all duration-200 group-hover:bg-edu-primary/10 w-full justify-between mt-auto">
                      <span>Saber más</span>
                      <ArrowRight size={14} className="transform transition-transform duration-200 group-hover:translate-x-1" />
                    </button>
                  </div>
                  
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* NUESTROS SERVICIOS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-bold uppercase tracking-widest text-edu-primary bg-slate-50 border border-slate-200/60 px-3 py-1 rounded-full inline-block mb-3">Beneficios</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-edu-dark tracking-tight">Nuestros Servicios</h2>
              <p className="text-slate-500 text-sm mt-2">Soporte integral y recursos para garantizar la mejor experiencia escolar diaria.</p>
            </div>
          </ScrollReveal>

          {/* ACÁ ESTÁ EL SEGUNDO CAMBIO: El ScrollReveal envuelve toda la grilla de servicios junta */}
          <ScrollReveal durationMs={2000}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {servicios.map((servicio, index) => (
                <div key={index} className="bg-white border border-slate-200/70 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 ease-out group flex flex-col min-h-[380px] h-full overflow-hidden">
                  
                  {/* Cabecera con Imagen Fotográfica Real */}
                  <div className="relative h-44 w-full overflow-hidden shrink-0 bg-slate-100">
                    <img 
                      src={servicio.image} 
                      alt={servicio.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-edu-dark/10 group-hover:bg-transparent transition-colors duration-300"></div>
                  </div>

                  {/* Contenido de la Tarjeta */}
                  <div className="p-6 flex flex-col flex-grow relative">
                    
                    {/* Ícono flotante */}
                    <div className="absolute -top-7 right-6 p-3 bg-white text-edu-primary rounded-xl shadow-md border border-slate-100 group-hover:bg-edu-primary group-hover:text-white group-hover:-translate-y-1 transition-all duration-300 z-10">
                      {servicio.icon}
                    </div>

                    <div className="w-full mt-2 flex flex-col flex-grow">
                      <h3 className="text-lg font-bold text-edu-dark mb-2 tracking-tight group-hover:text-edu-primary transition-colors duration-200 pr-12">
                        {servicio.title}
                      </h3>
                      <p className="text-[13px] text-slate-500 leading-relaxed font-light mb-6 flex-grow">
                        {servicio.desc}
                      </p>
                    </div>

                    <button className="flex items-center gap-1.5 text-xs font-bold text-edu-primary/80 group-hover:text-edu-primary border border-slate-100 bg-slate-50/50 px-3 py-2.5 rounded-xl transition-all duration-200 group-hover:bg-edu-primary/10 w-full justify-between mt-auto">
                      <span>Ver detalles</span>
                      <ArrowRight size={14} className="transform transition-transform duration-200 group-hover:translate-x-1" />
                    </button>
                  </div>
                  
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FRASE INSTITUCIONAL DESTACADA */}
      <section className="relative py-24 bg-slate-950 text-white overflow-hidden shadow-2xl">
        <img src={imagenHero} alt="" className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-overlay scale-110 blur-[1px]" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-900/60" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 flex flex-col items-center">
          <ScrollReveal>
            <span className="w-12 h-0.5 bg-edu-accent mb-8 rounded-full opacity-75 inline-block" />
            <p className="text-xl md:text-3xl lg:text-4xl font-semibold italic max-w-3xl leading-relaxed tracking-wide text-slate-100 drop-shadow-md px-2">
              “Creemos que aprender también significa sentirse acompañado, escuchado y contenido.”
            </p>
            <span className="w-12 h-0.5 bg-edu-accent mt-8 rounded-full opacity-75 inline-block" />
          </ScrollReveal>
        </div>
      </section>

      {/* SECCIÓN FAQ */}
      <section className="py-20 max-w-4xl mx-auto px-4 bg-white">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-2xl font-extrabold text-edu-dark tracking-tight">Preguntas Frecuentes</h2>
            <p className="text-slate-500 text-sm mt-1">Despejá tus dudas sobre los accesos y procesos de asistencia.</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFAQIndex === index;
              return (
                <div key={index} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:border-slate-300 transition-colors duration-200">
                  <button
                    onClick={() => setOpenFAQIndex(isOpen ? null : index)}
                    className="w-full text-left py-4 px-6 flex items-center justify-between font-bold text-sm text-edu-dark hover:bg-slate-50/40 transition-colors cursor-pointer"
                  >
                    <span className={`${isOpen ? 'text-edu-primary' : 'text-edu-dark'} transition-colors duration-200`}>
                      {faq.question}
                    </span>
                    <div className={`p-1 rounded-full ${isOpen ? 'bg-edu-primary/10 text-edu-primary' : 'text-slate-400'} transition-all duration-200`}>
                      {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </div>
                  </button>
                  <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] border-t border-slate-100' : 'grid-rows-[0fr]'}`}>
                    <div className="overflow-hidden">
                      <div className="px-6 py-4 text-xs md:text-sm text-slate-600 leading-relaxed bg-slate-50/30">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};