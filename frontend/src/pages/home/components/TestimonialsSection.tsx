import React, { useState } from 'react';
import { MessageSquare, User, Calendar } from 'lucide-react';

interface Comment {
  name: string;
  date: string;
  text: string;
}

export const TestimonialsSection: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([
    { name: 'María G.', date: '01/04/2025', text: 'Excelente institución, muy comprometida con los alumnos.' },
    { name: 'Anónimo', date: '28/03/2025', text: 'Los docentes son increíbles, muy dedicados.' },
  ]);

  const [nameInput, setNameInput] = useState('');
  const [textInput, setTextInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!textInput.trim()) return;

    const today = new Date();
    const formattedDate = today.toLocaleDateString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    const newComment: Comment = {
      name: nameInput.trim() || 'Anónimo',
      date: formattedDate,
      text: textInput.trim(),
    };

    setComments([newComment, ...comments]);
    setNameInput('');
    setTextInput('');
  };

  return (
    <section className="py-12 max-w-6xl mx-auto px-4 border-t border-slate-100">
      <h2 className="text-lg md:text-xl font-semibold text-edu-primary border-b border-edu-light pb-2 mb-6">
        Opiniones de la comunidad
      </h2>

      <div className="space-y-8">
        {/* Submit Opinion Form Card */}
        <div className="bg-edu-card border border-slate-200/60 rounded-lg p-5">
          <h3 className="text-xs font-semibold text-edu-dark flex items-center gap-2 mb-4">
            <MessageSquare size={14} className="text-edu-secondary" />
            <span>Dejanos tu opinión</span>
          </h3>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-[10px] font-medium text-slate-500 mb-1">Tu nombre (opcional)</label>
              <input
                type="text"
                placeholder="Anónimo"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className="w-full h-9 bg-white border border-slate-200 rounded px-3 text-xs focus:outline-none focus:border-edu-primary transition-colors"
              />
            </div>
            <div>
              <label className="block text-[10px] font-medium text-slate-500 mb-1">Tu opinión</label>
              <textarea
                placeholder="Escribí tu comentario..."
                rows={2}
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded p-3 text-xs focus:outline-none focus:border-edu-primary transition-colors resize-none"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-edu-primary hover:bg-edu-primary/90 text-white font-semibold text-xs px-4 py-2.5 rounded transition-all cursor-pointer"
            >
              PUBLICAR OPINIÓN
            </button>
          </form>
        </div>

        {/* Opinion Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {comments.map((comment, index) => (
            <div key={index} className="bg-edu-card border border-slate-200/60 rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <div className="flex items-center gap-1 font-medium text-edu-dark">
                  <User size={12} className="text-slate-400" />
                  <span>{comment.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar size={12} />
                  <span>{comment.date}</span>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{comment.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
