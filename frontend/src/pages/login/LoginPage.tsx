import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Users, GraduationCap, CheckCircle2, ShieldAlert } from 'lucide-react';

/**
 * Página de Acceso Privado (Login) de la plataforma.
 * Ofrece un conmutador interactivo para ingresar como Familia/Alumno o Personal de la institución.
 * Cuenta con estados de validación de entradas y simulación activa de petición de inicio de sesión.
 */
export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  // Estados para almacenar el tipo de perfil, credenciales e indicadores de red simulada
  const [userType, setUserType] = useState<'family' | 'staff'>('family');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Manejador del submit del formulario: realiza validaciones básicas y simula una llamada de red
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Por favor completá todos los datos de acceso.');
      return;
    }
    setError(null);
    setIsSubmitting(true);

    // Emula la latencia de respuesta de un servidor de autenticación remoto
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      localStorage.setItem('educar_user_role', userType);
      
      // Esperar brevemente para mostrar el mensaje de éxito antes de redirigir
      setTimeout(() => {
        if (userType === 'staff') {
          navigate('/privado/noticias');
        } else {
          navigate('/privado/foro');
        }
      }, 1000);
    }, 1500);
  };

  // Restablece el formulario para facilitar pruebas iterativas con distintos perfiles
  const handleReset = () => {
    setUsername('');
    setPassword('');
    setIsSuccess(false);
    localStorage.removeItem('educar_user_role');
  };

  return (
    <div className="animate-fadeIn">
      {/* Sección Hero: Encabezado contextual */}
      <section className="bg-gradient-to-br from-edu-primary to-edu-secondary text-white py-16 px-4 text-center relative overflow-hidden">
        <div className="absolute top-[-30px] right-[-20px] w-52 h-52 rounded-full bg-white/5 pointer-events-none" />
        <div className="max-w-3xl mx-auto relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Acceso Privado</h1>
          <p className="text-edu-accent text-sm md:text-base max-w-xl mx-auto">
            Ingresá al portal institucional para gestionar tu información, boletines y actividades
          </p>
        </div>
      </section>

      {/* Sección del Formulario de Ingreso */}
      <section className="py-12 max-w-md mx-auto px-4">
        <div className="bg-edu-card border border-slate-200/60 rounded-lg p-6 shadow-sm">
          {isSuccess ? (
            /* Vista de Éxito al autenticarse */
            <div className="text-center py-8 space-y-4 animate-scaleUp">
              <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 size={36} />
              </div>
              <h3 className="text-sm font-bold text-edu-dark">¡Ingreso exitoso!</h3>
              <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
                Bienvenido de nuevo al portal de{' '}
                <strong>
                  {userType === 'family' ? 'Familias y Alumnos' : 'Docentes y Directivos'}
                </strong>
                . Redirigiéndote a tu panel de control...
              </p>
              <button
                onClick={handleReset}
                className="mt-2 text-xs text-edu-secondary hover:text-edu-primary font-semibold underline cursor-pointer"
              >
                Cerrar sesión de prueba
              </button>
            </div>
          ) : (
            /* Formulario de Entrada Principal */
            <form onSubmit={handleSubmit} className="space-y-5">
              <h2 className="text-base font-bold text-edu-primary mb-2 pb-2 border-b border-edu-light uppercase tracking-wide flex items-center gap-2">
                <LogIn size={18} />
                <span>Ingresar al portal</span>
              </h2>

              {error && (
                <div className="p-3 bg-red-50 border border-red-100 rounded text-[11px] text-red-600 flex items-center gap-2">
                  <ShieldAlert size={14} className="shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Conmutador de Tipo de Usuario (Roles interactivas) */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-semibold text-slate-600 uppercase tracking-wide">
                  Tipo de usuario
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setUserType('family')}
                    className={`flex-1 py-2.5 rounded text-[10px] font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer border ${
                      userType === 'family'
                        ? 'bg-edu-primary border-edu-primary text-white shadow-sm'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Users size={12} />
                    <span>FAMILIA / ALUMNO</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setUserType('staff')}
                    className={`flex-1 py-2.5 rounded text-[10px] font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer border ${
                      userType === 'staff'
                        ? 'bg-edu-primary border-edu-primary text-white shadow-sm'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <GraduationCap size={12} />
                    <span>DOCENTE / DIRECTIVO</span>
                  </button>
                </div>
              </div>

              {/* Campo Usuario o Correo */}
              <div className="space-y-1">
                <label className="block text-[10px] font-semibold text-slate-600 uppercase tracking-wide">
                  Usuario / Correo electrónico
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Ej: mi_usuario o correo@gmail.com"
                  className="w-full h-9 px-3 border border-slate-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-edu-primary focus:border-edu-primary bg-white transition-all text-edu-dark"
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* Campo Contraseña */}
              <div className="space-y-1">
                <label className="block text-[10px] font-semibold text-slate-600 uppercase tracking-wide">
                  Contraseña
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-9 px-3 border border-slate-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-edu-primary focus:border-edu-primary bg-white transition-all text-edu-dark"
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* Recuperador de Contraseña */}
              <div className="text-right">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Funcionalidad de recuperación enviada a secretaría.');
                  }}
                  className="text-[10px] text-edu-secondary hover:text-edu-primary transition-colors font-medium hover:underline"
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              {/* Botón de envío con indicador Spinner de Carga */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-edu-secondary hover:bg-edu-secondary/90 disabled:bg-edu-secondary/70 text-white font-bold text-xs py-3 rounded shadow-sm transition-all cursor-pointer uppercase tracking-wider flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    <span>INGRESANDO...</span>
                  </>
                ) : (
                  <span>INGRESAR AL PORTAL</span>
                )}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
