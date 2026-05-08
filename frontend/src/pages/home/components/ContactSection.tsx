import React from 'react';
import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';

export const ContactSection: React.FC = () => {
  return (
    <section className="py-12 max-w-6xl mx-auto px-4 border-t border-slate-100">
      <h2 className="text-lg md:text-xl font-semibold text-edu-primary border-b border-edu-light pb-2 mb-6">
        Contacto
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Contact Form */}
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-[10px] font-medium text-slate-500 mb-1">Nombre</label>
            <input
              type="text"
              placeholder="Tu nombre..."
              className="w-full h-9 bg-edu-card border border-slate-200 rounded px-3 text-xs focus:outline-none focus:border-edu-primary transition-colors"
            />
          </div>
          <div>
            <label className="block text-[10px] font-medium text-slate-500 mb-1">Email</label>
            <input
              type="email"
              placeholder="tu@email.com"
              className="w-full h-9 bg-edu-card border border-slate-200 rounded px-3 text-xs focus:outline-none focus:border-edu-primary transition-colors"
            />
          </div>
          <div>
            <label className="block text-[10px] font-medium text-slate-500 mb-1">Consulta</label>
            <textarea
              placeholder="Escribí tu consulta..."
              rows={3}
              className="w-full bg-edu-card border border-slate-200 rounded p-3 text-xs focus:outline-none focus:border-edu-primary transition-colors resize-none"
            />
          </div>
          <button
            type="submit"
            className="w-full h-9 bg-edu-primary hover:bg-edu-primary/90 text-white font-semibold text-xs rounded transition-all cursor-pointer"
          >
            Enviar consulta
          </button>
        </form>

        {/* Contact info and social media */}
        <div className="space-y-6">
          <div className="bg-edu-card border border-slate-200/60 rounded-lg p-5 space-y-3">
            <div className="flex items-center gap-3 text-xs text-slate-600">
              <MapPin size={16} className="text-edu-secondary" />
              <span>Av. Principal 123, Resistencia</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-600">
              <Phone size={16} className="text-edu-secondary" />
              <span>(0362) 555-0000</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-600">
              <Mail size={16} className="text-edu-secondary" />
              <span>info@educar.edu.ar</span>
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mb-3">Redes Sociales</h4>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2]/20 flex items-center justify-center transition-all"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-[#E1306C]/10 text-[#E1306C] hover:bg-[#E1306C]/20 flex items-center justify-center transition-all"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 flex items-center justify-center transition-all"
              >
                <MessageCircle size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
