import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const SOCIAL_LINKS = {
  instagram: 'https://instagram.com/TU_USUARIO',
  tiktok:    'https://tiktok.com/@TU_USUARIO',
  facebook:  'https://facebook.com/TU_USUARIO',
};

const IconInstagram = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>
  </svg>
);

const IconTikTok = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
  </svg>
);

const IconFacebook = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const socialButtons = [
  { key: 'instagram', Icon: IconInstagram, label: 'Instagram', color: '#E1306C' },
  { key: 'tiktok',    Icon: IconTikTok,    label: 'TikTok',    color: '#010101' },
  { key: 'facebook',  Icon: IconFacebook,  label: 'Facebook',  color: '#1877F2' },
];

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
      <div className="photo-grid columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {photos.map((photo, idx) => {
          const ratios = ['aspect-[3/4]', 'aspect-square', 'aspect-[4/5]', 'aspect-[2/3]'];
          const ratio = ratios[idx % ratios.length];
          const offsets = ['', 'md:mt-12', 'md:-mt-8', 'md:mt-6'];
          const offset = offsets[idx % offsets.length];

          return (
            <div 
              key={idx} 
              className={`photo-card relative ${ratio} ${offset} break-inside-avoid mb-4 overflow-hidden group bg-dark/5 cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-500`}
              onClick={() => onImageClick(globalOffset + idx)}
            >
              <img 
                src={photo} 
                alt={`${title} ${idx + 1}`} 
                className="w-full h-full object-cover block transition-transform duration-700 ease-in-out brightness-[0.98] group-hover:scale-[1.1]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-dark/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <span className="text-white/80 text-xs tracking-[0.2em] uppercase font-light border-b border-white/30 pb-1">
                  Ver detalle
                </span>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div 
      className="relative overflow-hidden touch-pan-y"
      onPointerDown={() => { if (timerRef.current) clearInterval(timerRef.current); }}
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
          if (info.offset.x < -swipeThreshold) handleNext();
          else if (info.offset.x > swipeThreshold) handlePrev();
          else resetTimer();
        }}
      >
        {photos.map((photo, idx) => (
          <div key={idx} className="min-w-full aspect-[3/4] px-1">
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
    const categoryBlocks = gsap.utils.toArray('.category-block');
    
    categoryBlocks.forEach((block: any) => {
      const title = block.querySelector('.category-title');
      const content = block.querySelector('.photo-grid') || block.querySelector('.relative.overflow-hidden');

      gsap.from(title, {
        scrollTrigger: {
          trigger: title,
          start: 'top 92%',
          toggleActions: 'play none none reverse'
        },
        x: -30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });

      if (content) {
        gsap.from(content, {
          scrollTrigger: {
            trigger: content,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          y: 40,
          opacity: 0,
          duration: 1,
          ease: 'power2.out'
        });
      }
    });

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
    if (selectedImage !== null) setSelectedImage((selectedImage + 1) % allPhotos.length);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedImage !== null) setSelectedImage((selectedImage - 1 + allPhotos.length) % allPhotos.length);
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

      {/* Redes sociales — al pie de la sección */}
      <div className="flex items-center justify-center gap-5 mt-20 pt-10 border-t border-accent/20 max-w-[1400px] mx-auto">
        <span className="font-serif italic text-sm text-accent">Seguime</span>
        {socialButtons.map(({ key, Icon, label, color }) => (
          <a
            key={key}
            href={SOCIAL_LINKS[key as keyof typeof SOCIAL_LINKS]}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-200"
            style={{ color, border: `1px solid ${color}33` }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = color + '88';
              (e.currentTarget as HTMLElement).style.transform = 'scale(1.15) translateY(-2px)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = color + '33';
              (e.currentTarget as HTMLElement).style.transform = 'scale(1) translateY(0)';
            }}
          >
            <Icon />
          </a>
        ))}
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
                          <span className="font-serif italic text-xl block mb-1">{cat.title}</span>
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