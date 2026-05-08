import React, { useState } from 'react';
import { Search, Trophy, Palette, BookOpen, ChevronRight } from 'lucide-react';

// Tipado estricto para cada noticia o novedad institucional
interface NewsItem {
  id: number;
  icon: React.ReactNode;
  category: 'Institucional' | 'Deportes' | 'Eventos';
  tagClass: string;
  title: string;
  date: string;
  desc?: string;
  isFeatured?: boolean;
}

/**
 * Portal de Noticias y Novedades.
 * Permite buscar en tiempo real por palabra clave y filtrar instantáneamente por categorías.
 */
export const NewsPage: React.FC = () => {
  // Datos simulados de noticias institucionales
  const newsData: NewsItem[] = [
    {
      id: 1,
      icon: <BookOpen size={32} className="text-white" />,
      category: 'Institucional',
      tagClass: 'bg-edu-light text-edu-primary',
      title: 'Acto de inicio del ciclo lectivo 2025',
      date: '02 Abr 2025',
      desc: 'Con gran participación de familias, directivos y docentes, se realizó el emotivo acto de apertura del ciclo lectivo 2025 en el patio principal de la institución...',
      isFeatured: true,
    },
    {
      id: 2,
      icon: <Trophy size={20} className="text-[#166534]" />,
      category: 'Deportes',
      tagClass: 'bg-green-100 text-[#166534]',
      title: 'Torneo interescolar regional',
      date: '28 Mar 2025',
    },
    {
      id: 3,
      icon: <Palette size={20} className="text-[#92400E]" />,
      category: 'Eventos',
      tagClass: 'bg-amber-100 text-[#92400E]',
      title: 'Muestra de arte estudiantil',
      date: '21 Mar 2025',
    },
    {
      id: 4,
      icon: <BookOpen size={20} className="text-edu-primary" />,
      category: 'Institucional',
      tagClass: 'bg-edu-light text-edu-primary',
      title: 'Nuevos recursos pedagógicos',
      date: '14 Mar 2025',
    },
  ];

  // Estados locales para la barra de búsqueda, la categoría seleccionada y la página activa
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [activePage, setActivePage] = useState(1);

  // Filtrado reactivo bimodal en base a la barra de búsqueda y los botones de categoría
  const filteredNews = newsData.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Todas' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Segregamos la noticia destacada de la grilla común de noticias secundarias
  const featuredNews = filteredNews.find((item) => item.isFeatured);
  const regularNews = filteredNews.filter((item) => !item.isFeatured);

  const categories = ['Todas', 'Institucional', 'Deportes', 'Eventos'];

  return (
    <div className="animate-fadeIn">
      {/* Sección Hero: Contenedor con barra de búsqueda integrada en tiempo real */}
      <section className="bg-gradient-to-br from-edu-primary to-edu-secondary text-white py-14 px-4 text-center relative overflow-hidden">
        <div className="absolute top-[-30px] left-[-30px] w-48 h-48 rounded-full bg-white/5 pointer-events-none" />
        <div className="max-w-2xl mx-auto relative z-10 space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Noticias y Novedades</h1>
          
          {/* Campo de Entrada del Buscador */}
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="Buscar noticias..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 bg-white text-edu-dark rounded-full text-xs focus:outline-none focus:ring-2 focus:ring-edu-accent shadow-sm transition-all"
            />
            <Search className="absolute left-3.5 top-3 text-slate-400" size={15} />
          </div>
        </div>
      </section>

      {/* Selector de Categorías (Pestañas horizontales interactivas) */}
      <section className="py-6 max-w-6xl mx-auto px-4 flex flex-wrap gap-2 justify-center border-b border-slate-100">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setSelectedCategory(category);
              setActivePage(1); // Reiniciar paginación al cambiar de categoría
            }}
            className={`px-4 py-1.5 rounded-full text-[10px] font-semibold tracking-wide transition-all uppercase cursor-pointer ${
              selectedCategory === category
                ? 'bg-edu-primary text-white shadow-sm'
                : 'bg-edu-card text-slate-500 hover:bg-slate-100'
            }`}
          >
            {category}
          </button>
        ))}
      </section>

      {/* Grid de Contenido de Noticias */}
      <section className="py-10 max-w-6xl mx-auto px-4 space-y-10">
        {filteredNews.length === 0 ? (
          <div className="text-center py-12 text-slate-400 text-xs">
            No se encontraron noticias que coincidan con la búsqueda.
          </div>
        ) : (
          <>
            {/* Tarjeta de Noticia Destacada (Si existe según los filtros activos) */}
            {featuredNews && (
              <div className="bg-edu-card border border-slate-200/60 rounded-lg overflow-hidden hover:shadow-sm transition-all">
                {/* Banner de fondo estilizado con gradiente */}
                <div className="bg-gradient-to-r from-edu-primary to-edu-secondary h-36 flex items-end p-5 relative">
                  <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center pointer-events-none">
                    {featuredNews.icon}
                  </div>
                  <h3 className="text-white text-base md:text-lg font-bold leading-tight relative z-10">
                    {featuredNews.title}
                  </h3>
                </div>
                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className={`px-2.5 py-0.5 rounded text-[9px] font-semibold uppercase tracking-wider ${featuredNews.tagClass}`}>
                      {featuredNews.category}
                    </span>
                    <span className="text-[10px] text-slate-400">{featuredNews.date}</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-3xl">
                    {featuredNews.desc}
                  </p>
                  <button className="inline-flex items-center gap-1 text-edu-secondary hover:text-edu-primary text-[10px] font-bold transition-all cursor-pointer uppercase">
                    <span>Leer más</span>
                    <ChevronRight size={12} />
                  </button>
                </div>
              </div>
            )}

            {/* Grilla de Noticias Secundarias (Tres columnas en pantallas de escritorio) */}
            {regularNews.length > 0 && (
              <div className="space-y-6">
                <h2 className="text-sm font-bold text-edu-primary tracking-wide uppercase border-b border-edu-light pb-1.5">
                  Últimas noticias
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {regularNews.map((item) => (
                    <div
                      key={item.id}
                      className="bg-edu-card border border-slate-200/60 rounded-lg p-4 hover:shadow-sm transition-all flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="w-10 h-10 rounded bg-slate-200/60 flex items-center justify-center mb-1 shrink-0">
                          {item.icon}
                        </div>
                        <span className={`inline-block px-2 py-0.5 rounded text-[8px] font-semibold uppercase tracking-wider ${item.tagClass}`}>
                          {item.category}
                        </span>
                        <h4 className="text-xs font-semibold text-edu-dark leading-snug line-clamp-2">
                          {item.title}
                        </h4>
                      </div>
                      <span className="block text-[9px] text-slate-400 mt-4">{item.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Paginador Interactivo */}
            <div className="flex gap-1.5 justify-center pt-4">
              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  onClick={() => setActivePage(page)}
                  className={`w-7 h-7 rounded text-[10px] font-bold transition-all flex items-center justify-center cursor-pointer ${
                    activePage === page
                      ? 'bg-edu-primary text-white shadow-sm'
                      : 'bg-edu-card text-slate-400 hover:bg-slate-100'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setActivePage(activePage < 3 ? activePage + 1 : 3)}
                className="w-7 h-7 rounded text-[10px] font-bold bg-edu-card text-slate-400 hover:bg-slate-100 flex items-center justify-center cursor-pointer"
              >
                ›
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  );
};
