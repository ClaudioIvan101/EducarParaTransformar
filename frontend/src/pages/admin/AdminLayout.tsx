import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Newspaper, 
  PlusSquare, 
  Settings, 
  HelpCircle, 
  LogOut, 
  Menu, 
  X, 
  Bell 
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Verify that the user is logged in as staff (simulation)
  useEffect(() => {
    const role = localStorage.getItem('educar_user_role');
    if (role !== 'staff') {
      // If not logged in as staff, redirect to login page
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('educar_user_role');
    navigate('/login');
  };

  const navItems = [
    {
      label: 'Dashboard',
      icon: <LayoutDashboard size={20} />,
      path: '/privado/noticias', // Redirect to news management for simplicity
      disabled: true
    },
    {
      label: 'Noticias',
      icon: <Newspaper size={20} />,
      path: '/privado/noticias'
    },
    {
      label: 'Crear Noticia',
      icon: <PlusSquare size={20} />,
      path: '/privado/crear-noticia'
    }
  ];

  const bottomItems = [
    {
      label: 'Ajustes',
      icon: <Settings size={18} />,
      onClick: () => alert('Ajustes del portal (simulación)')
    },
    {
      label: 'Ayuda',
      icon: <HelpCircle size={18} />,
      onClick: () => alert('Centro de ayuda institucional')
    }
  ];

  // Detect active route
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Get current page title based on route
  const getPageTitle = () => {
    if (location.pathname === '/privado/noticias') return 'Gestión de Noticias';
    if (location.pathname === '/privado/crear-noticia') return 'Crear Noticia';
    if (location.pathname.startsWith('/privado/editar-noticia')) return 'Editar Noticia';
    return 'Panel de Control';
  };

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans text-slate-800">
      
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200/80 fixed h-screen z-30 shadow-[4px_0_24px_rgba(26,82,118,0.03)]">
        {/* Logo Section */}
        <div className="p-6 border-b border-slate-100 flex items-center gap-3">
          <span className="text-2xl">🎓</span>
          <div>
            <h1 className="font-bold text-edu-primary tracking-tight leading-none text-base">Educar Admin</h1>
            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Acceso Privado</span>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-4 py-6 space-y-1.5">
          {navItems.map((item, idx) => {
            if (item.disabled) {
              return (
                <div
                  key={idx}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 text-xs font-semibold uppercase tracking-wider cursor-not-allowed opacity-60"
                  title="Dashboard simplificado en Gestión de Noticias"
                >
                  {item.icon}
                  <span>{item.label}</span>
                  <span className="ml-auto text-[9px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-full font-bold">MOCK</span>
                </div>
              );
            }

            const active = isActive(item.path);
            return (
              <Link
                key={idx}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  active
                    ? 'bg-edu-secondary/10 text-edu-primary border-r-4 border-edu-secondary'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-edu-secondary'
                }`}
              >
                <div className={active ? 'text-edu-secondary' : 'text-slate-400'}>
                  {item.icon}
                </div>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-100 space-y-1">
          {bottomItems.map((item, idx) => (
            <button
              key={idx}
              onClick={item.onClick}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-bold text-slate-500 hover:bg-slate-50 hover:text-edu-secondary transition-colors cursor-pointer text-left"
            >
              <div className="text-slate-400">{item.icon}</div>
              <span>{item.label}</span>
            </button>
          ))}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-bold text-red-600 hover:bg-red-50 transition-colors cursor-pointer text-left mt-2 border-t border-dashed border-slate-100 pt-3"
          >
            <LogOut size={18} className="text-red-500" />
            <span>CERRAR SESIÓN</span>
          </button>
        </div>
      </aside>

      {/* Mobile Drawer menu backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar for Mobile (Drawer) */}
      <aside className={`fixed inset-y-0 left-0 w-64 bg-white z-50 flex flex-col transform transition-transform duration-300 md:hidden shadow-2xl ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎓</span>
            <div>
              <h1 className="font-bold text-edu-primary tracking-tight leading-none text-base">Educar Admin</h1>
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Acceso Privado</span>
            </div>
          </div>
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-1 rounded-full text-slate-500 hover:bg-slate-100 cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1.5">
          {navItems.map((item, idx) => {
            if (item.disabled) {
              return (
                <div
                  key={idx}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 text-xs font-semibold uppercase tracking-wider opacity-60"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </div>
              );
            }
            const active = isActive(item.path);
            return (
              <Link
                key={idx}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  active
                    ? 'bg-edu-secondary/10 text-edu-primary border-r-4 border-edu-secondary'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-edu-secondary'
                }`}
              >
                <div className={active ? 'text-edu-secondary' : 'text-slate-400'}>
                  {item.icon}
                </div>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-100 space-y-1">
          {bottomItems.map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                setIsMobileMenuOpen(false);
                item.onClick();
              }}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-bold text-slate-500 hover:bg-slate-50 hover:text-edu-secondary transition-colors cursor-pointer text-left"
            >
              <div className="text-slate-400">{item.icon}</div>
              <span>{item.label}</span>
            </button>
          ))}
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              handleLogout();
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-bold text-red-600 hover:bg-red-50 transition-colors cursor-pointer text-left mt-2 border-t border-dashed border-slate-100 pt-3"
          >
            <LogOut size={18} className="text-red-500" />
            <span>CERRAR SESIÓN</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:pl-64 min-w-0">
        
        {/* Sticky Top Bar */}
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-20 border-b border-slate-200/60 flex justify-between items-center h-16 px-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-1.5 text-slate-500 hover:bg-slate-100 rounded-lg cursor-pointer"
            >
              <Menu size={22} />
            </button>
            <h2 className="text-base md:text-lg font-bold text-edu-primary tracking-tight">
              {getPageTitle()}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            {/* Notifications Button */}
            <button className="p-2 text-slate-400 hover:text-edu-secondary hover:bg-slate-50 rounded-full transition-all cursor-pointer relative">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-edu-secondary rounded-full" />
            </button>

            {/* Profile Info */}
            <div className="flex items-center gap-2 border-l border-slate-200 pl-4">
              <div className="w-8 h-8 rounded-full bg-edu-primary text-white flex items-center justify-center font-bold text-xs shadow-sm">
                DD
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold leading-none text-slate-700">Claudio Iván</p>
                <p className="text-[9px] font-bold text-edu-secondary uppercase tracking-wider mt-0.5">
                  {localStorage.getItem('educar_user_role') === 'staff' ? 'Docente/Directivo' : 'Invitado'}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic content rendering */}
        <main className="flex-grow p-4 md:p-8 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>

    </div>
  );
};
