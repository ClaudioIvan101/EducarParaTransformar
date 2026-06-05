import React, { useState, useEffect, useRef } from 'react';
import { Upload, FileText, CheckCircle2, AlertCircle, X } from 'lucide-react';
import imagenHero from '../../assets/service/hero-trabaja-con-nosotros.png';

// COMPONENTE ENVOLVENTE: CONTROL TOTAL DEL TIEMPO (LENTO Y FLUIDO)
const ScrollReveal: React.FC<{ children: React.ReactNode; durationMs?: number; delayMs?: number }> = ({ 
  children, 
  durationMs = 2000, 
  delayMs = 0        
}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      { 
        rootMargin: '-60px 0px -60px 0px', 
        threshold: 0.05 
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        transitionProperty: 'all',
        transitionTimingFunction: 'cubic-bezier(0.25, 1, 0.5, 1)',
        transitionDuration: `${durationMs}ms`,
        transitionDelay: `${delayMs}ms`,
      }}
      className={`transform ${
        isIntersecting 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-24'
      }`}
    >
      {children}
    </div>
  );
};

/**
 * Página de Postulación Laboral "Trabajá con Nosotros".
 * Permite la carga de datos personales, puesto deseado y adjuntar el CV en PDF mediante arrastrar y soltar (Drag-and-Drop).
 */
