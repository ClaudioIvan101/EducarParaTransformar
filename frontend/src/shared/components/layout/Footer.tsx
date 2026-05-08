import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-edu-dark text-slate-300 py-10 mt-auto">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Col 1 */}
          <div>
            <h4 className="text-white font-medium text-sm mb-4">Educar para Transformar</h4>
            <p className="text-xs text-slate-400 mb-2 leading-relaxed">
              Centro educativo comprometido con el desarrollo integral y el futuro de nuestra comunidad.
            </p>
            <p className="text-xs text-slate-400">Resistencia, Chaco</p>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-white font-medium text-sm mb-4">Navegación</h4>
            <ul className="text-xs space-y-2 text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">Inicio · Quiénes Somos</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Niveles · Bienestar</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Noticias · Empleo</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-white font-medium text-sm mb-4">Contacto</h4>
            <ul className="text-xs space-y-3 text-slate-400">
              <li className="flex items-center gap-2">
                <MapPin size={14} className="text-edu-accent" />
                <span>Av. Principal 123, Resistencia</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-edu-accent" />
                <span>(0362) 555-0000</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-edu-accent" />
                <span>info@educar.edu.ar</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700/50 mt-8 pt-6 text-center text-xs text-slate-500">
          <span>© 2025 Educar para Transformar · Política de privacidad</span>
        </div>
      </div>
    </footer>
  );
};
