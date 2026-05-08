import { Link } from 'react-router-dom';
import { LogIn } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-edu-primary text-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
          <span className="text-2xl">🎓</span>
          <span className="font-semibold text-lg tracking-tight">Educar para Transformar</span>
        </Link>

        {/* Navigation links */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-edu-accent hover:text-white text-sm font-medium transition-colors">Inicio</Link>
          <Link to="/quienes-somos" className="text-edu-accent hover:text-white text-sm font-medium transition-colors">Quiénes Somos</Link>
          <Link to="/niveles" className="text-edu-accent hover:text-white text-sm font-medium transition-colors">Niveles</Link>
          <Link to="/bienestar" className="text-edu-accent hover:text-white text-sm font-medium transition-colors">Bienestar</Link>
          <Link to="/noticias" className="text-edu-accent hover:text-white text-sm font-medium transition-colors">Noticias</Link>
          <Link to="/empleo" className="text-edu-accent hover:text-white text-sm font-medium transition-colors">Empleo</Link>
        </nav>

        {/* CTA Button */}
        <div>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 bg-edu-secondary hover:bg-edu-secondary/90 text-white text-sm font-medium px-4 py-2 rounded transition-all"
          >
            <LogIn size={16} />
            <span>Acceso Privado</span>
          </Link>
        </div>
      </div>
    </header>
  );
};
