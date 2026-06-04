export interface Article {
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

const DEFAULT_ARTICLES: Article[] = [
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
    blockquote: 'Nuestro compromiso es formar líderes creativos y con valores sólidos, capaces de influir de manera positiva en sus comunidades y enfrentar un mundo en constante cambio.',
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
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXu9J77rSG3_v_ge2iH7bYLm2rGyyh5zrstK8TrTRyYTnefGTPrZQbg60W9U8QDo0xhQu2u9Nr01phVZw-gN70-0XQ80ARjX9A8_6x4mF8CC_3Fer5tINnhzm7pL4YcuPLoJAle0VsXoWAwM915pTQL6pS01ijjQEHv_durDiWMCPFHLydM5Ogc6vgZozcSoHaI0Gpin-VPRy5X4P91LTVwFlo2pofPm-G8BlLunhkmGWo0whh6Rp1x21tqL9aPsI-yRdW5cK3_5S_I',
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

const LOCAL_STORAGE_KEY = 'educar_news_articles';

export const newsStore = {
  getArticles(): Article[] {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!data) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_ARTICLES));
      return DEFAULT_ARTICLES;
    }
    try {
      return JSON.parse(data);
    } catch {
      return DEFAULT_ARTICLES;
    }
  },

  getArticleById(id: number): Article | undefined {
    return this.getArticles().find(article => article.id === id);
  },

  addArticle(article: Omit<Article, 'id'>): Article {
    const articles = this.getArticles();
    const newId = articles.length > 0 ? Math.max(...articles.map(a => a.id)) + 1 : 1;
    const newArticle = { ...article, id: newId };
    articles.unshift(newArticle); // Add to beginning
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(articles));
    return newArticle;
  },

  updateArticle(id: number, updatedFields: Partial<Article>): Article | undefined {
    const articles = this.getArticles();
    const index = articles.findIndex(a => a.id === id);
    if (index === -1) return undefined;

    articles[index] = { ...articles[index], ...updatedFields };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(articles));
    return articles[index];
  },

  deleteArticle(id: number): boolean {
    const articles = this.getArticles();
    const filtered = articles.filter(a => a.id !== id);
    if (filtered.length === articles.length) return false;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filtered));
    return true;
  }
};
