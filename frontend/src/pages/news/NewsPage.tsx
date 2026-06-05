import React, { useState, useEffect, useRef } from 'react';
import { Search, Calendar, User, Clock, ArrowLeft, ChevronRight } from 'lucide-react';
import imagenHero from '../../assets/service/hero-noticias.jpg';

// Definición estricta del tipo para un artículo de noticias editorial
interface Article {
  id: number;
  category: 'Institucional' | 'Académico' | 'Comunidad' | 'Deportes' | 'Eventos';
  title: string;
  date: string;
  author: string;
  readTime: string;
  image: string;
  lead: string;
  content: string[];
  blockquote: string;
  isFeatured?: boolean;
  inlineImages?: string[];
}

// COMPONENTE ENVOLVENTE: CONTROL TOTAL DEL TIEMPO SIN DEPENDER DE TAILWIND
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

export const NewsPage: React.FC = () => {
  const newsArticles: Article[] = [
    {
      id: 1,
      category: 'Institucional',
      title: 'Innovación que transforma: El futuro del aprendizaje en Educar Para Transformar',
      date: '15 de Octubre, 2025',
      author: 'Lic. Mariana Costa',
      readTime: '4 min',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAolELDqPV1aSlQ2l7gfz5KwFnufjOO-p9DUHYjrr-wmzNbltqAOI_67iH2YwdgL91mUg-9hpIBdptmaPvBniZjRDF2opVA7I1NxMB0JBX6gv1W3x8-oN4mClzkPR7bpRY7BOWWZ2bbfYiS3KA978Xbdi0jTuJNZFTYrNOLYjcJwCAU0PNrEIphQBTMuDrThzR75c1DiGwKQRPtxQ1rQu9zH1U77GXeZYyaStOC0zNfKQ80wMJx34ll7HBNhOAuCsWyyPvqnPZbJBU',
      lead: 'Nuestra institución proyecta un modelo educativo renovado que integra tecnologías inmersivas y metodologías activas para potenciar las competencias del siglo XXI en todos los niveles.',
      content: [
        'El nuevo plan curricular marca un hito en la colaboración educativa, integrando herramientas digitales que permiten a los estudiantes interactuar de manera activa con el conocimiento, pasando de receptores pasivos a creadores y pensadores críticos.',
        'El proyecto congrega a docentes de todos los niveles en jornadas de capacitación continua. "La clave radica en diseñar experiencias de aprendizaje auténticas y significativas", comenta la Directora General de Estudios.',
        'El método de aprendizaje basado en proyectos (ABP) se ha consolidado en las aulas de nivel primario y secundario, logrando resultados extraordinarios en la resolución de problemas reales y el desarrollo del pensamiento científico.',
        'La siguiente fase incluye la inauguración de aulas maker totalmente equipadas con impresoras 3D y kits de robótica, y la digitalización de los procesos de evaluación para un seguimiento personalizado del rendimiento escolar.'
      ],
      blockquote: 'Nuestro compromiso es formar líderes creativos y con valores sólidos, capaces de influir de manera positiva en communities y enfrentar un mundo en constante cambio.',
      isFeatured: true,
      inlineImages: [
        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600',
        'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=600'
      ]
    },
    {
      id: 2,
      category: 'Académico',
      title: 'Avances revolucionarios en el laboratorio de Ciencias y Biotecnología',
      date: '12 de Octubre, 2025',
      author: 'Dr. Carlos Altieri',
      readTime: '5 min',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9J77rSG3_v_ge2iH7bYLm2rGyyh5zrstK8TrTRyYTnefGTPrZQbg60W9U8QDo0xhQu2u9Nr01phVZw-gN70-0XQ80ARjX9A8_6x4mF8CC_3Fer5tINnhzm7pL4YcuPLoJAle0VsXoWAwM915pTQL6pS01ijjQEHv_durDiWMCPFHLydM5Ogc6vgZozcSoHaI0Gpin-VPRy5X4P91LTVwFlo2pofPm-G8BlLunhkmGWo0whh6Rp1x21tqL9aPsI-yRdW5cK3_5S_I',
      lead: 'Estudiantes de nivel secundario, guiados por investigadores locales, desarrollan un prototipo de purificación de agua de bajo costo utilizando filtros basados en nanomateriales ecológicos.',
      content: [
        'A través del taller de Ciencias Experimentales, se ha completado la primera fase de pruebas de laboratorio de filtros compuestos por biopolímeros obtenidos de residuos agrícolas. Este desarrollo abre una puerta a soluciones comunitarias ante problemáticas ambientales locales.',
        'El programa piloto busca tender puentes entre la educación secundaria y los trayectos universitarios científicos. "Es fascinante ver el entusiasmo y el rigor científico con el que trabajan chicos de 15 y 16 años", destaca el mentor académico del proyecto.',
        'El proyecto fue seleccionado para representar a la provincia en la próxima Feria Nacional de Ciencia e Innovación Tecnológica, compitiendo con proyectos de escuelas de todo el país.'
      ],
      blockquote: 'Aprender ciencia haciendo ciencia es la forma más potente de despertar vocaciones y formar ciudadanos comprometidos con el desarrollo sustentable de su entorno.',
      inlineImages: [
        'https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=600',
        'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=600'
      ]
    },
    {
      id: 3,
      category: 'Comunidad',
      title: 'Programa de mentoría estudiantil duplica su alcance en todos los niveles',
      date: '10 de Octubre, 2025',
      author: 'Lic. Sofía Rivas',
      readTime: '3 min',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5qTbkK2CX9esDx_6EUyj2K5V3IbnLCZDWMMt2sIpGevyb2H1G9LfmS020l4G8qiNjSm-vNGUxFBeCwHZQQohMmGiyO7bZ-wbGaT60b4ON3792luCvDbP0S6PtEWzND-LJqUjk6aQcqfLBnXv3e5breY_s3WamakZEsTBThdI08wfS3u5uRrT6jcznfSwNDXBDnm4VpLpxcnLbzufgqJLW7VlPDByHVx1cTbZLDH0Kx81Y3KFNo83B4Crc2HzQkH0BkjVgvFSjVak',
      lead: 'La iniciativa de acompañamiento entre pares consolida su rol clave para facilitar la transición escolar y fortalecer los lazos de convivencia en Educar Para Transformar.',
      content: [
        'El programa vincula a alumnos mayores con ingresantes o estudiantes que necesitan apoyo. Esta contención emocional y académica no solo mejora el rendimiento sino que crea redes profundas de empatía y cuidado mutuo en toda la comunidad educativa.',
        'El equipo psicopedagógico supervisa las díadas y realiza talleres semanales de inteligencia emocional y comunicación asertiva. "El cambio en el clima escolar es notable desde que implementamos las mentorías", indica la psicopedagoga.',
        'Durante este año, más de 120 alumnos se ofrecieron como mentores voluntarios, marcando un récord de participación y consolidando una cultura escolar solidaria e integradora.'
      ],
      blockquote: 'Descubrimos que cuando un estudiante le explica a otro, el lazo de aprendizaje se vuelve horizontal, derribando barreras de temor y fomentando la autoconfianza.',
      inlineImages: [
        'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600',
        'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=600'
      ]
    },
    {
      id: 4,
      category: 'Deportes',
      title: 'Victoria histórica del representativo escolar en la final de Básquetbol',
      date: '08 de Octubre, 2025',
      author: 'Prof. Lucas Almada',
      readTime: '3 min',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpLc0wNKFNuR2CXukJKP-2C3ThTPErMh62Ibp-rcH4UycvUp544FVEmiqt9ZcB1J4GPuLGxTTL8CZ5b18093aaP3kpZZdsqrbndxkpqt_V0HJbPbaneBUhET8z6K6QQhkZcQ6ENtZSG2kjp1L57r1xbaMXSjjesplmeA-zSIEZHZKlEU1UFI3eDWQPEc5Og0ifo9KwkfLCkdEXJm6pcyaqLlEi3hsB0Gh5YBka3s0tPUzLxEyDhCcye3CqXpWj5JLHNak07Nvm370',
      lead: 'Nuestros deportistas se coronaron campeones del certamen regional tras una final emocionante disputada en el estadio principal del polideportivo municipal.',
      content: [
        'En un final para el infarto, el equipo de básquetbol masculino se impuso por 78 a 76. La constancia, el juego en equipo y el apoyo incondicional de los alumnos en las tribunas impulsaron la victoria en los segundos finales del encuentro.',
        'El programa deportivo escolar no solo busca el éxito competitivo sino sobre todo la promoción de hábitos de vida saludable, compañerismo y respeto por las normas de juego. "Esta copa es el fruto de levantarse temprano, entrenar bajo la lluvia y cuidar la salud física y mental", comenta el preparador físico.',
        'La final de vóleibol femenino también se disputó el mismo fin de semana, logrando un destacado subcampeonato en un torneo que reunió a más de 30 colegios de la región.'
      ],
      blockquote: 'La verdadera victoria es ver la conducta ejemplar de nuestros chicos dentro y fuera de la cancha, felicitando al rival y celebrando con humildad.',
      inlineImages: [
        'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=600',
        'https://images.unsplash.com/photo-1519766304817-4f37bda74a27?q=80&w=600'
      ]
    },
    {
      id: 5,
      category: 'Eventos',
      title: 'Exitosa jornada de Puertas Abiertas y Muestra Anual de Ciencias y Arte',
      date: '05 de Octubre, 2025',
      author: 'Coordinación General',
      readTime: '4 min',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200',
      lead: 'La institución abrió sus puertas a la comunidad en un evento inolvidable donde las aulas cobraron vida exponiendo los proyectos transversales e instalaciones artísticas de los estudiantes.',
      content: [
        'Con una concurrencia que superó las 600 personas entre familias y vecinos, se desarrolló la Muestra Anual. Los pasillos y patios de Educar Para Transformar se llenaron de color, música, experimentos interactivos y exposiciones pedagógicas.',
        'Los alumnos de nivel inicial deleitaron con un circuito sensorial, el primario expuso maquetas interactivas y proyectos de sustentabilidad escolar, mientras que el nivel secundario cautivó con su laboratorio químico en vivo e instalaciones audiovisuales conceptuales.',
        'El coro escolar y la banda de música de nivel secundario cerraron el evento con un concierto en vivo al aire libre en el patio central.'
      ],
      blockquote: 'Es una oportunidad maravillosa para que las familias vean la riqueza y profundidad pedagógica del trabajo diario en nuestras aulas.',
      inlineImages: [
        'https://images.unsplash.com/photo-1531058020387-3be344559be6?q=80&w=600',
        'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=600'
      ]
    }
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [selectedArticleId, setSelectedArticleId] = useState<number | null>(null);
  const [activePage, setActivePage] = useState(1);

  const categories = ['Todas', 'Institucional', 'Académico', 'Comunidad', 'Deportes', 'Eventos'];

  const filteredArticles = newsArticles.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          article.lead.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Todas' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredNews = filteredArticles.find((article) => article.isFeatured);
  const regularNews = filteredArticles.filter((article) => !article.isFeatured);

  const handleArticleClick = (id: number) => {
    setSelectedArticleId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setSelectedArticleId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (selectedArticleId !== null) {
    const article = newsArticles.find((a) => a.id === selectedArticleId);
    if (!article) return null;

    return (
      <div className="max-w-7xl mx-auto px-4 py-8 animate-page-fade font-sans">
         <style>{`
          @keyframes pageFadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .animate-page-fade { animation: pageFadeIn 1s cubic-bezier(0.25, 1, 0.5, 1) forwards; }
        `}</style>

        <button
          onClick={handleBackToList}
          className="inline-flex items-center gap-2 text-edu-primary text-xs font-bold uppercase mb-8 hover:text-edu-secondary transition-colors group cursor-pointer"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>Volver al listado</span>
        </button>

        <header className="mb-10 max-w-4xl mx-auto text-center">
          <div className="inline-block bg-edu-secondary/15 text-edu-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            {article.category}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-edu-dark leading-tight mb-6">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-slate-500 text-xs">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} className="text-slate-400" />
              {article.date}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
            <span className="flex items-center gap-1.5">
              <User size={14} className="text-slate-400" />
              Por {article.author}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} className="text-slate-400" />
              {article.readTime} de lectura
            </span>
          </div>
        </header>

        <figure className="mb-12 max-w-5xl mx-auto overflow-hidden rounded-2xl shadow-lg border border-slate-100">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-auto aspect-[16/9] md:aspect-[21/9] object-cover"
          />
        </figure>

        <article className="max-w-3xl mx-auto text-slate-700 text-base md:text-lg leading-relaxed space-y-6">
          <p className="text-xl md:text-2xl text-edu-primary font-medium leading-relaxed">
            {article.lead}
          </p>

          {article.content.map((paragraph, index) => (
            <React.Fragment key={index}>
              <p>{paragraph}</p>
              
              {index === 0 && article.blockquote && (
                <blockquote className="border-l-4 border-edu-secondary bg-slate-50 p-6 md:p-8 my-8 italic text-lg md:text-xl text-edu-primary rounded-r-xl">
                  "{article.blockquote}"
                </blockquote>
              )}

              {index === 1 && article.inlineImages && article.inlineImages.length > 0 && (
                <div className="grid grid-cols-2 gap-4 my-8">
                  {article.inlineImages.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt="Detalle de galería institucional"
                      className="w-full h-40 md:h-56 object-cover rounded-xl shadow-sm hover:opacity-95 transition-opacity"
                    />
                  ))}
                </div>
              )}
            </React.Fragment>
          ))}
        </article>

        <hr className="border-t border-slate-200 my-16 max-w-5xl mx-auto" />

        <section className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl extra-bold text-edu-dark">Noticias Relacionadas</h3>
            <button
              onClick={handleBackToList}
              className="text-edu-secondary text-xs font-bold uppercase hover:text-edu-primary transition-all hover:underline"
            >
              Ver todas
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {newsArticles
              .filter((a) => a.id !== article.id)
              .slice(0, 3)
              .map((related) => (
                <div
                  key={related.id}
                  onClick={() => handleArticleClick(related.id)}
                  className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-slate-100 transition-all duration-300 cursor-pointer"
                >
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={related.image}
                      alt={related.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-0.5 bg-white/90 text-edu-primary text-[9px] font-bold uppercase rounded-full shadow-sm">
                        {related.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h4 className="text-sm font-bold text-edu-dark mb-2 line-clamp-2 leading-snug group-hover:text-edu-secondary transition-colors duration-300">
                      {related.title}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {related.lead}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="animate-page-fade font-sans">
      <style>{`
        @keyframes pageFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-page-fade { animation: pageFadeIn 1s cubic-bezier(0.25, 1, 0.5, 1) forwards; }
      `}</style>

      <section className="bg-gradient-to-br from-edu-primary to-edu-secondary text-white py-16 md:py-24 flex flex-col items-center justify-center relative overflow-hidden">
        <img 
          src={imagenHero} 
          alt="" 
          className="absolute inset-0 w-full h-full object-cover opacity-25 scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30" />
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto w-full flex flex-col items-center gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">Noticias y Novedades</h1>
            <p className="text-lg md:text-xl text-slate-200 max-w-2xl mx-auto leading-relaxed">
              La actualidad y el pensamiento pedagógico de Educar Para Transformar, analizados desde una perspectiva humana e intelectual.
            </p>
          </div>
          <div className="w-full max-w-2xl relative mt-4">
            <input
              type="text"
              placeholder="Buscar artículos, eventos, novedades..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setActivePage(1);
              }}
              className="w-full bg-white py-4 pl-6 pr-12 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-edu-secondary focus:border-edu-secondary text-sm text-slate-800 shadow-lg transition-all"
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-edu-primary transition-colors">
              <Search size={20} />
            </button>
          </div>
        </div>
      </section>

      <section className="py-6 border-b border-slate-200/80 bg-white">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap gap-2 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setActivePage(1);
              }}
              className={`px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${
                selectedCategory === category
                  ? 'bg-edu-primary text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <section className="py-10">
        {filteredArticles.length === 0 ? (
          <div className="text-center py-20 text-slate-400 text-sm">
            No se encontraron noticias que coincidan con la búsqueda.
          </div>
        ) : (
          <div className="space-y-12">
            {featuredNews && (
              <ScrollReveal durationMs={2000}>
                <div className="max-w-7xl mx-auto px-4 py-6">
                  <div className="mb-6 border-b border-slate-200 pb-3">
                    <h2 className="text-2xl font-semibold text-edu-dark">Destacado</h2>
                  </div>
                  <div
                    onClick={() => handleArticleClick(featuredNews.id)}
                    className="group relative rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer flex flex-col md:flex-row h-auto md:h-[420px] border border-slate-100"
                  >
                    <div className="w-full md:w-2/3 h-[280px] md:h-full relative overflow-hidden">
                      <img
                        src={featuredNews.image}
                        alt={featuredNews.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-950/80 to-transparent"></div>
                      <div className="absolute bottom-6 left-6 md:hidden">
                        <span className="inline-block px-3 py-1 bg-edu-secondary/20 text-white text-xs font-bold uppercase tracking-wider rounded-full backdrop-blur-md border border-white/20 mb-3">
                          {featuredNews.category}
                        </span>
                        <h3 className="text-xl font-bold text-white leading-tight">
                          {featuredNews.title}
                        </h3>
                      </div>
                    </div>

                    <div className="w-full md:w-1/3 bg-white p-8 flex flex-col justify-center relative z-10 md:-ml-16 md:my-8 md:rounded-2xl md:shadow-2xl md:border border-slate-100 transition-transform duration-500 group-hover:-translate-y-1">
                      <div className="hidden md:block mb-3">
                        <span className="inline-block px-3 py-1 bg-edu-primary/10 text-edu-primary text-xs font-bold uppercase tracking-wider rounded-full">
                          {featuredNews.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mb-3 text-slate-400 text-xs">
                        <Calendar size={14} />
                        <span>{featuredNews.date}</span>
                      </div>
                      <h3 className="hidden md:block text-2xl font-bold text-edu-dark mb-4 leading-tight group-hover:text-edu-secondary transition-colors duration-300">
                        {featuredNews.title}
                      </h3>
                      <p className="text-sm text-slate-500 mb-6 line-clamp-3 leading-relaxed">
                        {featuredNews.lead}
                      </p>
                      <button className="inline-flex items-center gap-2 text-xs font-bold uppercase text-white bg-edu-primary px-6 py-3.5 rounded-xl hover:bg-edu-secondary transition-colors self-start shadow-md">
                        <span>Leer noticia</span>
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            )}

            {regularNews.length > 0 && (
              <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between mb-8 border-b border-slate-200 pb-3">
                  <h2 className="text-2xl font-semibold text-edu-dark">Últimas Noticias</h2>
                </div>
                
                {/* CAMBIO AQUÍ: Un solo ScrollReveal envolviendo toda la grilla */}
                <ScrollReveal durationMs={2000}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {regularNews.map((article) => (
                      <article
                        key={article.id}
                        onClick={() => handleArticleClick(article.id)}
                        className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col border border-slate-100 cursor-pointer h-full"
                      >
                        <div className="relative h-[220px] overflow-hidden shrink-0">
                          <img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 bg-white/90 text-edu-primary text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm backdrop-blur-sm">
                              {article.category}
                            </span>
                          </div>
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                          <div className="flex items-center gap-2 mb-3 text-slate-400 text-xs">
                            <Calendar size={12} />
                            <span>{article.date}</span>
                          </div>
                          <h3 className="text-lg font-bold text-edu-dark mb-2 line-clamp-2 leading-tight group-hover:text-edu-secondary transition-colors duration-300">
                            {article.title}
                          </h3>
                          <p className="text-xs text-slate-500 mb-4 line-clamp-2 flex-grow leading-relaxed">
                            {article.lead}
                          </p>
                          <div className="inline-flex items-center gap-1 text-[11px] font-bold uppercase text-edu-primary group-hover:text-edu-secondary transition-colors mt-2">
                            <span>Leer más</span>
                            <ChevronRight size={12} />
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </ScrollReveal>
              </div>
            )}

            <div className="flex gap-2 justify-center pt-8">
              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  onClick={() => setActivePage(page)}
                  className={`w-9 h-9 rounded-lg text-xs font-bold transition-all flex items-center justify-center cursor-pointer ${
                    activePage === page
                      ? 'bg-edu-primary text-white shadow-md'
                      : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setActivePage(activePage < 3 ? activePage + 1 : 3)}
                className="w-9 h-9 rounded-lg text-xs font-bold bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center cursor-pointer"
              >
                ›
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};