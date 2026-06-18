import { useState, useRef } from 'react';
import iphoneImg from '../assets/iphone.png';

const ReelsSection = () => {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <section id="reels" className="grid grid-cols-1 lg:grid-cols-2 min-h-[90vh] bg-warm-white overflow-hidden">
      <div className="flex flex-col justify-center px-6 py-14 lg:px-20 lg:py-24 bg-cream order-2 lg:order-1 relative z-10">
        <span className="text-[0.62rem] font-light tracking-[0.28em] uppercase text-accent mb-6">
          01. Edición de Reels
        </span>
        <h2 className="font-serif text-[clamp(2rem,3.5vw,3.2rem)] font-light leading-[1.18] text-dark mb-6">
          Contenido que<br /><em className="italic text-accent">atrapa en segundos</em>
        </h2>
        <p className="text-[0.88rem] font-light leading-[1.85] text-mid max-w-[42ch] mb-9">
          Edición dinámica pensada para el formato vertical. Transiciones fluidas, ritmo visual y storytelling condensado para maximizar el engagement en plataformas como Instagram y TikTok.
        </p>
        <p className="text-[0.88rem] font-light leading-[1.85] text-mid max-w-[42ch] mb-9">
          Esta pieza recopila mis mejores trabajos, demostrando mi capacidad para captar la atención y contar historias potentes en formatos breves.
        </p>

        <div className="mt-6 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full border border-accent/30 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          </div>
          <span className="text-[0.7rem] uppercase tracking-widest text-accent font-medium">
            Formato Vertical 9:16
          </span>
        </div>
      </div>

      <div className="relative bg-dark order-1 lg:order-2 flex items-center justify-center py-20 lg:py-0 overflow-hidden min-h-[700px]">
        {/* Background decorative glow */}
        <div className="absolute w-[500px] h-[500px] bg-accent/10 blur-[150px] rounded-full z-0" />

        <div className="relative w-[300px] md:w-[340px] aspect-[9/16] z-10 drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden rounded-[2rem] border border-white/10" style={{ isolation: 'isolate' }}>
          {/* Video de fondo */}
          <video
            ref={videoRef}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/assets/video/reels/reel_principal.mov" type="video/mp4" />
            Your browser does not support the video tag.
          </video>


          {/* Interfaz estilo Instagram Reel Overlays */}
          <div className="absolute inset-0 z-30 flex flex-col justify-between p-6 text-white pointer-events-none">
            {/* Top Icons */}
            <div className="flex justify-between items-start mt-4">
              <button 
                onClick={toggleMute}
                className="bg-black/25 backdrop-blur-md rounded-full p-2 border border-white/10 pointer-events-auto hover:bg-black/40 transition-colors"
              >
                {isMuted ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"></path><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
                )}
              </button>
            </div>

            {/* Sidebar Interaction Icons */}
            <div className="flex flex-col items-end gap-5 mb-10">
              <div className="flex flex-col items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-lg"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                <span className="text-[11px] font-medium drop-shadow-xl">98.5k</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-lg"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-14c.9 0 1.8.2 2.6.6L21 3l-1.4 5.5L21 11.5z"></path></svg>
                <span className="text-[11px] font-medium drop-shadow-xl">4.2k</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-lg"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                <span className="text-[11px] font-medium drop-shadow-xl">Share</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReelsSection;
