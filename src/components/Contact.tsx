import React from 'react';
import horizontalImg from '../assets/Horizontal.jpg';

const Contact = () => {
  return (
    <section id="contact" className="bg-warm-white px-6 py-16 md:px-16 md:py-28">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <div>
          <span className="text-[0.62rem] font-light tracking-[0.28em] uppercase text-accent mb-6">
            Contacto
          </span>
          <h2 className="font-serif text-[clamp(2rem,3.5vw,3.2rem)] font-light leading-[1.18] text-dark mt-4 mb-4">
            ¿Hablamos sobre<br /><em className="italic">tu próximo proyecto?</em>
          </h2>
          <p className="text-[0.88rem] font-light leading-[1.85] text-mid max-w-[42ch] mb-10">
            Cuéntame tu idea y buscaremos la mejor forma de llevarla a cabo. Respondo en menos de 24 horas.
          </p>

          <div className="flex flex-col gap-6 mt-10">
            <div className="text-[0.82rem] font-light text-mid tracking-[0.05em]">
              <strong className="text-dark font-normal block mb-1 text-[0.68rem] tracking-[0.18em] uppercase">
                Email
              </strong>
              <a href="mailto:melisaquiroga@gmail.com" className="hover:text-accent transition-colors">melisaquiroga@gmail.com</a>
            </div>
            <div className="text-[0.82rem] font-light text-mid tracking-[0.05em]">
              <strong className="text-dark font-normal block mb-1 text-[0.68rem] tracking-[0.18em] uppercase">
                WhatsApp
              </strong>
              <a href="https://wa.me/yournumber" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">+54 9 11 XXXX-XXXX</a>
            </div>
          </div>

          {/* Botones redes sociales */}
          <div className="flex flex-wrap gap-3 mt-10">
            {[
              {
                href: 'https://instagram.com/melisaquiroga',
                label: 'Instagram',
                icon: (
                  <svg className="w-3.5 h-3.5 flex-shrink-0 relative z-10 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-rotate-[8deg] group-hover:scale-125" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <rect x="2" y="2" width="20" height="20" rx="5.5"/>
                    <circle cx="12" cy="12" r="4.5"/>
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                  </svg>
                ),
              },
              {
                href: 'https://tiktok.com/@melisaquiroga',
                label: 'TikTok',
                icon: (
                  <svg className="w-3.5 h-3.5 flex-shrink-0 relative z-10 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-rotate-[8deg] group-hover:scale-125" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.93a8.2 8.2 0 0 0 4.78 1.52V7a4.85 4.85 0 0 1-1.01-.31z"/>
                  </svg>
                ),
              },
              {
                href: 'https://facebook.com/melisaquiroga',
                label: 'Facebook',
                icon: (
                  <svg className="w-3.5 h-3.5 flex-shrink-0 relative z-10 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-rotate-[8deg] group-hover:scale-125" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.32l-.53 3.49h-2.79V24C19.61 23.1 24 18.1 24 12.07z"/>
                  </svg>
                ),
              },
            ].map(({ href, label, icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                className={`group relative flex items-center gap-2.5 px-6 py-3 border overflow-hidden rounded-full
                  text-[0.65rem] font-light tracking-[0.22em] uppercase transition-all duration-300
                  shadow-[0_4px_15px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_25px_rgba(0,0,0,0.15)]
                  ${label === 'Instagram' ? 'max-md:text-cream max-md:border-transparent max-md:shadow-[0_10px_25px_rgba(225,48,108,0.3)]' : ''}
                  ${label === 'TikTok' ? 'max-md:text-cream max-md:border-transparent max-md:shadow-[0_10px_25px_rgba(225,48,108,0.3)]' : ''}
                  ${label === 'Facebook' ? 'max-md:text-cream max-md:border-transparent max-md:shadow-[0_10px_25px_rgba(24,119,242,0.3)]' : ''}
                  md:border-[rgba(90,82,72,0.25)] md:bg-white/60 md:text-mid md:hover:text-cream md:hover:border-transparent`}
              >
                {/* wipe fill */}
                <span className={`absolute inset-0 transition-transform duration-[380ms] ease-[cubic-bezier(0.76,0,0.24,1)] rounded-full
                  max-md:translate-y-0 md:translate-y-full md:group-hover:translate-y-0
                  ${label === 'Instagram' ? 'bg-gradient-to-br from-[#f09433] via-[#dc2743] to-[#bc1888]' : ''}
                  ${label === 'TikTok' ? 'bg-[#010101]' : ''}
                  ${label === 'Facebook' ? 'bg-[#1877f2]' : ''}
                `} />
                
                {/* Icon wrapper to handle mobile active state */}
                <div className="relative z-10 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] 
                  max-md:-rotate-[8deg] max-md:scale-125 md:group-hover:-rotate-[8deg] md:group-hover:scale-125">
                  {icon}
                </div>

                <span className="relative z-10">{label}</span>
                <span className="relative z-10 text-[0.7rem] opacity-0 -translate-x-1 translate-y-1 
                  max-md:opacity-100 max-md:translate-x-0 max-md:translate-y-0
                  md:group-hover:opacity-100 md:group-hover:translate-x-0 md:group-hover:translate-y-0 transition-all duration-300 delay-75">↗</span>
              </a>
            ))}
          </div>
        </div>

        <div className="w-full overflow-hidden border border-[rgba(160,140,120,0.15)] shadow-[0_20px_40px_rgba(0,0,0,0.05)]">
          <img 
            src={horizontalImg} 
            alt="Work Environment" 
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
        </div>
      </div>
    </section>
  );
};

export default Contact;
