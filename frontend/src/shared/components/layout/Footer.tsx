import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';

const footerLinks = [
  { label: 'Inicio', path: '/' },
  { label: 'Quienes Somos', path: '/quienes-somos' },
  { label: 'Niveles', path: '/niveles' },
  { label: 'Bienestar', path: '/bienestar' },
  { label: 'Noticias', path: '/noticias' },
  { label: 'Inscripcion', path: '/inscripcion' },
  { label: 'Opiniones', path: '/opiniones' },
  { label: 'Empleo', path: '/empleo' },
];

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto bg-edu-dark py-10 text-slate-300">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h4 className="mb-4 text-sm font-medium text-white">
              Educar para Transformar
            </h4>
            <p className="mb-2 text-xs leading-relaxed text-slate-400">
              Centro educativo comprometido con el desarrollo integral y el
              futuro de nuestra comunidad.
            </p>
            <p className="text-xs text-slate-400">Resistencia, Chaco</p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-medium text-white">Navegacion</h4>
            <ul className="grid grid-cols-2 gap-2 text-xs text-slate-400">
              {footerLinks.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-medium text-white">Contacto</h4>
            <ul className="space-y-3 text-xs text-slate-400">
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

        <div className="mt-8 border-t border-slate-700/50 pt-6 text-center text-xs text-slate-500">
          <span>© 2026 Educar para Transformar · Politica de privacidad</span>
        </div>
      </div>
    </footer>
  );
};
