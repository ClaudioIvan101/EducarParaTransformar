import React, { useState, useEffect } from 'react';
import { 
  Award, 
  MessageSquare, 
  ThumbsUp, 
  Bookmark, 
  Download, 
  FileText, 
  CheckCircle2, 
  ArrowLeft,
  Edit2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { forumStore } from '../../features/comunidad/services/forumStore';
import type { StudentProfile, Discussion } from '../../features/comunidad/services/forumStore';

export const ForoProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [userPosts, setUserPosts] = useState<Discussion[]>([]);
  const [activeTab, setActiveTab] = useState<'posts' | 'replies' | 'saved'>('posts');

  useEffect(() => {
    setProfile(forumStore.getProfile());
    
    // Get all discussions posted by this student
    const allDiscussions = forumStore.getDiscussions();
    const myPosts = allDiscussions.filter(d => d.authorName === forumStore.getProfile().name);
    setUserPosts(myPosts);
  }, []);

  if (!profile) {
    return (
      <div className="py-20 text-center text-slate-400">
        Cargando perfil...
      </div>
    );
  }

  // Mock values for items that aren't dynamic
  const mockSharedFile = {
    title: 'Resumen: Algoritmos Avanzados - Unidad 4',
    description: 'PDF compartido con la comunidad de 3er año.',
    downloads: '1.2k descargas'
  };

  const mockReplies = [
    { threadTitle: 'Metodología de Estudio en Medicina: ¿Cómo abordar la anatomía clínica?', preview: 'A mí lo que me funcionó mucho fue el uso de Anki para las inserciones musculares...', date: 'Hace 2 horas', likes: 18 },
    { threadTitle: 'Bibliography recommendations for Advanced Epistemology II?', preview: 'Yo tengo el libro de Rudolf Carnap en PDF, si querés lo subo al drive y les paso el link.', date: 'Ayer', likes: 5 }
  ];

  const mockSavedTopics = [
    { title: 'Examen Final: Consejos de Preparación', comments: 85, category: 'Académico', date: '12 Oct' },
    { title: 'Nuevas pautas de bioseguridad en laboratorios', comments: 22, category: 'Vida Escolar', date: '28 Sep' }
  ];

  return (
    <div className="space-y-8 text-left animate-fadeIn">
      
      {/* Back button */}
      <div>
        <Link
          to="/privado/foro"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-edu-secondary transition-colors text-xs font-bold uppercase tracking-wider group cursor-pointer"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>Volver al foro</span>
        </Link>
      </div>

      {/* Profile Header Box */}
      <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200/60 flex flex-col md:flex-row gap-8 items-start md:items-center relative overflow-hidden">
        <div className="absolute top-[-30px] right-[-30px] w-48 h-48 rounded-full bg-slate-50 pointer-events-none" />
        
        {/* Avatar with Verified badge */}
        <div className="relative shrink-0 mx-auto md:mx-0">
          <div className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-slate-100 overflow-hidden shadow-sm">
            <img src={profile.avatar} alt="Avatar de Estudiante" className="w-full h-full object-cover" />
          </div>
          <div className="absolute bottom-1 right-1 bg-edu-secondary text-white w-7 h-7 rounded-full flex items-center justify-center border-2 border-white shadow-sm" title="Usuario Verificado">
            <CheckCircle2 size={14} className="fill-edu-secondary text-white" />
          </div>
        </div>

        {/* Identity & stats info */}
        <div className="flex-1 space-y-4 text-center md:text-left">
          <div className="space-y-1.5">
            <div className="flex flex-col md:flex-row items-center gap-3">
              <h1 className="text-xl md:text-2xl font-bold text-edu-primary">{profile.name}</h1>
              <div className="flex gap-1.5">
                {profile.badges.map((badge, idx) => (
                  <span 
                    key={idx} 
                    className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                      badge === 'Mentor' 
                        ? 'bg-edu-primary/10 text-edu-primary' 
                        : 'bg-edu-secondary/10 text-edu-secondary'
                    }`}
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
            <p className="text-xs md:text-sm font-semibold text-slate-400">
              {profile.role}
            </p>
          </div>

          <div className="flex justify-center md:justify-start gap-8 pt-3 border-t border-slate-100 max-w-md">
            <div>
              <span className="block text-base font-bold text-edu-primary leading-none">{profile.reputation}</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1 block">Reputación</span>
            </div>
            <div className="border-x border-slate-200 px-8">
              <span className="block text-base font-bold text-edu-primary leading-none">{profile.postsCount}</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1 block">Temas</span>
            </div>
            <div>
              <span className="block text-base font-bold text-edu-primary leading-none">{profile.badgesCount}</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1 block">Insignias</span>
            </div>
          </div>
        </div>

        {/* Edit profile button */}
        <button
          onClick={() => alert('Edición de perfil (simulación)')}
          className="w-full md:w-auto md:self-start h-10 px-5 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-600 hover:text-slate-800 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
        >
          <Edit2 size={13} />
          <span>Editar Perfil</span>
        </button>

      </section>

      {/* Navigation tabs */}
      <nav className="flex gap-8 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('posts')}
          className={`py-3 text-xs font-bold uppercase tracking-wider cursor-pointer relative transition-all ${
            activeTab === 'posts' ? 'text-edu-secondary' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <span>Mis Publicaciones</span>
          {activeTab === 'posts' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-edu-secondary" />}
        </button>
        <button
          onClick={() => setActiveTab('replies')}
          className={`py-3 text-xs font-bold uppercase tracking-wider cursor-pointer relative transition-all ${
            activeTab === 'replies' ? 'text-edu-secondary' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <span>Mis Respuestas</span>
          {activeTab === 'replies' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-edu-secondary" />}
        </button>
        <button
          onClick={() => setActiveTab('saved')}
          className={`py-3 text-xs font-bold uppercase tracking-wider cursor-pointer relative transition-all ${
            activeTab === 'saved' ? 'text-edu-secondary' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <span>Temas Guardados</span>
          {activeTab === 'saved' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-edu-secondary" />}
        </button>
      </nav>

      {/* Tab contents */}
      <div className="tab-content">
        
        {/* TAB 1: My posts grid */}
        {activeTab === 'posts' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            
            {/* Featured Post (Aspect video card - taking 8 cols on md) */}
            {userPosts.length > 0 ? (
              <>
                <article className="col-span-12 md:col-span-8 bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-all duration-300">
                  <div className="aspect-video relative overflow-hidden bg-slate-100 max-h-64">
                    <img 
                      src={userPosts[0].image || 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=600'} 
                      alt="" 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103" 
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-edu-primary/90 text-white px-2.5 py-0.5 rounded-lg font-label-caps text-[9px] uppercase tracking-wider">
                        {userPosts[0].category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex-grow flex flex-col justify-center text-left">
                    <span className="text-[10px] text-slate-400 font-bold block mb-1.5">{userPosts[0].date}</span>
                    <Link to={`/privado/foro/discusion/${userPosts[0].id}`} className="block">
                      <h3 className="text-base font-bold text-slate-800 hover:text-edu-secondary transition-colors line-clamp-1 leading-snug">
                        {userPosts[0].title}
                      </h3>
                    </Link>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-2 leading-relaxed">
                      {userPosts[0].lead}
                    </p>
                    <div className="flex items-center gap-4 mt-4 pt-3 border-t border-slate-100/60 text-slate-400 text-[10px] font-bold">
                      <span className="flex items-center gap-1">
                        <ThumbsUp size={12} />
                        {userPosts[0].score} likes
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare size={12} />
                        {userPosts[0].repliesCount} comentarios
                      </span>
                    </div>
                  </div>
                </article>

                {/* Additional posts as smaller cards */}
                <div className="col-span-12 md:col-span-4 flex flex-col gap-4">
                  {userPosts.slice(1).map((post) => (
                    <article 
                      key={post.id} 
                      className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm hover:border-edu-secondary/40 transition-all flex flex-col justify-between flex-grow text-left group"
                    >
                      <div>
                        <span className="bg-edu-secondary/10 text-edu-primary px-2.5 py-0.5 rounded-full font-label-caps text-[8px] tracking-wider uppercase mb-3 inline-block">
                          {post.category}
                        </span>
                        <Link to={`/privado/foro/discusion/${post.id}`}>
                          <h3 className="text-xs md:text-sm font-bold text-slate-800 hover:text-edu-secondary transition-colors line-clamp-2 leading-snug">
                            {post.title}
                          </h3>
                        </Link>
                      </div>
                      <div className="flex justify-between items-center mt-4 pt-2 border-t border-slate-50 text-[10px] text-slate-400 font-bold">
                        <span>{post.date}</span>
                        <div className="flex gap-2">
                          <span>{post.score} l</span>
                          <span>{post.repliesCount} c</span>
                        </div>
                      </div>
                    </article>
                  ))}
                  
                  {/* Fallback card if only 1 post */}
                  {userPosts.length === 1 && (
                    <div className="bg-slate-100/30 rounded-2xl border border-dashed border-slate-200 p-6 flex flex-col items-center justify-center text-center flex-grow py-12">
                      <Award size={20} className="text-slate-300 mb-2" />
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Tu historial de participación</p>
                      <p className="text-[10px] text-slate-400 mt-1 max-w-xs">Tus aportes aumentan el puntaje de reputación institucional.</p>
                    </div>
                  )}

                </div>
              </>
            ) : (
              <div className="col-span-12 bg-white rounded-2xl p-12 text-center border border-slate-200/60 shadow-sm max-w-md mx-auto">
                <FileText className="text-slate-300 mx-auto mb-3" size={32} />
                <p className="text-sm font-bold text-slate-700">Aún no publicaste temas</p>
                <p className="text-xs text-slate-400 mt-1">Comenzá preguntando o aportando dudas en el foro principal.</p>
                <Link to="/privado/foro?create=true" className="mt-4 inline-flex items-center gap-1.5 bg-edu-secondary text-white px-4 py-2 rounded-lg text-xs font-bold uppercase cursor-pointer">
                  Publicar Tema
                </Link>
              </div>
            )}

            {/* List Item: Task Focused Download File */}
            <div className="col-span-12 bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex gap-4 items-center text-left w-full sm:w-auto">
                <div className="w-10 h-10 bg-edu-secondary/15 rounded-lg flex items-center justify-center text-edu-secondary shrink-0">
                  <FileText size={20} />
                </div>
                <div>
                  <h4 className="text-xs md:text-sm font-bold text-slate-800">{mockSharedFile.title}</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5 font-medium">{mockSharedFile.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 justify-between sm:justify-end w-full sm:w-auto border-t sm:border-t-0 border-slate-50 pt-2 sm:pt-0">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{mockSharedFile.downloads}</span>
                <button
                  onClick={() => alert('Descarga del archivo iniciada (simulación).')}
                  className="p-2 bg-slate-50 hover:bg-slate-100 hover:text-edu-secondary text-slate-600 rounded-lg border border-slate-200/40 transition-colors cursor-pointer"
                  title="Descargar PDF"
                >
                  <Download size={14} />
                </button>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: Replies History */}
        {activeTab === 'replies' && (
          <div className="space-y-4">
            {mockReplies.map((reply, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm text-left space-y-3">
                <div className="flex justify-between items-start">
                  <h4 className="text-xs md:text-sm font-bold text-slate-400">
                    Respuesta en: <Link to="/privado/foro/discusion/1" className="text-edu-primary hover:underline font-bold text-xs md:text-sm">{reply.threadTitle}</Link>
                  </h4>
                  <span className="text-[10px] text-slate-400 font-bold shrink-0">{reply.date}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed italic bg-slate-50/50 p-3 rounded-lg border border-slate-100">
                  "{reply.preview}"
                </p>
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                  <ThumbsUp size={12} />
                  <span>{reply.likes} likes recibidos</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: Saved topics list */}
        {activeTab === 'saved' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockSavedTopics.map((topic, idx) => (
              <article 
                key={idx} 
                className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm hover:border-edu-secondary/40 transition-all flex flex-col justify-between text-left group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-edu-secondary/15 text-edu-primary px-2.5 py-0.5 rounded-full font-label-caps text-[8px] tracking-wider uppercase">
                      {topic.category}
                    </span>
                    <button 
                      onClick={() => alert('Tema quitado de guardados.')}
                      className="text-edu-secondary cursor-pointer"
                      title="Quitar marcador"
                    >
                      <Bookmark size={14} className="fill-edu-secondary" />
                    </button>
                  </div>
                  <Link to="/privado/foro/discusion/1">
                    <h3 className="text-xs md:text-sm font-bold text-slate-800 hover:text-edu-secondary transition-colors line-clamp-2 leading-snug">
                      {topic.title}
                    </h3>
                  </Link>
                </div>
                <div className="flex justify-between items-center mt-4 pt-2 border-t border-slate-50 text-[10px] text-slate-400 font-bold">
                  <span>Guardado el {topic.date}</span>
                  <span className="flex items-center gap-1"><MessageSquare size={12} /> {topic.comments} c</span>
                </div>
              </article>
            ))}
          </div>
        )}

      </div>

    </div>
  );
};
