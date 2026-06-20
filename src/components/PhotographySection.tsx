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

const socialButtons = [
  { key: 'instagram', Icon: IconInstagram, label: 'Instagram', color: '#E1306C' },
  { key: 'tiktok',    Icon: IconTikTok,    label: 'TikTok',    color: '#010101' },
];

const categories = [
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
    title: 'Sports',
    photos: [
      '/assets/photo/sports/IMG_7085.AVIF',
      '/assets/photo/sports/IMG_7086.AVIF',
      '/assets/photo/sports/IMG_7087.AVIF',
      '/assets/photo/sports/IMG_7089.AVIF',
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

const featuredPhotos = [
  {
    src: '/assets/photo/travel/IMG_7133.AVIF',
    title: 'Playa y palmeras',
    rotation: -5,
    top: '5%',
    left: '32%',
    width: '18%',
    hasTag: true,
    tagText: 'playa paraíso',
    tagLoc: 'TULUM, MX',
    tapeStyle: { transform: 'rotate(-4deg)', top: '-14px', width: '70px' }
  },
  {
    src: '/assets/photo/travel/IMG_7126.AVIF',
    title: 'Casas blancas',
    rotation: 2,
    top: '1%',
    right: '23%',
    width: '17%',
    tapeStyle: { transform: 'rotate(5deg)', top: '-12px', width: '80px' }
  },
  {
    src: '/assets/photo/travel/IMG_7135.AVIF',
    title: 'Mirando al mar',
    rotation: 3,
    top: '32%',
    left: '37%',
    width: '24%',
    hasNote: true,
    noteText: 'explorar, descubrir, vivir',
    tapeStyle: { transform: 'rotate(1deg)', top: '-16px', width: '90px' }
  },
  {
    src: '/assets/photo/travel/IMG_7132.AVIF',
    title: 'Costa rocosa',
    rotation: -2,
    top: '32%',
    right: '10%',
    width: '19%',
    tapeStyle: { transform: 'rotate(-3deg)', top: '-14px', width: '75px' }
  },
  {
    src: '/assets/photo/sports/IMG_7085.AVIF',
    title: 'Surf van',
    rotation: -4,
    bottom: '12%',
    left: '14%',
    width: '20%',
    hasTicket: true,
    tapeStyle: { transform: 'rotate(2deg)', top: '-15px', width: '85px' }
  },
  {
    src: '/assets/photo/travel/IMG_7128.AVIF',
    title: 'Pirámide Maya',
    rotation: 4,
    bottom: '4%',
    left: '52%',
    width: '18%',
    hasHorizonNote: true,
    tapeStyle: { transform: 'rotate(-2deg)', top: '-14px', width: '70px' }
  },
  {
    src: '/assets/photo/travel/IMG_7130.AVIF',
    title: 'Tarde de coco',
    rotation: -3,
    bottom: '5%',
    right: '6%',
    width: '19%',
    tapeStyle: { transform: 'rotate(3deg)', top: '-14px', width: '75px' }
  }
];

const PHOTO_DECORATIONS: Record<string, {
  title: string;
  rotation: number;
  hasTag?: boolean;
  tagText?: string;
  hasNote?: boolean;
  hasHorizonNote?: boolean;
  hasTicket?: boolean;
}> = {
  // Travel
  '/assets/photo/travel/IMG_7126.AVIF': { title: 'Casas blancas', rotation: 2 },
  '/assets/photo/travel/IMG_7127.AVIF': { title: 'Grecia azul', rotation: -3, hasTag: true, tagText: 'Santorini' },
  '/assets/photo/travel/IMG_7128.AVIF': { title: 'Pirámide Maya', rotation: 4, hasHorizonNote: true },
  '/assets/photo/travel/IMG_7129.AVIF': { title: 'Cúpulas de iglesias', rotation: -2 },
  '/assets/photo/travel/IMG_7130.AVIF': { title: 'Tarde de coco', rotation: -3 },
  '/assets/photo/travel/IMG_7131.AVIF': { title: 'Callejón de piedra', rotation: 3 },
  '/assets/photo/travel/IMG_7132.AVIF': { title: 'Costa rocosa', rotation: -2 },
  '/assets/photo/travel/IMG_7133.AVIF': { title: 'Playa y palmeras', rotation: -5, hasTag: true, tagText: 'Tulum, MX' },
  '/assets/photo/travel/IMG_7134.AVIF': { title: 'Atardecer dorado', rotation: 4 },
  '/assets/photo/travel/IMG_7135.AVIF': { title: 'Mirando al mar', rotation: 3, hasNote: true },
  '/assets/photo/travel/IMG_7136.AVIF': { title: 'Calle de flores', rotation: -3 },
  '/assets/photo/travel/IMG_7137.AVIF': { title: 'Ruta desierta', rotation: 2 },

  // Sports
  '/assets/photo/sports/IMG_7085.AVIF': { title: 'Surf van', rotation: -4, hasTicket: true },
  '/assets/photo/sports/IMG_7086.AVIF': { title: 'En la cresta', rotation: 3 },
  '/assets/photo/sports/IMG_7087.AVIF': { title: 'Viento en vela', rotation: -2 },
  '/assets/photo/sports/IMG_7089.AVIF': { title: 'Ola salvaje', rotation: 4 },

  // Portraits
  '/assets/photo/portraits/IMG_7150.AVIF': { title: 'Retrato cálido', rotation: -2 },
  '/assets/photo/portraits/IMG_7152.AVIF': { title: 'Miradas', rotation: 3, hasTag: true, tagText: 'Retrato' },
  '/assets/photo/portraits/IMG_7153.AVIF': { title: 'Esencia', rotation: -3 },
  '/assets/photo/portraits/IMG_7154.AVIF': { title: 'Enfoque', rotation: 2 },
  '/assets/photo/portraits/IMG_7155.AVIF': { title: 'Retrato nocturno', rotation: -3 },
  '/assets/photo/portraits/IMG_7156.AVIF': { title: 'Luz natural', rotation: 4 },

  // Events
  '/assets/photo/events/IMG_7103.AVIF': { title: 'Brindis de boda', rotation: -3 },
  '/assets/photo/events/IMG_7104.AVIF': { title: 'Música en vivo', rotation: 2 },
  '/assets/photo/events/IMG_7105.AVIF': { title: 'Gran noche', rotation: -4, hasTag: true, tagText: 'Concierto' },
  '/assets/photo/events/IMG_7106.AVIF': { title: 'Luces de fiesta', rotation: 3 },
  '/assets/photo/events/IMG_7107.AVIF': { title: 'Celebración', rotation: -2 },
  '/assets/photo/events/IMG_7108.AVIF': { title: 'Detalles del salón', rotation: 4 },
  '/assets/photo/events/IMG_7109.AVIF': { title: 'Alegría compartida', rotation: -3 },
  '/assets/photo/events/IMG_7110.AVIF': { title: 'Encuentros', rotation: 2 },
  '/assets/photo/events/IMG_7111.AVIF': { title: 'Instantes', rotation: -4 }
};

const MOBILE_CATEGORIES = [
  {
    category: 'TRAVEL',
    src: '/assets/photo/travel/IMG_7126.AVIF',
    label: 'viajes',
    rotation: 6,
    style: { top: '0%', right: '1%', width: '32%', zIndex: 15 },
    tapeStyle: { transform: 'rotate(4deg)', top: '-8px', width: '40px' }
  },
  {
    category: 'SPORTS',
    src: '/assets/photo/sports/IMG_7085.AVIF',
    label: 'deportes',
    rotation: -6,
    style: { top: '42%', left: '-2%', width: '32%', zIndex: 25 },
    tapeStyle: { transform: 'rotate(-4deg)', top: '-8px', width: '40px' }
  },
  {
    category: 'PORTRAITS',
    src: '/assets/photo/travel/IMG_7130.AVIF',
    label: 'retratos',
    rotation: 4,
    style: { top: '48%', right: '-2%', width: '32%', zIndex: 25 },
    tapeStyle: { transform: 'rotate(3deg)', top: '-8px', width: '40px' }
  },
  {
    category: 'EVENTS',
    src: '/assets/photo/travel/IMG_7132.AVIF',
    label: 'eventos',
    rotation: -3,
    style: { bottom: '12%', left: '1%', width: '31%', zIndex: 25 },
    tapeStyle: { transform: 'rotate(-3deg)', top: '-8px', width: '40px' }
  },
  {
    category: 'All',
    src: '/assets/photo/travel/IMG_7128.AVIF',
    label: 'todos',
    rotation: 2,
    style: { bottom: '8%', left: '34%', width: '32%', zIndex: 25 },
    tapeStyle: { transform: 'rotate(2deg)', top: '-8px', width: '40px' }
  },
  {
    category: 'Featured',
    src: '/assets/photo/travel/IMG_7135.AVIF',
    label: 'destacadas',
    rotation: -4,
    style: { bottom: '13%', right: '1%', width: '31%', zIndex: 25 },
    tapeStyle: { transform: 'rotate(-2deg)', top: '-8px', width: '40px' }
  }
];

const paperGrainUrl = "data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.015'/%3E%3C/svg%3E";

const PalmShadow = () => (
  <svg 
    className="absolute -top-20 -right-20 w-[700px] h-[700px] text-black pointer-events-none select-none opacity-[0.03] blur-[12px] z-0" 
    viewBox="0 0 500 500" 
    fill="currentColor"
  >
    <path d="M 50,450 C 150,350 300,200 450,50 C 350,150 200,300 50,450 Z" />
    <path d="M 120,380 C 100,300 150,220 280,150 C 200,220 150,300 120,380 Z" />
    <path d="M 160,340 C 150,250 200,180 320,120 C 240,180 190,250 160,340 Z" />
    <path d="M 200,300 C 200,200 250,140 360,90 C 280,140 240,200 200,300 Z" />
    <path d="M 240,260 C 250,160 300,100 400,60 C 320,100 290,160 240,260 Z" />
    <path d="M 90,410 C 50,360 80,280 180,220 C 120,280 90,360 90,410 Z" />
    <path d="M 130,370 C 90,320 120,240 220,180 C 160,240 130,320 130,370 Z" />
    <path d="M 170,330 C 130,280 160,200 260,140 C 200,200 170,280 170,330 Z" />
    <path d="M 210,290 C 170,240 200,160 300,100 C 240,160 210,240 210,290 Z" />
  </svg>
);

const slideVariants = {
  enter: (direction: 'next' | 'prev') => ({
    x: direction === 'next' ? 120 : -120,
    opacity: 0,
    scale: 0.96
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1
  },
  exit: (direction: 'next' | 'prev') => ({
    x: direction === 'next' ? -120 : 120,
    opacity: 0,
    scale: 0.96
  })
};

const PhotographySection = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('Featured');
  const sectionRef = useRef<HTMLDivElement>(null);

  // Mobile slider states
  const [mobileIndex, setMobileIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'next' | 'prev'>('next');
  const [lightboxDirection, setLightboxDirection] = useState<'next' | 'prev'>('next');
  const isAnimatingRef = useRef(false);
  const touchStartRef = useRef<number | null>(null);
  const lightboxTouchStartRef = useRef<number | null>(null);
  const hasTriggeredEntranceRef = useRef(false);

  // Reset mobile index on tab change to prevent out of bounds crashes
  useEffect(() => {
    setMobileIndex(0);
  }, [activeCategory]);

  const lastInteractionTimeRef = useRef(Date.now());

  // Reset interaction timer on state changes (both user and automatic slides)
  useEffect(() => {
    lastInteractionTimeRef.current = Date.now();
  }, [activeCategory, mobileIndex]);

  // Get active images based on selected category
  const visiblePhotos = (() => {
    if (activeCategory === 'Featured') {
      return featuredPhotos.map(f => f.src);
    }
    if (activeCategory === 'All') {
      return categories.flatMap(cat => cat.photos);
    }
    const cat = categories.find(c => c.title.toUpperCase() === activeCategory.toUpperCase());
    return cat ? cat.photos : [];
  })();

  // Normalize visible photos for the slider
  const sliderItems = (() => {
    if (activeCategory === 'Featured') {
      return featuredPhotos.map(p => ({
        src: p.src,
        title: p.title,
        rotation: p.rotation,
        tapeStyle: p.tapeStyle,
        hasTag: p.hasTag,
        tagText: p.tagText,
        hasNote: p.hasNote,
        hasHorizonNote: p.hasHorizonNote,
        hasTicket: p.hasTicket
      }));
    }
    
    // For other categories, map using the dictionary
    return visiblePhotos.map(src => {
      const dec = PHOTO_DECORATIONS[src] || { title: 'Fotografía', rotation: 2 };
      return {
        src,
        title: dec.title,
        rotation: dec.rotation,
        tapeStyle: { transform: `rotate(${dec.rotation * -0.5 + 2}deg)`, top: '-14px', width: '75px' },
        hasTag: dec.hasTag,
        tagText: dec.tagText,
        hasNote: dec.hasNote,
        hasHorizonNote: dec.hasHorizonNote,
        hasTicket: dec.hasTicket
      };
    });
  })();

  // Slide transition with tear-off exit animation
  const handleMobileSlideChange = (direction: 'next' | 'prev') => {
    if (isAnimatingRef.current || sliderItems.length === 0) return;
    isAnimatingRef.current = true;
    
    const exitX = direction === 'next' ? -250 : 250;
    const exitY = 350;
    const exitRotation = direction === 'next' ? -35 : 35;
    
    gsap.to('.mobile-polaroid-active', {
      x: exitX,
      y: exitY,
      rotation: exitRotation,
      opacity: 0,
      duration: 0.45,
      ease: 'power2.in',
      onComplete: () => {
        const nextIndex = direction === 'next' 
          ? (mobileIndex + 1) % sliderItems.length 
          : (mobileIndex - 1 + sliderItems.length) % sliderItems.length;
        
        setSlideDirection(direction);
        setMobileIndex(nextIndex);
      }
    });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    lastInteractionTimeRef.current = Date.now();
    if (isAnimatingRef.current) return;
    touchStartRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    lastInteractionTimeRef.current = Date.now();
    if (touchStartRef.current === null || isAnimatingRef.current) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStartRef.current - touchEnd;
    const swipeThreshold = 50;

    if (diff > swipeThreshold) {
      handleMobileSlideChange('next');
    } else if (diff < -swipeThreshold) {
      handleMobileSlideChange('prev');
    }
    touchStartRef.current = null;
  };

  const handleAutoPlaySlide = () => {
    if (isAnimatingRef.current || sliderItems.length <= 1) return;
    isAnimatingRef.current = true;
    
    // Choose random direction
    const direction = Math.random() > 0.5 ? 'next' : 'prev';
    
    // Choose random next index different from current index
    let nextIndex = mobileIndex;
    while (nextIndex === mobileIndex) {
      nextIndex = Math.floor(Math.random() * sliderItems.length);
    }
    
    const exitX = direction === 'next' ? -250 : 250;
    const exitY = 350;
    const exitRotation = direction === 'next' ? -35 : 35;
    
    gsap.to('.mobile-polaroid-active', {
      x: exitX,
      y: exitY,
      rotation: exitRotation,
      opacity: 0,
      duration: 0.45,
      ease: 'power2.in',
      onComplete: () => {
        setSlideDirection(direction);
        setMobileIndex(nextIndex);
      }
    });
  };

  // Autoplay interval for mobile only
  useEffect(() => {
    const isLargeScreen = window.innerWidth >= 1024;
    if (isLargeScreen) return;

    const interval = setInterval(() => {
      const timeSinceLastInteraction = Date.now() - lastInteractionTimeRef.current;
      if (selectedImageIndex === null && timeSinceLastInteraction >= 6000) {
        handleAutoPlaySlide();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [mobileIndex, sliderItems, selectedImageIndex]);

  const handleLightboxTouchStart = (e: React.TouchEvent) => {
    lightboxTouchStartRef.current = e.targetTouches[0].clientX;
  };

  const handleLightboxTouchEnd = (e: React.TouchEvent) => {
    if (lightboxTouchStartRef.current === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = lightboxTouchStartRef.current - touchEnd;
    const swipeThreshold = 50;

    if (diff > swipeThreshold) {
      handleNext();
    } else if (diff < -swipeThreshold) {
      handlePrev();
    }
    lightboxTouchStartRef.current = null;
  };

  useGSAP(() => {
    const isLargeScreen = window.innerWidth >= 1024;

    if (isLargeScreen) {
      if (activeCategory === 'Featured') {
        // Animate text panel
        const textLeft = sectionRef.current?.querySelector('.featured-text-left');
        if (textLeft) {
          gsap.from(textLeft, {
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse'
            },
            opacity: 0,
            x: -50,
            duration: 1.2,
            ease: 'power3.out'
          });
        }
        
        const polaroids = gsap.utils.toArray('.polaroid-item');
        if (polaroids.length > 0) {
          // Desktop wind effect: polaroids fly in from top-right and settle
          polaroids.forEach((item: any, idx) => {
            const windX = 200 + Math.random() * 250;
            const windY = -150 - Math.random() * 200;
            const windRotation = -45 + Math.random() * 90;

            gsap.from(item, {
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 70%',
                toggleActions: 'play none none reverse'
              },
              opacity: 0,
              x: windX,
              y: windY,
              rotation: windRotation,
              duration: 1.6,
              delay: idx * 0.1,
              ease: 'power3.out'
            });
          });
        }

        // Stamps stamp effect
        const stampItems = sectionRef.current?.querySelectorAll('.stamp-item');
        if (stampItems && stampItems.length > 0) {
          gsap.from(stampItems, {
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 65%',
              toggleActions: 'play none none reverse'
            },
            opacity: 0,
            scale: 0.3,
            rotation: -60,
            duration: 0.8,
            stagger: 0.1,
            ease: 'back.out(1.5)',
            delay: 0.6
          });
        }
      }
    } else {
      // Mobile layout animations (runs for ALL categories)
      const mobileActive = sectionRef.current?.querySelector('.mobile-polaroid-active');
      if (mobileActive) {
        const activePhoto = sliderItems[mobileIndex];
        const targetRotation = activePhoto ? activePhoto.rotation * 0.8 : 2;

        if (!hasTriggeredEntranceRef.current) {
          gsap.fromTo(mobileActive, 
            {
              opacity: 0,
              x: 250,
              y: -150,
              rotation: 45
            },
            {
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 90%',
                toggleActions: 'play none none none',
                onEnter: () => {
                  hasTriggeredEntranceRef.current = true;
                }
              },
              opacity: 1,
              x: 0,
              y: 0,
              rotation: targetRotation,
              duration: 1.2,
              ease: 'back.out(1.2)',
              onStart: () => {
                hasTriggeredEntranceRef.current = true;
              }
            }
          );

          // Animate stamp of the first render slide
          const mobileStamps = sectionRef.current?.querySelectorAll('.mobile-stamp-active');
          if (mobileStamps && mobileStamps.length > 0) {
            gsap.fromTo(mobileStamps,
              {
                opacity: 0,
                scale: 0.2,
                rotation: -45
              },
              {
                scrollTrigger: {
                  trigger: sectionRef.current,
                  start: 'top 90%',
                  toggleActions: 'play none none none'
                },
                opacity: 1,
                scale: 1,
                rotation: 0,
                duration: 0.6,
                delay: 0.4,
                ease: 'back.out(1.5)'
              }
            );
          }
        } else {
          // Slide transition: fly in from opposite side
          const enterX = slideDirection === 'next' ? 250 : -250;
          const enterY = -120;
          const enterRotation = slideDirection === 'next' ? 35 : -35;
          
          gsap.fromTo(mobileActive, 
            {
              x: enterX,
              y: enterY,
              rotation: enterRotation,
              opacity: 0
            },
            {
              x: 0,
              y: 0,
              rotation: targetRotation,
              opacity: 1,
              duration: 0.85,
              ease: 'power3.out',
              onComplete: () => {
                isAnimatingRef.current = false;
              }
            }
          );
          
          // Animate stamp of the new slide
          const mobileStamps = sectionRef.current?.querySelectorAll('.mobile-stamp-active');
          if (mobileStamps && mobileStamps.length > 0) {
            gsap.fromTo(mobileStamps,
              {
                opacity: 0,
                scale: 0.2,
                rotation: -45
              },
              {
                opacity: 1,
                scale: 1,
                rotation: 0,
                duration: 0.6,
                delay: 0.3,
                ease: 'back.out(1.5)'
              }
            );
          }
        }
      }
    }
  }, { scope: sectionRef, dependencies: [mobileIndex, activeCategory, slideDirection] });



  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedImageIndex !== null) {
      setLightboxDirection('next');
      setSelectedImageIndex((selectedImageIndex + 1) % visiblePhotos.length);
    }
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedImageIndex !== null) {
      setLightboxDirection('prev');
      setSelectedImageIndex((selectedImageIndex - 1 + visiblePhotos.length) % visiblePhotos.length);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (e.key === 'Escape') setSelectedImageIndex(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, visiblePhotos.length]);

  return (
    <section 
      id="photography" 
      ref={sectionRef} 
      className="relative px-6 py-16 md:px-16 md:py-24 overflow-hidden select-none"
      style={{ 
        backgroundColor: '#f5efe6',
        backgroundImage: `url("${paperGrainUrl}")`,
      }}
    >
      <PalmShadow />

      {/* Grid line notebook sketch (decorative background element) */}
      <div 
        className="absolute top-[8%] left-[45%] w-[120px] h-[120px] opacity-[0.08] pointer-events-none select-none z-0 hidden lg:block"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.15) 1px, transparent 1px)',
          backgroundSize: '15px 15px'
        }}
      />

      {/* Main Container */}
      <div className="max-w-[1440px] mx-auto relative z-10">
        
        {/* DESKTOP LAYOUT (Hidden on mobile) */}
        <div className="hidden lg:block">
          {/* Gallery View Header (only shown when not on featured collage) */}
          {activeCategory !== 'Featured' && (
            <div className="gallery-title flex items-center justify-between mb-12">
              <div>
                <span className="text-[0.62rem] font-light tracking-[0.28em] uppercase text-accent mb-2 block">
                  03. Photography
                </span>
                <h2 className="font-serif text-3xl font-light text-dark capitalize">
                  {activeCategory === 'All' ? 'Todas las Fotos' : activeCategory}
                </h2>
              </div>
              
              <button 
                onClick={() => {
                  setActiveCategory('Featured');
                  document.getElementById('photography')?.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                  });
                }}
                className="text-dark/50 hover:text-dark transition-colors p-2.5 rounded-full border border-dark/10 bg-white/40 backdrop-blur-sm shadow-sm flex items-center justify-center cursor-pointer"
                aria-label="Volver a destacadas"
              >
                <X size={20} />
              </button>
            </div>
          )}

            {activeCategory === 'Featured' ? (
              /* COLLAGE VIEW (Desktop Only) */
              <div 
                key="featured"
                className="w-full aspect-[1.65/1] relative overflow-visible"
              >
                {/* Left Typography Column */}
                <div className="featured-text-left absolute top-[8%] left-[2%] w-[25%] flex flex-col z-10">
                  <div className="flex items-center gap-2 mb-6">
                    <span className="text-[0.65rem] font-bold tracking-[0.25em] text-dark/35 uppercase">PORTAFOLIO</span>
                    <svg className="w-3.5 h-3.5 text-dark/30 transform rotate-[45deg]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L14 19v-5.5l7 2.5z"/>
                    </svg>
                  </div>
                  
                  <h2 className="font-serif text-[clamp(2.5rem,3.8vw,3.5rem)] font-light leading-[1.08] text-dark/85">
                    Historias que<br />
                    merecen ser<br />
                    <span className="italic text-[#5c6f50]" style={{ fontFamily: "Georgia, serif" }}>recordadas</span>
                  </h2>

                  <p className="mt-6 text-[0.82rem] font-light leading-[1.7] text-dark/55 font-sans max-w-[27ch]">
                    Cada imagen guarda un momento único, una emoción sincera, una historia que vale la pena revivir.
                  </p>
                  
                  {/* Handwritten script note */}
                  <div className="mt-12 transform -rotate-[6deg] origin-left select-none">
                    <p className="text-[#8c7853] text-[1.4rem] font-medium" style={{ fontFamily: "'Caveat', cursive" }}>
                      viajar es coleccionar recuerdos ♡
                    </p>
                  </div>
                  
                  {/* Colecciona momentos circular stamp */}
                  <div className="stamp-item mt-6 relative w-20 h-20 rounded-full border border-dashed border-[#8c7853]/45 flex items-center justify-center transform rotate-[10deg] opacity-75 hover:opacity-100 transition-opacity">
                    <div className="absolute inset-1 rounded-full border border-[#8c7853]/25 flex items-center justify-center">
                      <span className="text-[0.5rem] font-bold tracking-[0.15em] text-[#8c7853] text-center select-none leading-tight">
                        COLECCIONA<br/>MOMENTOS
                      </span>
                    </div>
                    <svg className="w-3.5 h-3.5 text-[#8c7853]/55 absolute" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L14 19v-5.5l7 2.5z"/>
                    </svg>
                  </div>
                </div>

                {/* Decorative Elements (Stamps & Notes) */}
                
                {/* Tulum note (Top Left Polaroid 1) */}
                <div 
                  className="stamp-item absolute top-[4.5%] left-[45%] bg-[#faf9f6] px-3.5 py-1.5 shadow-[2px_5px_12px_rgba(0,0,0,0.05)] border border-black/[0.02] flex items-center gap-1.5 z-10"
                  style={{ transform: 'rotate(3deg)' }}
                >
                  <svg className="w-3.5 h-3.5 text-[#e02020]/80 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  <div className="flex flex-col">
                    <span className="text-[0.7rem] font-bold text-dark/75 leading-tight">playa paraíso</span>
                    <span className="text-[0.5rem] font-mono text-dark/40 tracking-wider uppercase leading-none">TULUM, MX</span>
                  </div>
                </div>

                {/* Explorar note (Middle Polaroid 3) */}
                <div 
                  className="stamp-item absolute top-[44%] left-[29%] bg-[#faf9f6] px-3 py-1.5 shadow-[2px_4px_10px_rgba(0,0,0,0.04)] border border-black/[0.01] flex flex-col z-10"
                  style={{ transform: 'rotate(-6deg)' }}
                >
                  <span className="text-[0.65rem] font-mono tracking-widest text-[#8c7853] uppercase leading-tight">explorar</span>
                  <span className="text-[0.52rem] font-mono tracking-widest text-dark/40 uppercase leading-none">descubrir</span>
                  <span className="text-[0.52rem] font-mono tracking-widest text-dark/40 uppercase leading-none mt-0.5">vivir</span>
                </div>

                {/* Stamp Aventura Sin Limites (Top Right) */}
                <div 
                  className="stamp-item absolute top-[8%] right-[8%] w-20 h-20 rounded-full border border-double border-[#5c6f50]/40 bg-[#5c6f50]/5 p-2 flex items-center justify-center transform rotate-[-8deg] opacity-75 hover:opacity-100 transition-opacity z-10"
                >
                  <div className="absolute inset-0 rounded-full border border-[#5c6f50]/20 flex items-center justify-center">
                    <span className="text-[0.45rem] font-bold tracking-[0.25em] text-[#5c6f50] text-center uppercase">
                      AVENTURAS<br />SIN LÍMITES
                    </span>
                  </div>
                  <svg className="w-5 h-5 text-[#5c6f50]/50 absolute" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" d="M12,20 L12,12 M12,13 Q16,9 18,12 M12,13 Q8,9 6,12 M12,15 Q17,13 19,17 M12,15 Q7,13 5,17 M12,12 Q14,7 12,3" />
                  </svg>
                </div>

                {/* Postal stamp (Thailand, Right middle) */}
                <div 
                  className="stamp-item absolute top-[30%] right-[0.5%] bg-[#faf9f6] border border-[#dcd9d0] border-r-4 p-2 shadow-[2px_4px_12px_rgba(0,0,0,0.05)] w-[110px] h-[70px] flex flex-col justify-between z-10"
                  style={{ 
                    transform: 'rotate(-4deg)',
                    backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.01) 10px, rgba(0,0,0,0.01) 20px)'
                  }}
                >
                  <div className="flex justify-between items-start">
                    <span className="text-[0.4rem] font-mono tracking-widest text-dark/30 uppercase">BETONG THAI</span>
                    <span className="text-[0.55rem] font-bold text-dark/40">01</span>
                  </div>
                  <div className="flex justify-center my-0.5">
                    <svg className="w-4 h-4 text-dark/20 transform rotate-[90deg]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L14 19v-5.5l7 2.5z"/>
                    </svg>
                  </div>
                  <div className="border-t border-dark/10 pt-0.5 flex justify-between items-center text-[0.38rem] font-mono text-dark/30 tracking-widest uppercase">
                    <span>THAILAND</span>
                  </div>
                  {/* Wavy lines overlay */}
                  <div className="absolute inset-0 pointer-events-none opacity-20 flex flex-col justify-center gap-1 overflow-hidden">
                    {[1, 2, 3].map((_, i) => (
                      <div key={i} className="h-[1px] bg-dark w-[150%] transform -rotate-[15deg] -translate-x-[10%]" />
                    ))}
                  </div>
                </div>

                {/* Nuevos Horizontes tag (Bottom-Middle-Right) */}
                <div 
                  className="stamp-item absolute bottom-[8%] left-[65%] bg-[#faf9f6] px-3.5 py-2 shadow-[2px_6px_12px_rgba(0,0,0,0.05)] border border-black/[0.01] flex items-center gap-2 z-10"
                  style={{ transform: 'rotate(2deg)' }}
                >
                  <svg className="w-3.5 h-3.5 text-dark/40" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    <path d="M2 12h20" />
                  </svg>
                  <div className="flex flex-col">
                    <span className="text-[0.65rem] font-mono tracking-widest text-dark/65 uppercase leading-none">nuevos horizontes</span>
                    <span className="text-[0.5rem] font-mono text-dark/40 tracking-wider uppercase leading-none mt-0.5">nuevas historias</span>
                  </div>
                </div>

                {/* Green travel ticket (Bottom-Left Polaroid 5) */}
                <div 
                  className="stamp-item absolute bottom-[10%] left-[8%] bg-[#6e775a] text-[#f5efe6] px-5 py-4 w-[230px] shadow-[4px_8px_20px_rgba(0,0,0,0.12)] flex flex-col font-sans z-10"
                  style={{ transform: 'rotate(-2deg)' }}
                >
                  <div className="border-b border-dashed border-[#f5efe6]/30 pb-2.5 mb-2.5 flex justify-between items-center">
                    <div className="flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-[#f5efe6]/75" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                        <path d="M2 12h20" />
                      </svg>
                      <span className="text-[0.6rem] font-bold tracking-[0.2em] uppercase text-[#f5efe6]/85">VIAJES QUE INSPIRAN</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    <div className="flex gap-[2px] h-5 items-end bg-[#f5efe6]/90 p-0.5 rounded-sm opacity-95 mb-1.5">
                      {[1, 3, 2, 4, 1, 5, 2, 3, 1, 2, 4, 1, 3, 1, 4, 2].map((w, idx) => (
                        <div key={idx} className="bg-[#6e775a] h-full" style={{ width: `${w}px` }} />
                      ))}
                    </div>
                    <span className="text-[0.6rem] font-mono tracking-widest text-[#f5efe6]/60">24.0522° N, 118.2437° W</span>
                  </div>
                </div>

                {/* 7 Absolute Polaroids */}
                {featuredPhotos.map((photo, i) => (
                  <div 
                    key={i}
                    className="polaroid-item absolute bg-white p-3 pb-8 shadow-[0_12px_28px_rgba(0,0,0,0.1)] border border-black/[0.03] transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.18)] hover:-translate-y-3 hover:scale-[1.02] hover:z-20 cursor-pointer"
                    style={{ 
                      top: photo.top,
                      bottom: photo.bottom,
                      left: photo.left,
                      right: photo.right,
                      width: photo.width,
                      transform: `rotate(${photo.rotation}deg)`
                    }}
                    onClick={() => setSelectedImageIndex(i)}
                  >
                    {/* Washi Tape */}
                    <div 
                      className="absolute left-1/2 -translate-x-1/2 bg-[#e6ddc2]/90 backdrop-blur-[1px] border border-black/[0.06] shadow-[0_2px_4px_rgba(0,0,0,0.06)] z-10"
                      style={{
                        height: '32px',
                        clipPath: 'polygon(5% 0%, 95% 0%, 100% 25%, 98% 75%, 100% 100%, 0% 100%, 2% 50%)',
                        ...photo.tapeStyle
                      }}
                    />
                    
                    {/* Photo Container */}
                    <div className="w-full aspect-[4/5] bg-dark/5 overflow-hidden relative">
                      <img 
                        src={photo.src} 
                        alt={photo.title} 
                        className="w-full h-full object-cover block filter brightness-[0.98] contrast-[1.01]"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/5 opacity-0 hover:opacity-100 transition-opacity" />
                    </div>

                    {/* Handwriting style label */}
                    <p 
                      className="text-center mt-3 text-dark/70 text-[1.1rem] leading-none select-none font-medium"
                      style={{ fontFamily: "'Caveat', cursive" }}
                    >
                      {photo.title}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              /* CLASSIC MASONRY GALLERY VIEW (Desktop Only) */
              <div key="gallery" className="pt-2">
                <div className="photo-grid columns-2 md:columns-3 lg:columns-4 gap-5 space-y-5">
                  {visiblePhotos.map((photo, idx) => (
                    <div 
                      key={idx} 
                      className="photo-card relative aspect-auto break-inside-avoid mb-5 overflow-hidden group bg-white p-2.5 pb-6 shadow-[0_4px_16px_rgba(0,0,0,0.04)] border border-black/[0.02] hover:shadow-[0_12px_28px_rgba(0,0,0,0.1)] transition-all duration-300 cursor-pointer rounded-sm"
                      onClick={() => setSelectedImageIndex(idx)}
                    >
                      <div className="w-full overflow-hidden bg-dark/5 aspect-auto">
                        <img 
                          src={photo} 
                          alt={`Photo ${idx + 1}`} 
                          className="w-full h-full object-cover block transition-transform duration-700 ease-in-out group-hover:scale-[1.03]"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
        </div>

        {/* MOBILE / TABLET VIEW (Scrapbook Collage Layout) */}
        <div className="lg:hidden w-full flex flex-col items-center gap-2 px-0 overflow-visible relative">
          
          {/* Collage Scrapbook Container */}
          <div className="relative w-full max-w-[420px] h-[980px] mx-auto overflow-visible select-none mt-2">
            
            {/* Left Title Block (positioned next to Santorini photo) */}
            <div className="absolute top-0 left-4 w-[60%] flex flex-col z-10 text-left">
              <div className="flex items-center gap-1.5 mb-2">
                <span className="text-[0.62rem] font-bold tracking-[0.2em] text-[#8c7853] uppercase">PORTAFOLIO</span>
                <span className="text-dark/40 transform rotate-[45deg] inline-block text-xs">✈</span>
              </div>
              
              <div className="transform -rotate-[3deg] origin-left mb-2 select-none">
                <p className="text-[#8c7853] text-[1.2rem] font-medium leading-none" style={{ fontFamily: "'Caveat', cursive" }}>
                  Recuerdos que se quedan ♡
                </p>
              </div>

              <h2 className="font-serif text-[1.7rem] font-light leading-[1.1] text-dark mb-3">
                Historias que<br />merecen ser<br />
                <span className="italic text-[#5c6f50]" style={{ fontFamily: "Georgia, serif" }}>recordadas</span>
              </h2>

              <p className="text-[0.72rem] font-light leading-[1.5] text-dark/60 font-sans max-w-[22ch] mb-4">
                Cada imagen guarda un momento único, una emoción sincera, una historia que vale la pena revivir.
              </p>

              <div>
                <button 
                  onClick={() => setSelectedImageIndex(mobileIndex)}
                  className="px-5 py-2 rounded-full border border-[#8c7853]/35 text-[#8c7853] text-[0.6rem] font-bold tracking-widest uppercase hover:bg-[#8c7853] hover:text-[#f5efe6] transition-all duration-300 cursor-pointer"
                >
                  VER GALERÍA →
                </button>
              </div>
            </div>

            {/* 6 Surrounding Small Polaroids (acting as Category Buttons) */}
            {MOBILE_CATEGORIES.map((cat, idx) => {
              const isActive = activeCategory === cat.category;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveCategory(cat.category)}
                  className={`absolute bg-white p-1.5 pb-4 shadow-[0_6px_16px_rgba(0,0,0,0.06)] border border-black/[0.02] cursor-pointer transition-all duration-300 ${
                    isActive ? 'ring-2 ring-[#e02020] ring-offset-2 scale-[1.05] z-30' : 'hover:scale-[1.03]'
                  }`}
                  style={{
                    ...cat.style,
                    transform: `rotate(${cat.rotation}deg)`
                  }}
                >
                  {/* Washi Tape */}
                  <div 
                    className="absolute left-1/2 -translate-x-1/2 bg-[#efebd8]/60 border border-black/[0.01]"
                    style={{
                      height: '14px',
                      clipPath: 'polygon(5% 0%, 95% 0%, 100% 25%, 98% 75%, 100% 100%, 0% 100%, 2% 50%)',
                      ...cat.tapeStyle
                    }}
                  />

                  {/* Photo */}
                  <div className="w-full aspect-[4/5] bg-dark/5 overflow-hidden">
                    <img 
                      src={cat.src} 
                      alt={cat.label} 
                      className="w-full h-full object-cover block"
                      loading="lazy"
                    />
                  </div>

                  {/* Label (handwritten) */}
                  <p 
                    className={`text-center mt-1 text-[0.72rem] leading-none select-none font-semibold ${
                      isActive ? 'text-[#e02020]' : 'text-dark/65'
                    }`}
                    style={{ fontFamily: "'Caveat', cursive" }}
                  >
                    {cat.label}
                  </p>
                </div>
              );
            })}

            {/* Center card (Active Section display) */}
            <div 
              className="mobile-polaroid-active absolute bg-white p-3 pb-8 shadow-[0_12px_28px_rgba(0,0,0,0.1)] border border-black/[0.03] z-20 cursor-pointer"
              style={{
                top: '28%',
                left: '14%',
                width: '72%',
                transform: 'rotate(2deg)'
              }}
              onClick={() => setSelectedImageIndex(mobileIndex)}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {/* Washi Tape */}
              <div 
                className="absolute left-1/2 -translate-x-1/2 bg-[#efebd8]/70 border border-black/[0.01] z-10"
                style={{
                  height: '24px',
                  top: '-12px',
                  width: '75px',
                  clipPath: 'polygon(5% 0%, 95% 0%, 100% 25%, 98% 75%, 100% 100%, 0% 100%, 2% 50%)',
                  transform: 'rotate(-2deg)'
                }}
              />

              {/* Photo Area */}
              <div className="w-full aspect-[4/5] bg-dark/5 overflow-hidden relative">
                {sliderItems.length > 0 && sliderItems[mobileIndex] && (
                  <img 
                    src={sliderItems[mobileIndex].src} 
                    alt={sliderItems[mobileIndex].title} 
                    className="w-full h-full object-cover block"
                    loading="lazy"
                  />
                )}
                
                {/* Swipe Indicators (subtle arrows on overlay) */}
                <div className="absolute inset-y-0 left-0 right-0 flex justify-between items-center px-1 pointer-events-none opacity-40">
                  <ChevronLeft size={16} className="text-white bg-black/20 rounded-full p-0.5" />
                  <ChevronRight size={16} className="text-white bg-black/20 rounded-full p-0.5" />
                </div>
              </div>

              {/* Label */}
              <p 
                className="text-center mt-3 text-dark/70 text-[1.1rem] leading-none select-none font-medium"
                style={{ fontFamily: "'Caveat', cursive" }}
              >
                {sliderItems.length > 0 && sliderItems[mobileIndex] ? sliderItems[mobileIndex].title : 'Cargando...'}
              </p>
            </div>

            {/* Decorative Stamps & Tickets in collage */}
            
            {/* Map pin label (Tulum note) right under Santorini card */}
            <div 
              className="absolute top-[16%] right-[4%] bg-[#faf9f6] px-2.5 py-1 shadow-md border border-black/[0.02] flex items-center gap-1 rotate-[3deg] z-30 font-sans pointer-events-none"
            >
              <svg className="w-3 h-3 text-[#e02020]/80 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              <div className="flex flex-col">
                <span className="text-[0.55rem] font-bold text-dark/75 leading-none">playa paraíso</span>
                <span className="text-[0.45rem] font-mono text-dark/40 tracking-wider uppercase leading-none mt-0.5">TULUM, MX</span>
              </div>
            </div>

            {/* Green travel ticket (Middle-Right / Bottom overlay) */}
            <div 
              className="absolute bottom-[2%] right-[4%] bg-[#6e775a] text-[#f5efe6] px-2.5 py-2.5 w-[130px] shadow-lg flex flex-col font-sans z-30 pointer-events-none"
              style={{ transform: 'rotate(3deg)' }}
            >
              <span className="text-[0.38rem] font-bold tracking-[0.15em] uppercase text-[#f5efe6]/85 border-b border-[#f5efe6]/20 pb-0.5 mb-1 text-center">VIAJES QUE INSPIRAN</span>
              <div className="flex gap-[1px] h-2.5 items-end bg-[#f5efe6]/90 p-[1px] rounded-sm opacity-90 mb-1">
                {[1, 3, 2, 4, 1, 3, 1, 2, 4, 1, 2].map((w, idx) => (
                  <div key={idx} className="bg-[#6e775a] h-full" style={{ width: `${w}px` }} />
                ))}
              </div>
              <span className="text-[0.38rem] font-mono tracking-widest text-[#f5efe6]/60 text-center">34.0522° N, 118.2437° W</span>
            </div>

            {/* Circular stamp circular (Aventuras sin limites, top-right of center card) */}
            <div 
              className="absolute top-[21.5%] right-[1%] w-[58px] h-[58px] rounded-full border border-dashed border-[#5c6f50]/40 bg-[#5c6f50]/5 p-1 flex items-center justify-center transform rotate-[-8deg] opacity-75 z-30 pointer-events-none"
            >
              <div className="absolute inset-0 rounded-full border border-[#5c6f50]/20 flex items-center justify-center">
                <span className="text-[0.32rem] font-bold tracking-[0.18em] text-[#5c6f50] text-center uppercase leading-none">
                  AVENTURAS<br />SIN LÍMITES
                </span>
              </div>
            </div>

            {/* Sello circular Colecciona Momentos (middle-left) */}
            <div 
              className="absolute top-[61%] left-[2%] w-[52px] h-[52px] rounded-full border border-dashed border-[#8c7853]/45 flex items-center justify-center transform rotate-[10deg] opacity-70 z-30 pointer-events-none"
            >
              <div className="absolute inset-0.5 rounded-full border border-[#8c7853]/25 flex items-center justify-center">
                <span className="text-[0.32rem] font-bold tracking-[0.1em] text-[#8c7853] text-center select-none leading-none">
                  COLECCIONA<br/>MOMENTOS
                </span>
              </div>
            </div>

            {/* Postal stamp Destinos que se viven (bottom-right above ticket) */}
            <div 
              className="absolute bottom-[23%] right-[0.5%] bg-[#faf9f6] border border-[#dcd9d0] border-r-2 p-1.5 shadow-md w-[80px] h-[52px] flex flex-col justify-between z-30 pointer-events-none"
              style={{ 
                transform: 'rotate(-4deg)',
                backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.01) 10px, rgba(0,0,0,0.01) 20px)'
              }}
            >
              <div className="flex justify-between items-start">
                <span className="text-[0.3rem] font-mono tracking-widest text-dark/30 uppercase">DESTINOS</span>
              </div>
              <div className="border-t border-dark/10 pt-0.5 flex justify-between items-center text-[0.28rem] font-mono text-dark/30 tracking-widest uppercase">
                <span>QUE SE VIVEN</span>
              </div>
            </div>

            {/* Nuevos Horizontes note (Bottom Left above event photo) */}
            <div 
              className="absolute bottom-[26%] left-[12%] bg-[#faf9f6] px-2 py-1 shadow-md border border-black/[0.01] flex items-center gap-1 z-30 pointer-events-none"
              style={{ transform: 'rotate(2deg)' }}
            >
              <span className="text-[0.45rem] font-mono tracking-widest text-dark/65 uppercase leading-none">nuevos horizontes</span>
            </div>

            {/* Left palm shadow leaf overlay */}
            <div className="absolute bottom-0 left-0 w-[180px] h-[180px] text-[#4a5538] pointer-events-none select-none opacity-[0.06] blur-[6px] z-30 overflow-hidden">
              <svg className="w-full h-full" viewBox="0 0 200 200" fill="currentColor">
                <path d="M 0,200 C 50,150 100,100 200,0 C 150,50 100,100 0,200 Z" />
                <path d="M 30,170 C 40,130 80,100 140,70 C 100,100 60,130 30,170 Z" />
                <path d="M 50,150 C 60,110 90,80 150,50 C 110,80 80,110 50,150 Z" />
              </svg>
            </div>

          </div>

          {/* Mobile Slider Controls */}
          <div className="flex flex-col items-center gap-4 mt-4 z-30">
            <div className="flex items-center gap-12">
              <button 
                onClick={() => handleMobileSlideChange('prev')}
                className="text-[#8c7853] hover:text-dark transition-colors p-3 rounded-full border border-[#8c7853]/25 bg-white/40 shadow-sm flex items-center justify-center cursor-pointer border-none"
                aria-label="Foto anterior"
              >
                <ChevronLeft size={20} />
              </button>
              
              <span className="text-xs font-mono text-dark/40 select-none">
                {mobileIndex + 1} / {sliderItems.length}
              </span>

              <button 
                onClick={() => handleMobileSlideChange('next')}
                className="text-[#8c7853] hover:text-dark transition-colors p-3 rounded-full border border-[#8c7853]/25 bg-white/40 shadow-sm flex items-center justify-center cursor-pointer border-none"
                aria-label="Siguiente foto"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

        </div>

        {/* BOTTOM NAVIGATION TABS (Desktop Only) */}
        <div className="mt-16 hidden lg:flex flex-col items-center gap-6 select-none border-t border-[#8c7853]/25 pt-10">
          <div className="flex flex-wrap justify-center gap-y-4 gap-x-8 md:gap-x-12">
            {['Featured', 'All', ...categories.map(c => c.title.toUpperCase())].map((tab) => {
              const isActive = activeCategory === tab;
              let label = tab;
              if (tab === 'Featured') label = 'DESTACADAS';
              else if (tab === 'All') label = 'TODOS';
              
              return (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveCategory(tab);
                    document.getElementById('photography')?.scrollIntoView({ 
                      behavior: 'smooth', 
                      block: 'start' 
                    });
                  }}
                  className="relative px-1.5 py-2 text-[0.68rem] font-bold tracking-[0.25em] uppercase transition-all duration-300 cursor-pointer"
                  style={{ 
                    color: isActive ? '#e02020' : '#1a1714',
                    opacity: isActive ? 1 : 0.55
                  }}
                >
                  {label}
                  {isActive && (
                    <motion.div 
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ scaleX: 1, opacity: 1 }}
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#e02020]"
                      style={{ originX: 0.5 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Social links (Footer of section) */}
      <div className="flex items-center justify-center gap-5 mt-20 pt-10 border-t border-[#8c7853]/20 max-w-[1440px] mx-auto z-10 relative">
        <span className="font-serif italic text-sm text-[#8c7853]">Seguime</span>
        {socialButtons.map(({ key, Icon, label, color }) => (
          <a
            key={key}
            href={SOCIAL_LINKS[key as keyof typeof SOCIAL_LINKS]}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-200 cursor-pointer"
            style={{ color, border: `1px solid ${color}33`, backgroundColor: 'rgba(255,255,255,0.2)' }}
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

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImageIndex(null)}
            onTouchStart={handleLightboxTouchStart}
            onTouchEnd={handleLightboxTouchEnd}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-10"
          >
            <button 
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-[110] cursor-pointer"
              onClick={() => setSelectedImageIndex(null)}
            >
              <X size={32} strokeWidth={1.5} />
            </button>

            <button 
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-[110] bg-black/20 p-2 rounded-full hidden md:block cursor-pointer border-none"
              onClick={handlePrev}
            >
              <ChevronLeft size={40} strokeWidth={1} />
            </button>

            <button 
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-[110] bg-black/20 p-2 rounded-full hidden md:block cursor-pointer border-none"
              onClick={handleNext}
            >
              <ChevronRight size={40} strokeWidth={1} />
            </button>

            <AnimatePresence mode="wait" initial={false} custom={lightboxDirection}>
              <motion.div 
                key={selectedImageIndex}
                custom={lightboxDirection}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.25 }
                }}
                className="relative max-w-full max-h-full flex flex-col items-center"
                onClick={(e) => e.stopPropagation()}
              >
                <img 
                  src={visiblePhotos[selectedImageIndex]} 
                  alt="Selected"
                  className="max-w-full max-h-[75vh] md:max-h-[82vh] object-contain shadow-2xl rounded-sm"
                />
                
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-center mt-5 text-white/90"
                >
                  <span className="font-serif italic text-lg block mb-1">
                    {activeCategory === 'Featured' ? featuredPhotos[selectedImageIndex].title : activeCategory}
                  </span>
                  <span className="text-[0.65rem] uppercase tracking-[0.2em] text-white/50">
                    {selectedImageIndex + 1} / {visiblePhotos.length}
                  </span>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PhotographySection;