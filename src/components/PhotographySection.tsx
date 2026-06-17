import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const CategoryCarousel = ({ photos, title, onImageClick, globalOffset }: { 
  photos: string[], 
  title: string, 
  onImageClick: (idx: number) => void,
  globalOffset: number 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (isMobile) {
      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % photos.length);
      }, 5000);
    }
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isMobile, photos.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
    resetTimer();
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
    resetTimer();
  };

  if (!isMobile) {
    return (
      <div className="photo-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo, idx) => (
          <div 
            key={idx} 
            className="photo-card relative aspect-[3/4] overflow-hidden group bg-dark/5 cursor-pointer"
            onClick={() => onImageClick(globalOffset + idx)}
          >
            <img 
              src={photo} 
              alt={`${title} ${idx + 1}`} 
              className="w-full h-full object-cover block transition-transform duration-700 ease-in-out brightness-[0.98] group-hover:scale-[1.1]"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div 
      className="relative overflow-hidden touch-pan-y"
      onPointerDown={() => {
        if (timerRef.current) clearInterval(timerRef.current);
      }}
      onPointerUp={resetTimer}
      onPointerLeave={resetTimer}
    >
      <motion.div 
        className="flex"
        animate={{ x: `-${currentIndex * 100}%` }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.7}
        onDragEnd={(_, info) => {
          const swipeThreshold = 50;
          if (info.offset.x < -swipeThreshold) {
            handleNext();
          } else if (info.offset.x > swipeThreshold) {
            handlePrev();
          } else {
            resetTimer();
          }
        }}
      >
        {photos.map((photo, idx) => (
          <div 
            key={idx} 
            className="min-w-full aspect-[3/4] px-1"
          >
            <div className="w-full h-full overflow-hidden rounded-sm">
              <img 
                src={photo} 
                alt={`${title} ${idx + 1}`} 
                className="w-full h-full object-cover pointer-events-none"
              />
            </div>
          </div>
        ))}
      </motion.div>
      
      {/* Pagination Dots */}
      <div className="flex justify-center gap-1.5 mt-4">
        {photos.map((_, idx) => (
          <div 
            key={idx}
            className={`h-1 rounded-full transition-all duration-300 ${
              idx === currentIndex ? 'w-4 bg-accent' : 'w-1 bg-dark/20'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const PhotographySection = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Solo aplicar en desktop
    if (window.innerWidth < 768) return;

    const categoryBlocks = gsap.utils.toArray('.category-block');
    
    categoryBlocks.forEach((block: any) => {
      const title = block.querySelector('.category-title');
      const cards = block.querySelectorAll('.photo-card');

      // Animación del título de categoría
      gsap.from(title, {
        scrollTrigger: {
          trigger: title,
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        },
        x: -50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });

      // Animación de las fotos (stagger)
      gsap.from(cards, {
        scrollTrigger: {
          trigger: block,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out'
      });
    });

    // Animación del encabezado de sección
    gsap.from('.section-header', {
      scrollTrigger: {
        trigger: '.section-header',
        start: 'top 90%',
      },
      y: 30,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out'
    });
  }, { scope: sectionRef });

  const categories = [
    {
      title: 'Sports',
      photos: [
        '/assets/photo/sports/IMG_7081.AVIF',
        '/assets/photo/sports/IMG_7082.AVIF',
        '/assets/photo/sports/IMG_7083.AVIF',
        '/assets/photo/sports/IMG_7084.AVIF',
        '/assets/photo/sports/IMG_7085.AVIF',
        '/assets/photo/sports/IMG_7086.AVIF',
        '/assets/photo/sports/IMG_7087.AVIF',
        '/assets/photo/sports/IMG_7088.AVIF',
        '/assets/photo/sports/IMG_7089.AVIF',
      ]
    },
    {
      title: 'Travel',
      photos: [
        '/assets/photo/travel/IMG_7126.AVIF',
        '/assets/photo/travel/IMG_7127.AVIF',
        '/assets/photo/travel/IMG_7128.AVIF',
        '/assets/photo/travel/IMG_7129.AVIF',
        '/assets/photo/travel/IMG_7130.AVIF',
        '/assets/photo/travel/IMG_7131.AVIF',
        '/assets/photo/travel/IMG_7132.AVIF',
        '/assets/photo/travel/IMG_7133.AVIF',
        '/assets/photo/travel/IMG_7134.AVIF',
        '/assets/photo/travel/IMG_7135.AVIF',
        '/assets/photo/travel/IMG_7136.AVIF',
        '/assets/photo/travel/IMG_7137.AVIF',
      ]
    },
    {
      title: 'Portraits',
      photos: [
        '/assets/photo/portraits/IMG_7150.AVIF',
        '/assets/photo/portraits/IMG_7152.AVIF',
        '/assets/photo/portraits/IMG_7153.AVIF',
        '/assets/photo/portraits/IMG_7154.AVIF',
        '/assets/photo/portraits/IMG_7155.AVIF',
        '/assets/photo/portraits/IMG_7156.AVIF',
      ]
    },
    {
      title: 'Events',
      photos: [
        '/assets/photo/events/IMG_7103.AVIF',
        '/assets/photo/events/IMG_7104.AVIF',
        '/assets/photo/events/IMG_7105.AVIF',
        '/assets/photo/events/IMG_7106.AVIF',
        '/assets/photo/events/IMG_7107.AVIF',
        '/assets/photo/events/IMG_7108.AVIF',
        '/assets/photo/events/IMG_7109.AVIF',
        '/assets/photo/events/IMG_7110.AVIF',
        '/assets/photo/events/IMG_7111.AVIF',
      ]
    }
  ];

  const allPhotos = categories.flatMap(cat => cat.photos);

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % allPhotos.length);
    }
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + allPhotos.length) % allPhotos.length);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return;
      if (e.key === 'Escape') setSelectedImage(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  let currentGlobalOffset = 0;

  return (
    <section id="photography" ref={sectionRef} className="px-6 py-16 md:px-16 md:py-28 bg-cream overflow-hidden">
      <div className="section-header text-center mb-16">
        <span className="text-[0.62rem] font-light tracking-[0.28em] uppercase text-accent mb-6">
          03. Photography
        </span>
        <h2 className="font-serif text-[clamp(2rem,3.5vw,3.2rem)] font-light leading-[1.18] text-dark mt-4">
          Capturando la esencia<br /><em className="italic">en cada disparo</em>
        </h2>
      </div>

      <div className="space-y-16 md:space-y-24 max-w-[1400px] mx-auto">
        {categories.map((cat) => {
          const offset = currentGlobalOffset;
          currentGlobalOffset += cat.photos.length;
          return (
            <div key={cat.title} className="category-block">
              <h3 className="category-title font-serif text-2xl mb-8 border-l-2 border-accent pl-4 text-dark/80">
                {cat.title}
              </h3>
              <CategoryCarousel 
                photos={cat.photos} 
                title={cat.title} 
                onImageClick={setSelectedImage}
                globalOffset={offset}
              />
            </div>
          );
        })}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-10"
          >
            <button 
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-[110]"
              onClick={() => setSelectedImage(null)}
            >
              <X size={32} strokeWidth={1.5} />
            </button>

            <button 
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-[110] bg-black/20 p-2 rounded-full hidden md:block"
              onClick={handlePrev}
            >
              <ChevronLeft size={40} strokeWidth={1} />
            </button>

            <button 
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-[110] bg-black/20 p-2 rounded-full hidden md:block"
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
                src={allPhotos[selectedImage]} 
                alt="Selected"
                className="max-w-full max-h-[75vh] md:max-h-[80vh] object-contain shadow-2xl"
              />
              
              {/* Image Metadata */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center mt-6 text-white/90"
              >
                {(() => {
                  let currentCount = 0;
                  for (const cat of categories) {
                    if (selectedImage < currentCount + cat.photos.length) {
                      return (
                        <>
                          <span className="font-serif italic text-xl block mb-1">
                            {cat.title}
                          </span>
                          <span className="text-[0.7rem] uppercase tracking-widest text-white/50">
                            {selectedImage - currentCount + 1} / {cat.photos.length}
                          </span>
                        </>
                      );
                    }
                    currentCount += cat.photos.length;
                  }
                  return null;
                })()}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PhotographySection;
