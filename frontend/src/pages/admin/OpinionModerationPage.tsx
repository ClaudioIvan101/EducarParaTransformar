import React, { useMemo, useState } from 'react';
import { CheckCheck, Clock3, MessageSquareWarning, XCircle } from 'lucide-react';
import {
  listOpinions,
  updateOpinionStatus,
} from '../../features/opiniones/services/opinionStore';
import type { PublicOpinionStatus } from '../../features/opiniones/types';

const statusLabels: Record<PublicOpinionStatus, string> = {
  pending: 'Pendiente',
  approved: 'Aprobada',
  rejected: 'Rechazada',
};

const filters: Array<{ value: PublicOpinionStatus | 'all'; label: string }> = [
  { value: 'all', label: 'Todas' },
  { value: 'pending', label: 'Pendientes' },
  { value: 'approved', label: 'Aprobadas' },
  { value: 'rejected', label: 'Rechazadas' },
];

function formatDate(value: string) {
  return new Date(value).toLocaleDateString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export const OpinionModerationPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<PublicOpinionStatus | 'all'>(
    'pending',
  );
  const [version, setVersion] = useState(0);
  const opinions = useMemo(() => listOpinions(), [version]);

  const visibleOpinions =
    activeFilter === 'all'
      ? opinions
      : opinions.filter((item) => item.status === activeFilter);

  const handleStatusChange = (id: string, status: PublicOpinionStatus) => {
    updateOpinionStatus(id, status);
    setVersion((current) => current + 1);
  };

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm">
        <span className="inline-flex items-center gap-2 rounded-full bg-[#0f52ba]/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-[#0f52ba]">
          <MessageSquareWarning className="h-4 w-4" />
          Moderacion publica
        </span>
        <h1 className="mt-3 text-2xl font-bold text-edu-primary">
          Revision de opiniones
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-500">
          Las opiniones enviadas sin login llegan primero a este espacio. Desde
          aqui se aprueban para la pagina publica o se rechazan si no corresponden.
        </p>
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

        {visibleOpinions.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 py-12 text-center">
            <Clock3 className="mx-auto h-8 w-8 text-slate-300" />
            <p className="mt-4 text-sm font-semibold text-slate-700">
              No hay opiniones en este estado.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {visibleOpinions.map((opinion) => (
              <article
                key={opinion.id}
                className="rounded-2xl border border-slate-200/70 bg-slate-50 p-5"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-lg font-bold text-slate-800">
                        {opinion.displayName}
                      </h2>
                      <span className="rounded-full bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#0f52ba]">
                        {statusLabels[opinion.status]}
                      </span>
                    </div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                      {opinion.relation} · {formatDate(opinion.createdAt)}
                    </p>
                    <p className="max-w-3xl text-sm leading-relaxed text-slate-600">
                      {opinion.message}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 lg:justify-end">
                    <button
                      type="button"
                      onClick={() => handleStatusChange(opinion.id, 'approved')}
                      className="inline-flex items-center gap-2 rounded-2xl bg-emerald-100 px-4 py-2 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-200"
                    >
                      <CheckCheck className="h-4 w-4" />
                      <span>Aprobar</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleStatusChange(opinion.id, 'rejected')}
                      className="inline-flex items-center gap-2 rounded-2xl bg-red-100 px-4 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-200"
                    >
                      <XCircle className="h-4 w-4" />
                      <span>Rechazar</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleStatusChange(opinion.id, 'pending')}
                      className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
                    >
                      <Clock3 className="h-4 w-4" />
                      <span>Dejar pendiente</span>
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
