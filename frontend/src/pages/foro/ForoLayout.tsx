import React, { useEffect, useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { 
  Bell, 
  User, 
  Search, 
  MessageSquare, 
  LogOut, 
  PlusCircle, 
  Menu, 
  X
} from 'lucide-react';
import { forumStore } from '../../features/comunidad/services/forumStore';

export const ForoLayout: React.FC = () => {
  const navigate = useNavigate();
  const [profile] = useState(forumStore.getProfile());
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem('educar_user_role');
    if (!role) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('educar_user_role');
    navigate('/login');
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/privado/foro?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const navLinks = [
    { label: 'Académico', path: '/privado/foro?category=Académico' },
    { label: 'Vida Escolar', path: '/privado/foro?category=Vida Escolar' },
    { label: 'Grupos de Estudio', path: '/privado/foro?category=Grupos de Estudio' },
    { label: 'Mi Perfil', path: '/privado/foro/perfil' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-800 animate-fadeIn">
      
      {/* Sticky Header */}
      <header className="bg-white sticky top-0 z-40 border-b border-slate-200/60 shadow-[0_2px_12px_rgba(0,0,0,0.02)] h-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-full flex items-center justify-between gap-4">
          
          {/* Logo & Navigation */}
          <div className="flex items-center gap-8">
            <Link to="/privado/foro" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
              <span className="text-xl">💬</span>
              <span className="font-bold text-edu-primary tracking-tight text-base sm:text-lg">Educar Foro</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              {navLinks.slice(0, 3).map((link, idx) => (
                <Link
                  key={idx}
                  to={link.path}
                  className="text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-edu-secondary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Search bar (Desktop) */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex relative max-w-xs flex-grow">
            <input
              type="text"
              placeholder="Buscar discusiones..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-9 pl-9 pr-4 bg-slate-50 border border-slate-200 focus:border-edu-secondary focus:ring-1 focus:ring-edu-secondary rounded-full text-xs text-slate-700 outline-none transition-all"
            />
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          </form>

          {/* User Controls */}
          <div className="flex items-center gap-3">
            
            {/* Create Discussion trigger (Mobile/Desktop) */}
            <Link
              to="/privado/foro?create=true"
              className="inline-flex items-center gap-1.5 h-9 px-4 bg-edu-secondary hover:bg-edu-primary text-white rounded-full text-xs font-bold uppercase tracking-wider shadow-sm transition-all cursor-pointer"
            >
              <PlusCircle size={14} />
              <span className="hidden sm:inline">Nueva Publicación</span>
            </Link>

            {/* Notification button */}
            <button className="p-2 text-slate-400 hover:text-edu-secondary hover:bg-slate-50 rounded-full transition-all cursor-pointer relative">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-edu-secondary rounded-full" />
            </button>

            {/* Profile trigger */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="w-8 h-8 rounded-full border border-slate-200 overflow-hidden cursor-pointer hover:border-edu-secondary transition-all"
              >
                <img src={profile.avatar} alt="Profile" className="w-full h-full object-cover" />
              </button>

              {/* Profile Dropdown menu */}
              {showProfileMenu && (
                <>
                  <div 
                    className="fixed inset-0 z-40 cursor-default"
                    onClick={() => setShowProfileMenu(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200/80 rounded-xl shadow-lg py-2 z-50 animate-scaleUp">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-700 truncate">{profile.name}</p>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wide truncate mt-0.5">Reputación: {profile.reputation}</p>
                    </div>
                    <Link
                      to="/privado/foro/perfil"
                      onClick={() => setShowProfileMenu(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-edu-primary transition-colors"
                    >
                      <User size={14} />
                      <span>Ver Mi Perfil</span>
                    </Link>
                    <Link
                      to="/privado/foro"
                      onClick={() => setShowProfileMenu(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-edu-primary transition-colors"
                    >
                      <MessageSquare size={14} />
                      <span>Foro Principal</span>
                    </Link>
                    <hr className="border-slate-100 my-1" />
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        handleLogout();
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50 transition-colors text-left cursor-pointer"
                    >
                      <LogOut size={14} />
                      <span>Cerrar Sesión</span>
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-1.5 text-slate-500 hover:bg-slate-100 rounded-lg cursor-pointer"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <>
            <div 
              className="fixed inset-x-0 bottom-0 top-16 bg-slate-900/30 backdrop-blur-sm z-30 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <div className="absolute top-16 inset-x-0 bg-white border-b border-slate-200 shadow-lg py-4 px-6 z-40 space-y-4 lg:hidden animate-slideDown">
              <nav className="flex flex-col gap-3">
                {navLinks.map((link, idx) => (
                  <Link
                    key={idx}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-edu-secondary py-1"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <form onSubmit={handleSearchSubmit} className="relative w-full">
                <input
                  type="text"
                  placeholder="Buscar..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-9 pl-9 pr-4 bg-slate-50 border border-slate-200 rounded-full text-xs text-slate-700 outline-none"
                />
                <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              </form>
            </div>
          </>
        )}
      </header>

      {/* Main Page Area */}
      <main className="flex-grow max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8 w-full">
        <Outlet />
      </main>

    </div>
  );
};
