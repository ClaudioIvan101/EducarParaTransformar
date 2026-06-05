import React, { useMemo, useState } from 'react';
import { CheckCircle2, ClipboardList, PhoneCall, SearchCheck } from 'lucide-react';
import {
  getEnrollmentStatusCount,
  listEnrollmentRequests,
  updateEnrollmentStatus,
} from '../../features/inscripcion/services/enrollmentStore';
import type { EnrollmentRequest, EnrollmentStatus } from '../../features/inscripcion/types';

function formatDate(value: string) {
  return new Date(value).toLocaleDateString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

const statusLabels: Record<EnrollmentStatus, string> = {
  pending: 'Pendiente',
  reviewed: 'Revisada',
  contacted: 'Contactada',
  archived: 'Archivada',
};

const filters: Array<{ value: EnrollmentStatus | 'all'; label: string }> = [
  { value: 'all', label: 'Todas' },
  { value: 'pending', label: 'Pendientes' },
  { value: 'reviewed', label: 'Revisadas' },
  { value: 'contacted', label: 'Contactadas' },
  { value: 'archived', label: 'Archivadas' },
];

export const EnrollmentRequestsPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<EnrollmentStatus | 'all'>('all');
  const [version, setVersion] = useState(0);
  const requests = useMemo(() => listEnrollmentRequests(), [version]);

  const visibleRequests =
    activeFilter === 'all'
      ? requests
      : requests.filter((item) => item.status === activeFilter);

  const handleStatusChange = (request: EnrollmentRequest, status: EnrollmentStatus) => {
    updateEnrollmentStatus(request.id, status);
    setVersion((current) => current + 1);
  };

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#0f52ba]/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-[#0f52ba]">
              <ClipboardList className="h-4 w-4" />
              Solicitudes publicas
            </span>
            <h1 className="mt-3 text-2xl font-bold text-edu-primary">
              Revision de inscripciones
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              Este tablero organiza las solicitudes enviadas desde la pagina
              publica de inscripcion y permite darles seguimiento local dentro
              del MVP.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-slate-50 px-4 py-4 text-left">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                Pendientes
              </p>
              <p className="mt-2 text-2xl font-bold text-slate-800">
                {getEnrollmentStatusCount('pending')}
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50 px-4 py-4 text-left">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                Revisadas
              </p>
              <p className="mt-2 text-2xl font-bold text-slate-800">
                {getEnrollmentStatusCount('reviewed')}
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50 px-4 py-4 text-left">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                Contactadas
              </p>
              <p className="mt-2 text-2xl font-bold text-slate-800">
                {getEnrollmentStatusCount('contacted')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm">
        <div className="mb-5 flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter.value}
              type="button"
              onClick={() => setActiveFilter(filter.value)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                activeFilter === filter.value
                  ? 'bg-[#0f52ba] text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {visibleRequests.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 py-12 text-center">
            <SearchCheck className="mx-auto h-8 w-8 text-slate-300" />
            <p className="mt-4 text-sm font-semibold text-slate-700">
              No hay solicitudes en este filtro.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {visibleRequests.map((request) => (
              <article
                key={request.id}
                className="rounded-2xl border border-slate-200/70 bg-slate-50 p-5"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-lg font-bold text-slate-800">
                        {request.studentFirstName} {request.studentLastName}
                      </h2>
                      <span className="rounded-full bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#0f52ba]">
                        {statusLabels[request.status]}
                      </span>
                    </div>

                    <dl className="grid gap-3 text-sm text-slate-600 md:grid-cols-2">
                      <div>
                        <dt className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                          DNI
                        </dt>
                        <dd>{request.studentDni}</dd>
                      </div>
                      <div>
                        <dt className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                          Fecha
                        </dt>
                        <dd>{formatDate(request.createdAt)}</dd>
                      </div>
                      <div>
                        <dt className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                          Nivel / curso
                        </dt>
                        <dd>
                          {request.educationalLevel} · {request.schoolYear}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                          Responsable
                        </dt>
                        <dd>
                          {request.responsibleFullName} ({request.responsibleRelation})
                        </dd>
                      </div>
                      <div>
                        <dt className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                          Contacto
                        </dt>
                        <dd>
                          {request.phone} · {request.email}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                          Observaciones
                        </dt>
                        <dd>{request.notes || 'Sin observaciones adicionales.'}</dd>
                      </div>
                    </dl>
                  </div>

                  <div className="flex flex-wrap gap-2 lg:w-[280px] lg:justify-end">
                    <button
                      type="button"
                      onClick={() => handleStatusChange(request, 'reviewed')}
                      className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
                    >
                      <SearchCheck className="h-4 w-4" />
                      <span>Marcar revisada</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleStatusChange(request, 'contacted')}
                      className="inline-flex items-center gap-2 rounded-2xl bg-emerald-100 px-4 py-2 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-200"
                    >
                      <PhoneCall className="h-4 w-4" />
                      <span>Marcar contactada</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleStatusChange(request, 'archived')}
                      className="inline-flex items-center gap-2 rounded-2xl bg-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-300"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Archivar</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
