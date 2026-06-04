import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Save, 
  Send, 
  Image as ImageIcon, 
  Sparkles, 
  Calendar, 
  User, 
  BookOpen, 
  CheckCircle,
  HelpCircle,
  Clock
} from 'lucide-react';
import { newsStore } from '../../features/noticias/services/newsStore';

export const CrearNoticiaPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const isEditMode = !!id;

  // Form states
  const [title, setTitle] = useState('');
  const [lead, setLead] = useState('');
  const [contentBody, setContentBody] = useState('');
  const [blockquote, setBlockquote] = useState('');
  const [category, setCategory] = useState<'Institucional' | 'Académico' | 'Comunidad' | 'Deportes' | 'Eventos'>('Institucional');
  const [image, setImage] = useState('');
  const [author, setAuthor] = useState('Redacción Central');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [readTime, setReadTime] = useState('3 min');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Preset Unsplash images to make it extremely easy to build rich news
  const presetImages = [
    { name: 'Laboratorio', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXu9J77rSG3_v_ge2iH7bYLm2rGyyh5zrstK8TrTRyYTnefGTPrZQbg60W9U8QDo0xhQu2u9Nr01phVZw-gN70-0XQ80ARjX9A8_6x4mF8CC_3Fer5tINnhzm7pL4YcuPLoJAle0VsXoWAwM915pTQL6pS01ijjQEHv_durDiWMCPFHLydM5Ogc6vgZozcSoHaI0Gpin-VPRy5X4P91LTVwFlo2pofPm-G8BlLunhkmGWo0whh6Rp1x21tqL9aPsI-yRdW5cK3_5S_I' },
    { name: 'Campus / Aula', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAolELDqPV1aSlQ2l7gfz5KwFnufjOO-p9DUHYjrr-wmzNbltqAOI_67iH2YwdgL91mUg-9hpIBdptmaPvBniZjRDF2opVA7I1NxMB0JBX6gv1W3x8-oN4mClzkPR7bpRY7BOWWZ2bbfYiS3KA978Xbdi0jTuJNZFTYrNOLYjcJwCAU0PNrEIphQBTMuDrThzR75c1DiGwKQRPtxQ1rQu9zH1U77GXeZYyaStOC0zNfKQ80wMJx34ll7HBNhOAuCsWyyPvqnPZbJBU' },
    { name: 'Biblioteca', url: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=600' },
    { name: 'Deportes', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpLc0wNKFNuR2CXukJKP-2C3ThTPErMh62Ibp-rcH4UycvUp544FVEmiqt9ZcB1J4GPuLGxTTL8CZ5b18093aaP3kpZZdsqrbndxkpqt_V0HJbPbaneBUhET8z6K6QQhkZcQ6ENtZSG2kjp1L57r1xbaMXSjjesplmeA-zSIEZHZKlEU1UFI3eDWQPEc5Og0ifo9KwkfLCkdEXJm6pcyaqLlEi3hsB0Gh5YBka3s0tPUzLxEyDhCcye3CqXpWj5JLHNak07Nvm370' },
    { name: 'Graduación', url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=600' }
  ];

  // Load article if in edit mode
  useEffect(() => {
    if (isEditMode) {
      const article = newsStore.getArticleById(Number(id));
      if (article) {
        setTitle(article.title);
        setLead(article.lead);
        setContentBody(article.content.join('\n\n'));
        setBlockquote(article.blockquote || '');
        setCategory(article.category);
        setImage(article.image);
        setAuthor(article.author);
        
        // Try parsing date string like "15 de Octubre, 2025" or ISO format
        if (article.date.includes('-')) {
          setDate(article.date);
        } else {
          // Keep as is or set today's date for simple input compatibility
          setDate(new Date().toISOString().split('T')[0]);
        }
        
        setReadTime(article.readTime);
      } else {
        // Article not found
        navigate('/privado/noticias');
      }
    }
  }, [id, isEditMode, navigate]);

  // Calculate read time based on content length
  useEffect(() => {
    const text = title + ' ' + lead + ' ' + contentBody + ' ' + blockquote;
    const words = text.trim().split(/\s+/).filter(w => w.length > 0).length;
    const minutes = Math.max(1, Math.ceil(words / 220)); // Approx 220 wpm
    setReadTime(`${minutes} min`);
  }, [title, lead, contentBody, blockquote]);

  // Handle form submit (Save or Publish)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !lead || !contentBody) {
      alert('Por favor, completá los campos obligatorios: Título, Copete y Cuerpo de la noticia.');
      return;
    }

    setIsSubmitting(true);

    // Format date beautifully if it's standard ISO format
    let formattedDate = date;
    if (date) {
      const parts = date.split('-');
      if (parts.length === 3) {
        const d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
        const months = [
          'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
          'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ];
        formattedDate = `${parts[2]} de ${months[d.getMonth()]}, ${parts[0]}`;
      }
    }

    // Convert newline content to array of paragraphs
    const contentParagraphs = contentBody
      .split('\n\n')
      .map(p => p.trim())
      .filter(p => p.length > 0);

    const articleData = {
      category,
      title,
      date: formattedDate,
      author,
      readTime,
      image: image || presetImages[0].url, // fallback
      lead,
      content: contentParagraphs,
      blockquote,
      isFeatured: isEditMode ? newsStore.getArticleById(Number(id))?.isFeatured : false,
      inlineImages: isEditMode ? newsStore.getArticleById(Number(id))?.inlineImages : []
    };

    setTimeout(() => {
      if (isEditMode) {
        newsStore.updateArticle(Number(id), articleData);
      } else {
        newsStore.addArticle(articleData);
      }
      setIsSubmitting(false);
      setShowSuccessModal(true);
    }, 1200);
  };

  const handleApplyPresetImage = (url: string) => {
    setImage(url);
  };

  return (
    <div className="animate-fadeIn max-w-6xl mx-auto">
      
      {/* Page header controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <Link
          to="/privado/noticias"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-edu-secondary transition-colors text-xs font-bold uppercase tracking-wider group cursor-pointer"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>Volver a la gestión</span>
        </Link>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex-grow sm:flex-grow-0 h-10 px-5 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Save size={15} />
            <span>Borrador</span>
          </button>
          
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex-grow sm:flex-grow-0 h-10 px-6 bg-edu-secondary hover:bg-edu-primary disabled:bg-edu-secondary/70 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                <span>Guardando...</span>
              </>
            ) : (
              <>
                <Send size={15} />
                <span>Publicar Noticia</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Editor Main Form Layout */}
      <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-8">
        
        {/* Left column: Main content inputs */}
        <div className="flex-grow lg:max-w-3xl space-y-6">
          
          {/* Article Title & Subtitle */}
          <div className="bg-white p-6 rounded-xl border border-slate-200/60 shadow-sm space-y-4">
            <div className="space-y-1">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                Título de la Noticia <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Escribe un título atractivo..."
                className="w-full bg-transparent border-none focus:ring-0 px-0 text-xl md:text-2xl font-bold text-edu-primary placeholder:text-slate-300 caret-edu-secondary focus:outline-none"
                required
              />
            </div>
            
            <hr className="border-slate-100" />

            <div className="space-y-1">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                Copete / Subtítulo / Introducción <span className="text-red-500">*</span>
              </label>
              <textarea
                value={lead}
                onChange={(e) => setLead(e.target.value)}
                placeholder="Añade un subtítulo o entradilla para ampliar el contexto..."
                className="w-full bg-transparent border-none focus:ring-0 px-0 text-sm font-medium text-slate-600 placeholder:text-slate-300 caret-edu-secondary focus:outline-none resize-none"
                rows={3}
                required
              />
            </div>
          </div>

          {/* Article Text Content & Blockquote */}
          <div className="bg-white p-6 rounded-xl border border-slate-200/60 shadow-sm space-y-6">
            
            {/* Formatting shortcuts help tip */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-xs font-bold text-slate-700 flex items-center gap-1.5 uppercase tracking-wide">
                <BookOpen size={16} className="text-edu-secondary" />
                <span>Cuerpo y Citas de la Noticia</span>
              </h3>
              <span className="text-[10px] text-slate-400 flex items-center gap-1">
                <HelpCircle size={12} />
                Separá los párrafos usando doble salto de línea (Enter dos veces)
              </span>
            </div>

            {/* Content paragraph input */}
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                Contenido principal <span className="text-red-500">*</span>
              </label>
              <textarea
                value={contentBody}
                onChange={(e) => setContentBody(e.target.value)}
                placeholder="Comenzá a escribir el contenido de la noticia. Escribí párrafos informativos. La plataforma los diagramará automáticamente..."
                className="w-full min-h-[300px] bg-slate-50 border border-slate-200 focus:border-edu-secondary focus:ring-2 focus:ring-edu-secondary/20 rounded-lg p-4 text-sm text-slate-700 leading-relaxed focus:outline-none placeholder:text-slate-400"
                required
              />
            </div>

            {/* Blockquote optional input */}
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                Cita destacada (Blockquote - Opcional)
              </label>
              <textarea
                value={blockquote}
                onChange={(e) => setBlockquote(e.target.value)}
                placeholder="Ingresá alguna frase o testimonio de interés para resaltar en medio de la lectura (ej: 'Aprender haciendo es la clave...')"
                className="w-full bg-slate-50 border border-slate-200 focus:border-edu-secondary focus:ring-2 focus:ring-edu-secondary/20 rounded-lg p-4 text-xs italic text-slate-600 focus:outline-none resize-none"
                rows={2}
              />
            </div>

          </div>

        </div>

        {/* Right column: Meta attributes & Image upload */}
        <div className="w-full lg:w-[320px] shrink-0 space-y-6">
          
          {/* Main image configuration */}
          <div className="bg-white p-5 rounded-xl border border-slate-200/60 shadow-sm space-y-4">
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              Imagen Principal
            </label>

            {/* Image Preview Container */}
            <div className="relative group w-full aspect-video rounded-lg overflow-hidden bg-slate-50 border border-slate-200 flex items-center justify-center">
              {image ? (
                <>
                  <img src={image} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => setImage('')}
                      className="px-3 py-1.5 bg-red-600 text-white rounded text-[10px] font-bold uppercase transition-colors hover:bg-red-700 cursor-pointer"
                    >
                      Remover
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center p-4">
                  <ImageIcon size={32} className="text-slate-300 mx-auto mb-2" />
                  <p className="text-[10px] text-slate-400">Sin imagen de portada</p>
                </div>
              )}
            </div>

            {/* Manual URL Input */}
            <div className="space-y-1.5">
              <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wide">
                URL de la Imagen
              </label>
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://ejemplo.com/imagen.jpg"
                className="w-full h-9 px-3 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-edu-secondary focus:border-edu-secondary bg-white text-slate-700"
              />
            </div>

            {/* Preset shortcuts selector */}
            <div className="space-y-2">
              <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wide flex items-center gap-1">
                <Sparkles size={10} className="text-edu-secondary" />
                <span>Imágenes Recomendadas</span>
              </label>
              <div className="flex flex-wrap gap-1.5">
                {presetImages.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleApplyPresetImage(preset.url)}
                    className={`px-2 py-1 text-[9px] font-bold border rounded transition-all cursor-pointer ${
                      image === preset.url
                        ? 'bg-edu-secondary/15 border-edu-secondary text-edu-primary'
                        : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'
                    }`}
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Meta categories and taxonomy */}
          <div className="bg-white p-5 rounded-xl border border-slate-200/60 shadow-sm space-y-4">
            
            {/* Category selection */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Categoría
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full h-10 px-3 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-edu-secondary focus:border-edu-secondary text-slate-700 transition-all outline-none"
              >
                <option value="Institucional">Institucional</option>
                <option value="Académico">Académico</option>
                <option value="Comunidad">Comunidad</option>
                <option value="Deportes">Deportes</option>
                <option value="Eventos">Eventos</option>
              </select>
            </div>

            {/* Author input */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Autor de la Noticia
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full h-10 pl-9 pr-3 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-edu-secondary focus:border-edu-secondary text-slate-700 focus:outline-none"
                />
                <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
            </div>

            {/* Date input */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Fecha de Publicación
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full h-10 pl-9 pr-3 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-edu-secondary focus:border-edu-secondary text-slate-700 focus:outline-none"
                />
                <Calendar size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
            </div>

            {/* Calculated read time display */}
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-slate-500 text-[10px] font-bold uppercase">
                <Clock size={14} className="text-slate-400" />
                <span>Tiempo de lectura</span>
              </div>
              <span className="text-xs font-bold text-edu-primary">{readTime}</span>
            </div>

          </div>

        </div>

      </form>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 animate-scaleUp text-center space-y-4">
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle size={26} />
            </div>

            <div className="space-y-1">
              <h3 className="font-bold text-sm text-slate-800">
                {isEditMode ? '¡Noticia actualizada!' : '¡Noticia creada!'}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                El artículo se guardó con éxito en el sistema y se encuentra{' '}
                <strong className="text-green-600">publicado</strong> en el portal escolar.
              </p>
            </div>

            <button
              onClick={() => {
                setShowSuccessModal(false);
                navigate('/privado/noticias');
              }}
              className="w-full py-2.5 bg-edu-secondary hover:bg-edu-primary text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-sm"
            >
              Entendido
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