export const JobsPage: React.FC = () => {
  // Estado local para almacenar los datos textuales de los campos del formulario
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: 'Docente Nivel Inicial',
    message: '',
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Referencia mutable para controlar el selector de archivos input nativo oculto
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Gestor del cambio de campos textuales e inputs del formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validador y gestor del archivo cargado a través del input tradicional
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validamos que el archivo sea exclusivamente de formato PDF
      if (file.type !== 'application/pdf') {
        setError('Únicamente se permiten archivos en formato PDF.');
        setSelectedFile(null);
        return;
      }
      
      // Validamos que el archivo pese menos o igual a 5MB
      if (file.size > 5 * 1024 * 1024) {
        setError('El archivo supera el tamaño máximo permitido de 5MB.');
        setSelectedFile(null);
        return;
      }
      
      setError(null);
      setSelectedFile(file);
    }
  };

  // Previene el comportamiento por defecto al arrastrar sobre el área para habilitar la soltura
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // Capturador del archivo soltado dentro de la zona interactiva (Drag-and-Drop)
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      
      if (file.type !== 'application/pdf') {
        setError('Únicamente se permiten archivos en formato PDF.');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError('El archivo supera el tamaño máximo permitido de 5MB.');
        return;
      }
      
      setError(null);
      setSelectedFile(file);
    }
  };

  // Limpia el archivo seleccionado y resetea el valor del selector input
  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation(); // Evita que se dispare el evento clic de la caja contenedora
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Validador final y procesador del envío del formulario de postulación
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      setError('Por favor completá todos los campos requeridos (*).');
      return;
    }
    if (!selectedFile) {
      setError('Por favor adjuntá tu Currículum Vitae en formato PDF.');
      return;
    }

    setError(null);
    setIsSubmitted(true); // Cambia el estado para desplegar la confirmación de éxito
  };

  // Restablece todos los estados al valor inicial para permitir una nueva postulación
  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      position: 'Docente Nivel Inicial',
      message: '',
    });
    setSelectedFile(null);
    setIsSubmitted(false);
  };

  return (
    <div className="animate-page-fade font-sans">
      <style>{`
        @keyframes pageFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-page-fade { animation: pageFadeIn 1s cubic-bezier(0.25, 1, 0.5, 1) forwards; }
      `}</style>

      {/* Sección Hero: Actualizada al estilo de Bienestar/Noticias */}
      <section className="bg-gradient-to-br from-edu-primary to-edu-secondary text-white py-16 md:py-24 flex flex-col items-center justify-center relative overflow-hidden">
        <img 
          src={imagenHero} 
          alt="" 
          className="absolute inset-0 w-full h-full object-cover opacity-25 scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30" />
        
        <div className="max-w-3xl mx-auto relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 drop-shadow-sm">Trabajá con nosotros</h1>
          <p className="text-slate-100 text-base md:text-lg opacity-95 max-w-xl mx-auto leading-relaxed">
            Sumate a nuestro equipo docente y no docente para transformar juntos el futuro de la educación
          </p>
        </div>
      </section>

      {/* Sección del Formulario envuelta en ScrollReveal */}
      <ScrollReveal durationMs={2000} delayMs={100}>
        <section className="py-16 max-w-xl mx-auto px-4">
          <div className="bg-edu-card border border-slate-200/60 rounded-xl p-8 shadow-md">
            <h2 className="text-lg font-extrabold text-edu-dark mb-6 pb-3 border-b border-slate-100 uppercase tracking-wide">
              Enviar currículum
            </h2>

            {isSubmitted ? (
              /* Pantalla Animada de Éxito */
              <div className="text-center py-8 space-y-4 animate-scaleUp">
                <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="text-base font-bold text-edu-dark">¡Postulación recibida con éxito!</h3>
                <p className="text-sm text-slate-500 leading-relaxed max-w-sm mx-auto">
                  Muchas gracias por tu interés en formar parte de <strong>Educar para Transformar</strong>. Nuestro equipo de recursos humanos evaluará tu CV y se pondrá en contacto si tu perfil coincide con alguna vacante disponible.
                </p>
                <button
                  onClick={handleReset}
                  className="mt-6 bg-edu-primary hover:bg-edu-secondary text-white font-semibold text-xs px-6 py-3 rounded-lg shadow-sm transition-all cursor-pointer tracking-wider"
                >
                  ENVIAR OTRA POSTULACIÓN
                </button>
              </div>
            ) : (
              /* Formulario Interactivo */
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="p-3 bg-red-50 border border-red-100 rounded-lg text-xs text-red-600 flex items-center gap-2">
                    <AlertCircle size={16} className="shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Nombre completo */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Ej: Juan Pérez"
                    className="w-full h-11 px-4 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-edu-primary/20 focus:border-edu-primary bg-slate-50 hover:bg-white transition-all text-edu-dark"
                    required
                  />
                </div>

                {/* Fila Correo y Teléfono */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Correo */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide">
                      Correo electrónico *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Ej: juan@gmail.com"
                      className="w-full h-11 px-4 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-edu-primary/20 focus:border-edu-primary bg-slate-50 hover:bg-white transition-all text-edu-dark"
                      required
                    />
                  </div>
                  {/* Teléfono */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide">
                      Teléfono de contacto *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Ej: 3624123456"
                      className="w-full h-11 px-4 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-edu-primary/20 focus:border-edu-primary bg-slate-50 hover:bg-white transition-all text-edu-dark"
                      required
                    />
                  </div>
                </div>

                {/* Puesto deseado */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide">
                    Puesto al que se postula *
                  </label>
                  <select
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    className="w-full h-11 px-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-edu-primary/20 focus:border-edu-primary bg-slate-50 hover:bg-white transition-all text-edu-dark cursor-pointer"
                  >
                    <option value="Docente Nivel Inicial">Docente Nivel Inicial</option>
                    <option value="Docente Nivel Primario">Docente Nivel Primario</option>
                    <option value="Docente Nivel Secundario">Docente Nivel Secundario</option>
                    <option value="Personal Administrativo">Personal Administrativo</option>
                    <option value="Personal de Maestranza y Servicios">Personal de Maestranza y Servicios</option>
                  </select>
                </div>

                {/* Área interactiva Drag-and-Drop de PDF */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide">
                    Adjuntar Currículum Vitae (PDF) *
                  </label>
                  
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".pdf"
                    className="hidden"
                  />

                  <div
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-slate-300 hover:border-edu-primary/60 transition-colors p-6 text-center rounded-xl cursor-pointer bg-slate-50/50 hover:bg-slate-50 flex flex-col items-center justify-center space-y-2 group"
                  >
                    {selectedFile ? (
                      <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-edu-dark shadow-sm">
                        <FileText size={18} className="text-edu-primary shrink-0" />
                        <span className="font-semibold max-w-[220px] truncate">{selectedFile.name}</span>
                        <button
                          type="button"
                          onClick={removeFile}
                          className="text-slate-400 hover:text-red-500 transition-colors shrink-0 p-1 cursor-pointer bg-slate-50 hover:bg-red-50 rounded-md"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="w-12 h-12 bg-white rounded-full shadow-sm border border-slate-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mb-1">
                          <Upload size={20} className="text-edu-primary" />
                        </div>
                        <span className="text-xs text-edu-dark font-bold">
                          Hacé clic para seleccionar o arrastrá tu archivo aquí
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                          Formatos permitidos: PDF. Máx 5MB
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Mensaje o presentación breve */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide">
                    Breve presentación / Mensaje
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Contanos brevemente sobre tu experiencia e interés en formar parte..."
                    className="w-full p-4 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-edu-primary/20 focus:border-edu-primary bg-slate-50 hover:bg-white transition-all text-edu-dark min-h-[100px] resize-y"
                  />
                </div>

                {/* Botón de envío */}
                <button
                  type="submit"
                  className="w-full bg-edu-secondary hover:bg-edu-primary text-white font-extrabold text-xs py-4 rounded-lg shadow-md transition-all cursor-pointer uppercase tracking-widest mt-4"
                >
                  ENVIAR POSTULACIÓN
                </button>
              </form>
            )}
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
};
