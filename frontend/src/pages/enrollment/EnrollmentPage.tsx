import React, { useState } from 'react';
import {
  AlertCircle,
  BookOpenCheck,
  CheckCircle2,
  ClipboardList,
  HeartHandshake,
} from 'lucide-react';
import { createEnrollmentRequest } from '../../features/inscripcion/services/enrollmentStore';

const initialForm = {
  studentFirstName: '',
  studentLastName: '',
  studentDni: '',
  birthDate: '',
  educationalLevel: 'Secundaria',
  schoolYear: '1ro',
  responsibleFullName: '',
  responsibleRelation: 'Madre',
  phone: '',
  email: '',
  notes: '',
};

const infoCards = [
  {
    icon: <ClipboardList className="h-5 w-5" />,
    title: 'Solicitud ordenada',
    text: 'La carga queda registrada en esta demo con un flujo pensado para orientar a familias aspirantes.',
  },
  {
    icon: <BookOpenCheck className="h-5 w-5" />,
    title: 'Revision institucional',
    text: 'El equipo de autoridades puede revisar cada solicitud desde su panel privado.',
  },
  {
    icon: <HeartHandshake className="h-5 w-5" />,
    title: 'Seguimiento claro',
    text: 'Luego la escuela puede marcarla como revisada, contactada o archivada sin tocar el backend.',
  },
];

