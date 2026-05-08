import React from 'react';
import { Hero } from './components/Hero';
import { GallerySection } from './components/GallerySection';
import { ContactSection } from './components/ContactSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { MessageCircle } from 'lucide-react';

export const HomePage: React.FC = () => {
  return (
    <div className="relative">
      <Hero />
      <GallerySection />
      <ContactSection />
      <TestimonialsSection />

      {/* Floating Action Button (FAB) for WhatsApp/Chat from the wireframe */}
      <a
        href="https://wa.me/5493624000000"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-12 h-12 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all z-40 cursor-pointer"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle size={22} />
      </a>
    </div>
  );
};
