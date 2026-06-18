import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Hero = () => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from('.char-left', {
      x: -100, rotationY: 90, rotationZ: -20, opacity: 0,
      duration: 1, stagger: 0.03, ease: 'power3.out', delay: 0.5
    });
    gsap.from('.char-right', {
      x: 100, rotationY: -90, rotationZ: 20, opacity: 0,
      duration: 1, stagger: 0.03, ease: 'power3.out', delay: 0.5
    });
    gsap.from('.hero-subtitle', { y: 20, opacity: 0, duration: 1, ease: 'power2.out', delay: 0.3 });
    gsap.from('.hero-badge',    { y: 20, opacity: 0, scale: 0.9, duration: 1, ease: 'power2.out', delay: 1.2 });
    }, { scope: container });

    const renderLetters = (text: string, className: string) =>
    text.split('').map((char, i) => (
      <span key={i} className={`${className} inline-block whitespace-pre`}>{char}</span>
    ));

    return (
    <section id="inicio" ref={container} className="h-screen relative flex items-center justify-center overflow-hidden">
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0">
        <source src="/herovideo2.mp4" type="video/mp4" />
      </video>

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
        <div className="hero-badge inline-flex items-center gap-2 sm:gap-3 bg-[#D8B7B0] border border-white/20 rounded-full px-4 py-1.5 sm:px-5 sm:py-1.5 text-[#161616] text-[10px] sm:text-[11px] tracking-[0.05em] sm:tracking-[0.22em] uppercase shadow-lg whitespace-nowrap">Dinámica &amp; Creatividad Historias que impactan <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#7C8F7A] animate-pulse"></span></div>
      </div>

      {/* Scroll indicator — centrado */}
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