import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from './shared/components/layout/MainLayout';
import { HomePage } from './pages/home/HomePage';
import { AboutPage } from './pages/about/AboutPage';
import { LevelsPage } from './pages/levels/LevelsPage';
import { BienestarPage } from './pages/BienestarPage';
import { NewsPage } from './pages/news/NewsPage';
import { JobsPage } from './pages/jobs/JobsPage';
import { LoginPage } from './pages/login/LoginPage';
import { ScrollToTop } from './shared/components/ScrollToTop';

/**
 * Componente principal de la aplicación.
 * Configura el enrutamiento general mediante react-router-dom e inyecta el layout común (MainLayout)
 * para asegurar que el Header y Footer se rendericen en todas las páginas.
 */
function App() {
  return (
    <Router>
      {/* Resetea el scroll a la parte superior en cada cambio de ruta */}
      <ScrollToTop />

      <MainLayout>
        <Routes>
          {/* Ruta raíz: Pantalla de inicio */}
          <Route path="/" element={<HomePage />} />
          
          {/* Ruta institucional: Quiénes somos */}
          <Route path="/quienes-somos" element={<AboutPage />} />
          
          {/* Oferta académica por niveles */}
          <Route path="/niveles" element={<LevelsPage />} />
          
          {/* Portal de bienestar escolar y psicopedagogía */}
          <Route path="/bienestar" element={<BienestarPage />} />
          
          {/* Portal de noticias, buscador y filtros */}
          <Route path="/noticias" element={<NewsPage />} />
          
          {/* Portal de búsqueda de empleo y recepción de CVs */}
          <Route path="/empleo" element={<JobsPage />} />
          
          {/* Acceso privado para familias y personal docente */}
          <Route path="/login" element={<LoginPage />} />
          
          {/* Las rutas futuras (como el formulario de preinscripción) se registrarán acá abajo */}
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;

