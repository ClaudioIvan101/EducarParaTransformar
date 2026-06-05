import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  GraduationCap,
  KeyRound,
  Lock,
  Mail,
  ShieldAlert,
  UserRoundPlus,
} from 'lucide-react';
import {
  getInstitutionalStudentByDni,
  getLocalDemoAccounts,
  getRoleHomePath,
  getRoleLabel,
  getSession,
  loginWithEmail,
} from '../../features/auth/services/demoAuth';

const demoSteps = [
  'Ingresa como autoridad con director@educar.com para revisar solicitudes, moderar opiniones y crear la cuenta del alumno demo.',
  'Usa el acceso local de docente o familia para validar los nuevos portales privados sin depender de Spring Boot.',
  'Cuando la cuenta de Juan ya exista en backend, el alumno puede volver a entrar por correo y contrasena reales.',
];

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const studentStatus = getInstitutionalStudentByDni('46463269');
  const localAccounts = getLocalDemoAccounts();

  const credentialCards = useMemo(
    () => [
      {
        title: 'Autoridad',
        email: 'director@educar.com',
        password: 'programacion2026',
        note: 'Login real por backend para el panel institucional.',
      },
      {
        title: 'Docente',
        email: localAccounts.find((item) => item.role === 'teacher')?.email ?? '',
        password: 'programacion2026',
        note: 'Acceso local demo al portal docente.',
      },
      {
        title: 'Familia',
        email: localAccounts.find((item) => item.role === 'parent')?.email ?? '',
        password: 'programacion2026',
        note: 'Acceso local demo al portal de familias.',
      },
      {
        title: 'Alumno',
        email: 'juan@educar.com',
        password: 'programacion2026',
        note: studentStatus?.hasAccount
          ? 'La cuenta ya fue creada y entra por backend.'
          : 'Primero debes crear la cuenta desde el panel institucional.',
      },
    ],
    [localAccounts, studentStatus?.hasAccount],
  );

  useEffect(() => {
    const session = getSession();

    if (session) {
      navigate(getRoleHomePath(session.role), { replace: true });
    }
  }, [navigate]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!email || !password) {
      setError('Ingresa correo y contrasena para continuar.');
      return;
    }

    setError(null);
    setSuccessMessage(null);
    setIsSubmitting(true);

    try {
      const session = await loginWithEmail(email, password);
      setSuccessMessage(
        `Ingreso exitoso como ${getRoleLabel(session.role).toLowerCase()}. Redirigiendo...`,
      );

      setTimeout(() => {
        navigate(getRoleHomePath(session.role), { replace: true });
      }, 700);
    } catch (loginError) {
      setError(
        loginError instanceof Error
          ? loginError.message
          : 'No se pudo iniciar sesion. Intenta nuevamente.',
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f4efe6] text-slate-800">
      <div className="grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
        <section className="hidden bg-[#0f52ba] px-14 py-12 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="space-y-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em]">
              <Lock className="h-4 w-4" />
              Acceso institucional
            </span>
            <div className="max-w-lg space-y-4 text-left">
              <h1 className="text-4xl font-bold leading-tight">
                Un login simple para probar los cuatro accesos del MVP.
              </h1>
              <p className="text-base leading-relaxed text-white/80">
                Autoridades y alumnos siguen entrando con el backend real. Docentes
                y familias usan cuentas demo locales para no tocar Spring Boot.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {demoSteps.map((step, index) => (
              <div
                key={step}
                className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/8 px-4 py-4 text-left backdrop-blur-sm"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/12 text-sm font-bold">
                  {index + 1}
                </div>
                <p className="text-sm leading-relaxed text-white/88">{step}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="flex items-center justify-center px-5 py-8 sm:px-8 lg:px-12">
          <div className="w-full max-w-xl space-y-6">
            <div className="space-y-3 text-left">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#0f52ba]/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-[#0f52ba]">
                <GraduationCap className="h-4 w-4" />
                Portal Educar
              </span>
              <h2 className="text-3xl font-bold text-[#0f2d59]">
                Ingresar al portal
              </h2>
              <p className="max-w-2xl text-sm leading-relaxed text-slate-500">
                El login se mantiene solo por correo y contrasena. No hay selector
                de rol: el sistema resuelve cada acceso segun la cuenta usada.
              </p>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              {credentialCards.map((card) => (
                <button
                  key={card.title}
                  type="button"
                  onClick={() => {
                    setEmail(card.email);
                    setPassword(card.password);
                    setError(null);
                    setSuccessMessage(null);
                  }}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-[#0f52ba]/30 hover:shadow-md"
                >
                  <p className="text-sm font-bold text-slate-800">{card.title}</p>
                  <p className="mt-2 text-xs font-semibold text-[#0f52ba]">
                    {card.email}
                  </p>
                  <p className="text-xs text-slate-500">{card.password}</p>
                  <p className="mt-3 text-xs leading-relaxed text-slate-500">
                    {card.note}
                  </p>
                </button>
              ))}
            </div>

            {error && (
              <div className="flex items-start gap-2 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
                <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {successMessage && (
              <div className="flex items-start gap-2 rounded-2xl border border-green-100 bg-green-50 px-4 py-3 text-sm text-green-700">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-4 rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_60px_rgba(15,45,89,0.08)]"
            >
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">
                  Correo electronico
                </label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="director@educar.com"
                    className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-800 outline-none transition focus:border-[#0f52ba] focus:bg-white focus:ring-2 focus:ring-[#0f52ba]/15"
                    disabled={isSubmitting}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">
                  Contrasena
                </label>
                <div className="relative">
                  <KeyRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="programacion2026"
                    className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-10 pr-12 text-sm text-slate-800 outline-none transition focus:border-[#0f52ba] focus:bg-white focus:ring-2 focus:ring-[#0f52ba]/15"
                    disabled={isSubmitting}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#0f52ba] text-sm font-semibold text-white transition hover:bg-[#0c449e] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="h-4 w-4 animate-spin text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Validando acceso...
                  </>
                ) : (
                  <>
                    <span>Iniciar sesion</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            <div className="rounded-2xl border border-dashed border-slate-300 bg-white/65 px-4 py-4 text-left">
              <div className="flex items-start gap-3">
                <UserRoundPlus className="mt-0.5 h-5 w-5 shrink-0 text-[#0f52ba]" />
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-slate-800">
                    Registro controlado por autoridad
                  </p>
                  <p className="text-xs leading-relaxed text-slate-500">
                    El alta real disponible sigue siendo la del alumno institucional
                    con DNI
                    <strong className="mx-1 text-slate-700">46463269</strong>.
                    Docentes y familias estan cubiertos en este MVP con accesos
                    demo locales para no forzar endpoints que el backend no expone.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
