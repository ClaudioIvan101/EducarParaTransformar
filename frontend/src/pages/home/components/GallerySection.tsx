import React from 'react';
import imagenInfraestructura from '../../../assets/service/imagen-infraestructura.png';
import imagenBiblioteca from '../../../assets/service/imagen-biblioteca.png';
import imagenDeportes from '../../../assets/service/imagen-deportes.png';
import imagenTalleres from '../../../assets/service/imagen-talleres.png';
import imagenAulas from '../../../assets/service/imagen-aulas.png';
import imagenLaboratorio from '../../../assets/service/imagen-laboratorio.png';
import imagenPatio from '../../../assets/service/imagen-patio.png';
import imagenCiencia from '../../../assets/service/imagen-ciencia.png';
import imagenMusica from '../../../assets/service/imagen-musica.png';

interface GalleryCardProps {
  imgSrc: string;
  title: string;
  className?: string;
}

const GalleryCard: React.FC<GalleryCardProps> = ({ imgSrc, title, className = "" }) => (
  <div className={`group relative overflow-hidden rounded-xl shadow-sm bg-gray-100 h-[280px] md:h-[400px] ${className}`}>
    <img 
      src={imgSrc} 
      alt={title} 
      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
      <h4 className="text-white text-lg font-semibold tracking-wide translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
        {title}
      </h4>
    </div>
    {/* Optional permanent subtle label at bottom left for mobile readability */}
    <div className="absolute bottom-4 left-4 md:hidden bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs font-medium">
      {title}
    </div>
  </div>
);

export const GallerySection: React.FC = () => {
  return (
    <section className="pt-6 pb-10 px-4 max-w-7xl mx-auto relative">
      {/* Compact separating line */}
      <div className="max-w-4xl mx-auto border-t border-slate-200 opacity-70 mb-12"></div>
      
      <div className="mb-12 text-center">
        <div className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-wider text-edu-primary uppercase bg-blue-50 rounded-full">
          Recorré Nuestras Instalaciones
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-edu-dark tracking-tight">
          Galería Institucional
        </h2>
      </div>

      <div className="flex flex-col gap-4">
        {/* Row 1: 45% | 55% */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-[45%]">
            <GalleryCard imgSrc={imagenInfraestructura} title="Moderna Infraestructura" />
          </div>
          <div className="w-full md:w-[55%]">
            <GalleryCard imgSrc={imagenAulas} title="Aulas Luminosas" />
          </div>
        </div>

        {/* Row 2: 25% | 29% | 46% */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-[25%]">
            <GalleryCard imgSrc={imagenBiblioteca} title="Biblioteca Central" />
          </div>
          <div className="w-full md:w-[29%]">
            <GalleryCard imgSrc={imagenCiencia} title="Ciencias Experimentales" />
          </div>
          <div className="w-full md:w-[46%]">
            <GalleryCard imgSrc={imagenLaboratorio} title="Laboratorio de Innovación" />
          </div>
        </div>

        {/* Row 3: 100% */}
        <div className="w-full">
          <GalleryCard imgSrc={imagenPatio} title="Patio y Espacios Verdes" className="md:h-[450px]" />
        </div>

        {/* Row 4: 50% (stacked) | 50% */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-[50%] flex flex-col gap-4">
            <GalleryCard imgSrc={imagenDeportes} title="Campo de Deportes" className="!h-[132px] md:!h-[192px]" />
            <GalleryCard imgSrc={imagenMusica} title="Estudio de Artes y Música" className="!h-[132px] md:!h-[192px]" />
          </div>
          <div className="w-full md:w-[50%]">
            <GalleryCard imgSrc={imagenTalleres} title="Talleres Técnicos" />
          </div>
        </div>
      </div>
    </section>
  );
};
