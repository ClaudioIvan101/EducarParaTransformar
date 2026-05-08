import React from 'react';
import { School, BookOpen, Trophy, Palette } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const items = [
    { icon: <School size={28} className="text-edu-primary" />, label: 'Infraestructura', desc: 'Instalaciones modernas' },
    { icon: <BookOpen size={28} className="text-edu-primary" />, label: 'Biblioteca', desc: 'Recursos educativos' },
    { icon: <Trophy size={28} className="text-edu-primary" />, label: 'Deportes', desc: 'Desarrollo físico' },
    { icon: <Palette size={28} className="text-edu-primary" />, label: 'Talleres', desc: 'Expresión artística' },
  ];

  return (
    <section className="py-12 max-w-6xl mx-auto px-4">
      <h2 className="text-lg md:text-xl font-semibold text-edu-primary border-b border-edu-light pb-2 mb-6">
        Galería institucional
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center bg-edu-card hover:bg-slate-50 border border-slate-200/60 rounded-lg p-6 text-center transition-all hover:shadow-sm"
          >
            <div className="w-12 h-12 rounded-full bg-edu-light/50 flex items-center justify-center mb-3">
              {item.icon}
            </div>
            <h4 className="text-xs font-semibold text-edu-dark">{item.label}</h4>
            <p className="text-[10px] text-slate-500 mt-1">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
