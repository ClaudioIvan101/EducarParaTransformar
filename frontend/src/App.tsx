import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { MainLayout } from './shared/components/layout/MainLayout';
import { HomePage } from './pages/home/HomePage';
import { AboutPage } from './pages/about/AboutPage';
import { LevelsPage } from './pages/levels/LevelsPage';
import { BienestarPage } from './pages/BienestarPage';
import { NewsPage } from './pages/news/NewsPage';
import { JobsPage } from './pages/jobs/JobsPage';
import { LoginPage } from './pages/login/LoginPage';
import { ScrollToTop } from './shared/components/ScrollToTop';

// Import Admin Layout and Pages
import { AdminLayout } from './pages/admin/AdminLayout';
import { GestionNoticiasPage } from './pages/admin/GestionNoticiasPage';
import { CrearNoticiaPage } from './pages/admin/CrearNoticiaPage';

// Import Student Forum Layout and Pages
import { ForoLayout } from './pages/foro/ForoLayout';
import { ForoFeedPage } from './pages/foro/ForoFeedPage';
import { ForoThreadPage } from './pages/foro/ForoThreadPage';
import { ForoProfilePage } from './pages/foro/ForoProfilePage';

/**
 * Wrapper layout for public routes.
 */
const PublicLayout = () => (
  <MainLayout>
    <Outlet />
  </MainLayout>
);

/**
 * Componente principal de la aplicación.
 * Configura el enrutamiento general mediante react-router-dom e inyecta el layout común (MainLayout)
 * para asegurar que el Header y Footer se rendericen en todas las páginas públicas.
 */
function App() {
  return (
    <Router>
      {/* Resetea el scroll a la parte superior en cada cambio de ruta */}
      <ScrollToTop />

      <Routes>
        {/* Rutas Públicas (con Header y Footer tradicionales) */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/quienes-somos" element={<AboutPage />} />
          <Route path="/niveles" element={<LevelsPage />} />
          <Route path="/bienestar" element={<BienestarPage />} />
          <Route path="/noticias" element={<NewsPage />} />
          <Route path="/empleo" element={<JobsPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>

        {/* Panel Privado / Administrativo para Docentes/Directivos */}
        <Route path="/privado" element={<AdminLayout />}>
          <Route path="noticias" element={<GestionNoticiasPage />} />
          <Route path="crear-noticia" element={<CrearNoticiaPage />} />
          <Route path="editar-noticia/:id" element={<CrearNoticiaPage />} />
        </Route>

        {/* Foro Estudiantil para Alumnos/Familias (Acceso Privado) */}
        <Route path="/privado/foro" element={<ForoLayout />}>
          <Route index element={<ForoFeedPage />} />
          <Route path="discusion/:id" element={<ForoThreadPage />} />
          <Route path="perfil" element={<ForoProfilePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

