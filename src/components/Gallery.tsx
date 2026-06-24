import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const photos = [
    {
      url: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=1200&auto=format&fit=crop&q=80',
      caption: 'Golden hour ceremony',
      className: 'lg:col-span-2 aspect-[16/10]'
    },
    {
      url: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&auto=format&fit=crop&q=80',
      caption: 'Bridal portrait',
      className: 'aspect-[3/4]'
    },
    {
      url: 'https://images.unsplash.com/photo-1464061884326-64f6d5e13e4a?w=800&auto=format&fit=crop&q=80',
      caption: 'Nova Scotia elopement',
      className: 'aspect-[3/4]'
    },
    {
      url: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800&auto=format&fit=crop&q=80',
      caption: 'Candid reception',
      className: 'aspect-[3/4]'
    },
    {
      url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&auto=format&fit=crop&q=80',
      caption: 'First dance',
      className: 'lg:col-span-2 aspect-[16/10]'
    }
  ];

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % photos.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + photos.length) % photos.length);
    }
  };

  return (
    <section className="px-6 py-14 lg:px-16 lg:py-24 bg-warm-white" id="portfolio">
      <div className="text-center mb-14">
        <span className="text-[0.62rem] font-light tracking-[0.28em] uppercase text-accent mb-6">
          Portfolio
        </span>
        <h2 className="font-serif text-[clamp(2rem,3.5vw,3.2rem)] font-light leading-[1.18] text-dark mt-4">
          Love stories<br /><em className="italic">in every frame</em>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2.5">
        {photos.map((photo, index) => (
          <div 
            key={index} 
            className={`relative overflow-hidden cursor-pointer group ${photo.className}`}
            onClick={() => setSelectedImage(index)}
          >
            <img 
              src={photo.url} 
              alt={photo.caption} 
              loading="lazy"
              className="w-full h-full object-cover block transition-transform duration-700 ease-in-out brightness-[0.97] saturate-[0.92] group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-[rgba(20,17,14,0)] flex items-end p-6 transition-colors duration-300 group-hover:bg-[rgba(20,17,14,0.28)]">
              <span className="font-serif text-[1rem] italic font-light text-[rgba(255,255,255,0)] transition-colors duration-300 group-hover:text-[rgba(255,255,255,0.9)]">
                {photo.caption}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <a 
          href="#" 
          className="inline-flex items-center gap-2 text-[0.68rem] font-light tracking-[0.18em] uppercase text-dark no-underline border-b border-accent pb-1 transition-all duration-200 hover:text-accent group"
        >
          View Full Gallery
          <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
        </a>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 lg:p-10"
          >
            <button 
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-[110]"
              onClick={() => setSelectedImage(null)}
            >
              <X size={32} strokeWidth={1.5} />
            </button>

            <button 
              className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-[110] bg-black/20 p-2 rounded-full"
              onClick={handlePrev}
            >
              <ChevronLeft size={40} strokeWidth={1} />
            </button>

            <button 
              className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-[110] bg-black/20 p-2 rounded-full"
              onClick={handleNext}
            >
              <ChevronRight size={40} strokeWidth={1} />
            </button>

            <motion.div 
              key={selectedImage}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative max-w-full max-h-full flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={photos[selectedImage].url} 
                alt={photos[selectedImage].caption}
                className="max-w-full max-h-[85vh] object-contain shadow-2xl"
              />
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-white/80 font-serif italic text-lg mt-6"
              >
                {photos[selectedImage].caption}
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
