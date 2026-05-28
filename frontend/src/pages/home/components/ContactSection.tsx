import React from 'react';
import { MapPin, Phone, Mail, MessageCircle, Send } from 'lucide-react';

export const ContactSection: React.FC = () => {
  return (
    <section id="contacto" className="pt-6 pb-20 px-6 relative overflow-hidden flex justify-center items-center">
      {/* Smooth ambient lighting behind */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-edu-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl w-full text-center relative z-10">
        {/* Compact separating line */}
        <div className="w-full max-w-4xl mx-auto border-t border-slate-200 opacity-70 mb-12"></div>
        
        {/* Header */}
        <div className="inline-block px-4 py-1 mb-4 text-xs font-bold tracking-wider text-edu-primary uppercase bg-white rounded-full shadow-sm border border-slate-100">
          Hablemos
        </div>
        
        <h2 className="text-3xl md:text-4xl font-extrabold text-edu-dark mb-4 tracking-tight">
          ¿Tienes alguna duda o consulta?
        </h2>
        
        <p className="text-base text-slate-500 mb-10 max-w-2xl mx-auto">
          Nuestro equipo de admisiones está listo para ayudarte. Escríbenos y te responderemos a la brevedad.
        </p>

        {/* Contact Icons Bar - Centered & Compact */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-12">
          <div className="flex items-center gap-2.5 text-sm text-slate-600 font-medium hover:text-edu-primary transition-colors">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm"><MapPin size={16} /></div>
            <span>Av. Principal 123</span>
          </div>
          <div className="flex items-center gap-2.5 text-sm text-slate-600 font-medium hover:text-edu-primary transition-colors">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm"><Phone size={16} /></div>
            <span>(0362) 555-0000</span>
          </div>
          <div className="flex items-center gap-2.5 text-sm text-slate-600 font-medium hover:text-edu-primary transition-colors">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm"><Mail size={16} /></div>
            <span>info@educar.edu.ar</span>
          </div>
        </div>

        {/* Centered Form - Scaled down width */}
        <div className="max-w-lg mx-auto bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-slate-200/40 border border-slate-100 text-left">
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">Nombre</label>
              <input
                type="text"
                placeholder="Ingresa tu nombre"
                className="w-full h-12 bg-slate-50 border border-slate-200 rounded-xl px-4 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-edu-primary focus:bg-white transition-all text-sm"
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">Correo</label>
              <input
                type="email"
                placeholder="ejemplo@correo.com"
                className="w-full h-12 bg-slate-50 border border-slate-200 rounded-xl px-4 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-edu-primary focus:bg-white transition-all text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">Mensaje</label>
              <textarea
                placeholder="Escribe tu mensaje..."
                rows={4}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-edu-primary focus:bg-white transition-all resize-none text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full h-12 mt-2 bg-edu-primary hover:bg-edu-secondary text-white font-bold rounded-xl shadow-md shadow-edu-primary/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 group cursor-pointer text-sm"
            >
              <span>Enviar Consulta</span>
              <Send size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>

        {/* Redes sociales al pie */}
        <div className="mt-10 flex justify-center gap-4">
          <a href="#" className="w-9 h-9 rounded-full flex items-center justify-center bg-white shadow-sm border border-slate-100 text-slate-500 hover:text-[#1877F2] transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </a>
          <a href="#" className="w-9 h-9 rounded-full flex items-center justify-center bg-white shadow-sm border border-slate-100 text-slate-500 hover:text-[#E1306C] transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
          </a>
          <a href="#" className="w-9 h-9 rounded-full flex items-center justify-center bg-white shadow-sm border border-slate-100 text-slate-500 hover:text-[#25D366] transition-colors">
            <MessageCircle size={16} />
          </a>
        </div>

      </div>
    </section>
  );
};
