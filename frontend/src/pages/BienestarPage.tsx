import React, { useState } from 'react';
import { Brain, Heart, Trophy, BookOpen, ChevronDown, ChevronUp, Mail } from 'lucide-react';

// Estructura de tipado para las preguntas del acordeón
interface FAQ {
  question: string;
  answer: string;
}

export const BienestarPage: React.FC = () => {
  // Listado de pilares institucionales con iconos vectoriales de Lucide
  const pilares = [
    {
      icon: <Brain size={28} className="text-edu-primary" />,
      title: 'Gabinete Psicopedagógico',
      desc: 'Apoyo emocional, orientación escolar personalizada y acompañamiento en procesos de aprendizaje.',
    },
    {
      icon: <Heart size={28} className="text-edu-primary" />,
      title: 'Salud y Nutrición',
      desc: 'Comedor escolar saludable, menús balanceados diseñados por profesionales y área de enfermería activa.',
    },
    {
      icon: <Trophy size={28} className="text-edu-primary" />,
      title: 'Actividades Extracurriculares',
      desc: 'Club de deportes, talleres de arte, música e iniciativas de integración y servicio comunitario.',
    },
    {
      icon: <BookOpen size={28} className="text-edu-primary" />,
      title: 'Tutorías',
      desc: 'Apoyo escolar complementario en asignaturas clave y mentoría individualizada para el estudiante.',
    },
  ];

  // Base de datos de preguntas frecuentes de bienestar escolar
  const faqs: FAQ[] = [
    {
      question: '¿Cómo solicito una entrevista con psicopedagogía?',
      answer: 'Podés solicitarla directamente a través de nuestro portal de acceso privado o en la secretaría del colegio. Los turnos de orientación se confirman en un plazo de 48 horas hábiles.',
    },
    {
      question: '¿Cuáles son los horarios del comedor?',
      answer: 'El comedor escolar funciona de lunes a viernes en dos turnos: de 12:00 a 13:00 para nivel inicial y primario, y de 13:00 a 14:00 para nivel secundario. Ofrecemos viandas saludables y menús adaptados para alumnos con celiaquía o alergias específicas bajo certificado médico.',
    },
    {
      question: '¿Cómo me anoto en actividades extracurriculares?',
      answer: 'La convocatoria e inscripción para los clubes de deportes y talleres artísticos se realiza de manera online durante las primeras tres semanas de cada cuatrimestre a través del portal académico.',
    },
    {
      question: '¿Quién puede solicitar tutoría de apoyo?',
      answer: 'Las tutorías académicas adicionales están abiertas para todos los estudiantes. Pueden solicitarse por recomendación expresa del docente tutor o a petición directa de los padres para reforzar contenidos específicos.',
    },
  ];

  // Estado para rastrear qué pregunta del acordeón está abierta. Por defecto se inicializa la primera (índice 0).
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(0);

  // Contralor del acordeón: abre la seleccionada o la colapsa si ya estaba abierta.
  const toggleFAQ = (index: number) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

  return (
    <div className="animate-fadeIn">
      {/* Sección Hero: Encabezado contextual con gradiente corporativo */}
      <section className="bg-gradient-to-br from-edu-primary to-edu-secondary text-white py-16 px-4 text-center relative overflow-hidden">
        <div className="absolute top-[-30px] right-[-20px] w-52 h-52 rounded-full bg-white/5 pointer-events-none" />
        <div className="max-w-3xl mx-auto relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Bienestar Estudiantil</h1>
          <p className="text-edu-accent text-sm md:text-base max-w-xl mx-auto">
            Te acompañamos en cada paso de tu desarrollo integral, fomentando un ambiente sano y estimulante
          </p>
        </div>
      </section>

      {/* Sección Pilares: Muestra el enfoque integral del área de bienestar */}
      <section className="py-12 max-w-6xl mx-auto px-4">
        <h2 className="text-lg md:text-xl font-semibold text-edu-primary border-b border-edu-light pb-2 mb-8">
          Pilares de bienestar
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pilares.map((pilar, index) => (
            <div
              key={index}
              className="flex gap-4 p-5 bg-edu-card border border-slate-200/60 rounded-lg hover:shadow-sm transition-all items-start"
            >
              <div className="w-12 h-12 rounded-full bg-edu-light/50 flex items-center justify-center shrink-0">
                {pilar.icon}
              </div>
              <div className="space-y-1">
                <h3 className="text-xs font-semibold text-edu-dark">{pilar.title}</h3>
                <p className="text-[11px] text-slate-500 leading-relaxed">{pilar.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sección de Acordeón Interactivo (FAQ) */}
      <section className="py-12 max-w-4xl mx-auto px-4 border-t border-slate-100">
        <h2 className="text-lg md:text-xl font-semibold text-edu-primary border-b border-edu-light pb-2 mb-8">
          Preguntas frecuentes
        </h2>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFAQIndex === index;
            return (
              <div
                key={index}
                className="bg-edu-card border border-slate-200/60 rounded-lg overflow-hidden transition-all"
              >
                {/* Cabecera del ítem: Accionador del colapso */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left py-3.5 px-4 flex items-center justify-between font-medium text-xs text-edu-dark hover:bg-slate-50/50 transition-colors"
                >
                  <span>{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp size={16} className="text-slate-400" />
                  ) : (
                    <ChevronDown size={16} className="text-slate-400" />
                  )}
                </button>
                
                {/* Cuerpo del ítem: Se renderiza condicionalmente si está activo */}
                {isOpen && (
                  <div className="p-4 border-t border-slate-200 text-xs text-slate-500 bg-white leading-relaxed animate-slideDown">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Tarjeta de Contacto Directo: Acceso rápido vía correo corporativo */}
      <section className="py-12 max-w-4xl mx-auto px-4 border-t border-slate-100">
        <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left space-y-1">
            <h4 className="text-sm font-semibold text-edu-primary">Contacto directo — Bienestar</h4>
            <p className="text-xs text-slate-500 flex items-center justify-center sm:justify-start gap-1">
              <Mail size={12} className="text-edu-secondary" />
              <span>bienestar@educar.edu.ar · int. 205</span>
            </p>
          </div>
          <a
            href="mailto:bienestar@educar.edu.ar"
            className="inline-flex items-center bg-white hover:bg-slate-50 border border-edu-primary text-edu-primary font-semibold text-xs px-5 py-2.5 rounded shadow-sm transition-all cursor-pointer"
          >
            Contactar
          </a>
        </div>
      </section>
    </div>
  );
};