export const EnrollmentPage: React.FC = () => {
  const [formData, setFormData] = useState(initialForm);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: name === 'studentDni' || name === 'phone' ? value.replace(/\D/g, '') : value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    const requiredFields = [
      formData.studentFirstName,
      formData.studentLastName,
      formData.studentDni,
      formData.birthDate,
      formData.educationalLevel,
      formData.schoolYear,
      formData.responsibleFullName,
      formData.responsibleRelation,
      formData.phone,
      formData.email,
    ];

    if (requiredFields.some((item) => !item.trim())) {
      setError('Completa todos los campos obligatorios antes de enviar la solicitud.');
      return;
    }

    if (!/^\d+$/.test(formData.studentDni)) {
      setError('El DNI del alumno debe ser numerico.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Ingresa un correo valido para continuar.');
      return;
    }

    try {
      createEnrollmentRequest({
        ...formData,
        studentFirstName: formData.studentFirstName.trim(),
        studentLastName: formData.studentLastName.trim(),
        responsibleFullName: formData.responsibleFullName.trim(),
        email: formData.email.trim().toLowerCase(),
        notes: formData.notes.trim(),
      });
      setSuccess(
        'Solicitud enviada con exito. El equipo institucional ya puede verla desde el panel privado.',
      );
      setFormData(initialForm);
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : 'No se pudo registrar la solicitud.',
      );
    }
  };

  return (
    <div className="animate-fadeIn bg-[#f7f1e8]">
      <section className="bg-[#0f52ba] px-4 py-16 text-white">
        <div className="mx-auto max-w-6xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em]">
            <BookOpenCheck className="h-4 w-4" />
            Solicitud publica
          </span>
          <h1 className="mt-5 max-w-3xl text-3xl font-bold tracking-tight md:text-4xl">
            Inicia la solicitud de inscripcion para un alumno aspirante.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/82 md:text-base">
            Esta pagina forma parte del MVP institucional y permite registrar el
            primer contacto de forma clara, consistente y revisable por el equipo
            de autoridades.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[30px] border border-slate-200/70 bg-white p-6 shadow-sm md:p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#0f2d59]">
              Formulario de solicitud
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              Los datos del alumno aspirante y del adulto responsable se cargan
              en una sola pasada, sin exigir login previo.
            </p>
          </div>

          {error && (
            <div className="mb-4 flex items-start gap-2 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-4 flex items-start gap-2 rounded-2xl border border-green-100 bg-green-50 px-4 py-3 text-sm text-green-700">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-1.5">
                <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">
                  Nombre del alumno
                </span>
                <input
                  type="text"
                  name="studentFirstName"
                  value={formData.studentFirstName}
                  onChange={handleChange}
                  className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-[#0f52ba] focus:bg-white focus:ring-2 focus:ring-[#0f52ba]/15"
                />
              </label>
              <label className="space-y-1.5">
                <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">
                  Apellido del alumno
                </span>
                <input
                  type="text"
                  name="studentLastName"
                  value={formData.studentLastName}
                  onChange={handleChange}
                  className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-[#0f52ba] focus:bg-white focus:ring-2 focus:ring-[#0f52ba]/15"
                />
              </label>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-1.5">
                <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">
                  DNI del alumno
                </span>
                <input
                  type="text"
                  name="studentDni"
                  inputMode="numeric"
                  value={formData.studentDni}
                  onChange={handleChange}
                  className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-[#0f52ba] focus:bg-white focus:ring-2 focus:ring-[#0f52ba]/15"
                />
              </label>
              <label className="space-y-1.5">
                <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">
                  Fecha de nacimiento
                </span>
                <input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-[#0f52ba] focus:bg-white focus:ring-2 focus:ring-[#0f52ba]/15"
                />
              </label>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-1.5">
                <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">
                  Nivel de interes
                </span>
                <select
                  name="educationalLevel"
                  value={formData.educationalLevel}
                  onChange={handleChange}
                  className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-[#0f52ba] focus:bg-white focus:ring-2 focus:ring-[#0f52ba]/15"
                >
                  <option value="Inicial">Inicial</option>
                  <option value="Primaria">Primaria</option>
                  <option value="Secundaria">Secundaria</option>
                </select>
              </label>
              <label className="space-y-1.5">
                <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">
                  Ano o curso de interes
                </span>
                <select
                  name="schoolYear"
                  value={formData.schoolYear}
                  onChange={handleChange}
                  className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-[#0f52ba] focus:bg-white focus:ring-2 focus:ring-[#0f52ba]/15"
                >
                  <option value="Sala de 5">Sala de 5</option>
                  <option value="1ro">1ro</option>
                  <option value="2do">2do</option>
                  <option value="3ro">3ro</option>
                  <option value="4to">4to</option>
                  <option value="5to">5to</option>
                  <option value="6to">6to</option>
                </select>
              </label>
            </div>

            <label className="space-y-1.5">
              <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">
                Nombre del adulto responsable
              </span>
              <input
                type="text"
                name="responsibleFullName"
                value={formData.responsibleFullName}
                onChange={handleChange}
                className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-[#0f52ba] focus:bg-white focus:ring-2 focus:ring-[#0f52ba]/15"
              />
            </label>

            <div className="grid gap-4 md:grid-cols-3">
              <label className="space-y-1.5 md:col-span-1">
                <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">
                  Vinculo
                </span>
                <select
                  name="responsibleRelation"
                  value={formData.responsibleRelation}
                  onChange={handleChange}
                  className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-[#0f52ba] focus:bg-white focus:ring-2 focus:ring-[#0f52ba]/15"
                >
                  <option value="Madre">Madre</option>
                  <option value="Padre">Padre</option>
                  <option value="Tutor">Tutor</option>
                </select>
              </label>
              <label className="space-y-1.5 md:col-span-1">
                <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">
                  Telefono
                </span>
                <input
                  type="text"
                  name="phone"
                  inputMode="numeric"
                  value={formData.phone}
                  onChange={handleChange}
                  className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-[#0f52ba] focus:bg-white focus:ring-2 focus:ring-[#0f52ba]/15"
                />
              </label>
              <label className="space-y-1.5 md:col-span-1">
                <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">
                  Correo
                </span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-[#0f52ba] focus:bg-white focus:ring-2 focus:ring-[#0f52ba]/15"
                />
              </label>
            </div>

            <label className="space-y-1.5">
              <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">
                Observaciones opcionales
              </span>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={4}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[#0f52ba] focus:bg-white focus:ring-2 focus:ring-[#0f52ba]/15"
                placeholder="Contanos cualquier dato que sirva para orientar la solicitud."
              />
            </label>

            <button
              type="submit"
              className="inline-flex h-12 items-center justify-center rounded-2xl bg-[#0f52ba] px-6 text-sm font-semibold text-white transition hover:bg-[#0c449e]"
            >
              Enviar solicitud
            </button>
          </form>
        </div>

        <aside className="space-y-4">
          {infoCards.map((card) => (
            <div
              key={card.title}
              className="rounded-[26px] border border-slate-200/70 bg-white p-6 shadow-sm"
            >
              <div className="mb-4 inline-flex rounded-2xl bg-[#0f52ba]/10 p-3 text-[#0f52ba]">
                {card.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-800">{card.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                {card.text}
              </p>
            </div>
          ))}
        </aside>
      </section>
    </div>
  );
};
