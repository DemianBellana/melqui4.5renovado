import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Hero = () => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Animación de letras para el primer renglón (entra desde izquierda)
    gsap.from('.char-left', {
      x: -100,
      rotationY: 90,
      rotationZ: -20,
      opacity: 0,
      duration: 1,
      stagger: 0.03,
      ease: 'power3.out',
      delay: 0.5
    });
    
    // Animación de letras para el segundo renglón (entra desde derecha)
    gsap.from('.char-right', {
      x: 100,
      rotationY: -90,
      rotationZ: 20,
      opacity: 0,
      duration: 1,
      stagger: 0.03,
      ease: 'power3.out',
      delay: 0.5
    });

    gsap.from('.hero-subtitle', {
      y: 20,
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
      delay: 0.3
    });

    gsap.from('.hero-desc', {
      y: 20,
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
      delay: 1.5
    });

    gsap.from('.hero-cta', {
      scale: 0.9,
      opacity: 0,
      duration: 0.8,
      ease: 'back.out(1.7)',
      delay: 1.8
    });
  }, { scope: container });

  const renderLetters = (text: string, className: string) => {
    return text.split('').map((char, i) => (
      <span key={i} className={`${className} inline-block whitespace-pre`}>
        {char}
      </span>
    ));
  };

  return (
    <section id="inicio" ref={container} className="h-screen relative flex items-center justify-center overflow-hidden">
      {/* Video Background - Reel Corto Automático */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/herovideo2.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Overlay elegante */}
      <div className="absolute inset-0 bg-black/20 z-10" />

      <div className="relative z-20 text-center text-white px-4 perspective-1000">
        <p className="hero-subtitle font-sans text-[0.68rem] font-light tracking-[0.28em] uppercase text-[rgba(255,255,255,0.75)] mb-6">
          Melisa Quiroga
        </p>
        <h1 className="font-serif text-[clamp(3rem,7vw,6.5rem)] font-light italic leading-[1.08] mb-6 overflow-hidden">
          <div className="flex justify-center flex-wrap">
            {renderLetters("Video Editor &", "char-left")}
          </div>
          <div className="flex justify-center flex-wrap">
            {renderLetters("Content Creator", "char-right")}
          </div>
        </h1>
        <p className="hero-desc font-sans text-[0.75rem] font-extralight tracking-[0.22em] uppercase text-[rgba(255,255,255,0.7)] mb-11">
          Dinámica · Creatividad · Historias que impactan
        </p>
        <a 
          href="#reels" 
          className="hero-cta inline-block text-[0.68rem] font-light tracking-[0.2em] uppercase text-white border border-[rgba(255,255,255,0.55)] px-10 py-4 no-underline transition-all duration-300 hover:bg-[rgba(255,255,255,0.12)] hover:border-[rgba(255,255,255,0.8)]"
        >
          Ver Portfolio
        </a>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 opacity-0 animate-[fadeUp_1s_ease-out_2s_forwards]">
        <span className="text-[0.6rem] tracking-[0.2em] uppercase text-[rgba(255,255,255,0.55)]">
          Scroll
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-[rgba(255,255,255,0.5)] to-transparent animate-scrollDown" />
      </div>
    </section>
  );
};


export default Hero;
