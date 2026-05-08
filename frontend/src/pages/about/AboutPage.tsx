import React from 'react';
import { Target, Eye, Star, Calendar } from 'lucide-react';

/**
 * Página institucional "Quiénes Somos".
 * Despliega los valores, la trayectoria histórica (Timeline) y el staff directivo del colegio.
 */
export const AboutPage: React.FC = () => {
  // Valores fundamentales con iconos descriptivos de Lucide
  const values = [
    {
      icon: <Target size={32} className="text-edu-primary" />,
      title: 'Misión',
      desc: 'Brindar educación integral de calidad que forme ciudadanos comprometidos con su comunidad.',
    },
    {
      icon: <Eye size={32} className="text-edu-primary" />,
      title: 'Visión',
      desc: 'Ser un referente educativo de primer nivel en Resistencia, innovando constantemente en pedagogía.',
    },
    {
      icon: <Star size={32} className="text-edu-primary" />,
      title: 'Valores',
      desc: 'Fomentar el respeto, la solidaridad, la excelencia académica y el compromiso social.',
    },
  ];

  // Hitos históricos del colegio para el componente de línea de tiempo
  const history = [
    { year: '1998', title: 'Fundación', desc: 'Se establece el centro educativo con el nivel primario en el corazón de Resistencia.' },
    { year: '2005', title: 'Expansión', desc: 'Se incorpora el nivel inicial y se amplía significativamente la infraestructura escolar.' },
    { year: '2012', title: 'Nivel Secundario', desc: 'Se habilita el bachillerato con orientaciones en economía y desarrollo de software.' },
    { year: '2024', title: 'Transformación digital', desc: 'Incorporamos plataformas de aprendizaje digital avanzadas y nuevos laboratorios tecnológicos.' },
  ];

  // Listado de autoridades y representantes de la institución
  const team = [
    { initials: 'MG', name: 'María García', role: 'Directora General' },
    { initials: 'RL', name: 'Raúl López', role: 'Vicedirector Primaria' },
    { initials: 'AP', name: 'Ana Pérez', role: 'Vicedirectora Secundaria' },
    { initials: 'JM', name: 'Jorge Martín', role: 'Representante Legal' },
  ];

  return (
    <div className="animate-fadeIn">
      {/* Sección Hero: Mensaje institucional superior con ondas decorativas traslúcidas */}
      <section className="bg-gradient-to-br from-edu-primary to-edu-secondary text-white py-16 px-4 text-center relative overflow-hidden">
        <div className="absolute top-[-40px] left-[-30px] w-48 h-48 rounded-full bg-white/5 pointer-events-none" />
        <div className="max-w-3xl mx-auto relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Quiénes Somos</h1>
          <p className="text-edu-accent text-sm md:text-base max-w-xl mx-auto">
            Una institución con historia, valores y un profundo compromiso con la comunidad de Resistencia
          </p>
        </div>
      </section>

      {/* Sección Esencia: Tarjetas interactivas de Misión, Visión y Valores */}
      <section className="py-12 max-w-6xl mx-auto px-4">
        <h2 className="text-lg md:text-xl font-semibold text-edu-primary border-b border-edu-light pb-2 mb-8">
          Nuestra esencia
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((item, index) => (
            <div
              key={index}
              className="bg-edu-card border border-slate-200/60 rounded-lg p-6 text-center hover:shadow-sm transition-all flex flex-col items-center"
            >
              <div className="w-14 h-14 rounded-full bg-edu-light/50 flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="text-sm font-semibold text-edu-dark mb-2">{item.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sección Historia: Timeline vertical con puntos de referencia flotantes */}
      <section className="py-12 max-w-6xl mx-auto px-4 border-t border-slate-100">
        <h2 className="text-lg md:text-xl font-semibold text-edu-primary border-b border-edu-light pb-2 mb-8">
          Nuestra historia
        </h2>
        <div className="relative pl-6 border-l-2 border-edu-light max-w-2xl mx-auto space-y-8">
          {history.map((item, index) => (
            <div key={index} className="relative">
              {/* Círculo indicador posicionado perfectamente sobre la línea vertical izquierda */}
              <div className="absolute left-[-31px] top-1 w-4 h-4 rounded-full bg-edu-secondary border-4 border-white shadow-sm" />
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-edu-secondary mb-1">
                  <Calendar size={12} />
                  <span>{item.year} — {item.title}</span>
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sección Directivos: Cuadrícula responsiva que presenta las iniciales y roles del equipo directivo */}
      <section className="py-12 max-w-6xl mx-auto px-4 border-t border-slate-100">
        <h2 className="text-lg md:text-xl font-semibold text-edu-primary border-b border-edu-light pb-2 mb-8">
          Equipo directivo
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-4 bg-edu-card border border-slate-200/60 rounded-lg text-center hover:shadow-sm transition-all"
            >
              <div className="w-14 h-14 rounded-full bg-edu-light text-edu-primary font-bold text-sm flex items-center justify-center mb-3">
                {member.initials}
              </div>
              <h4 className="text-xs font-semibold text-edu-dark">{member.name}</h4>
              <p className="text-[10px] text-slate-500 mt-1">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
