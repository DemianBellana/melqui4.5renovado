import horizontalImg from '../assets/Horizontal.jpg';
import aboutmeImg from '../assets/aboutme.avif';

const Contact = () => {
  return (
    <section id="contact" className="relative px-6 py-20 lg:px-16 lg:py-32 overflow-hidden min-h-screen flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        {/* Mobile Background */}
        <img
          src={aboutmeImg}
          alt="Contact Background Mobile"
          className="w-full h-full object-cover block lg:hidden"
        />
        {/* Desktop Background */}
        <img
          src={horizontalImg}
          alt="Contact Background Desktop"
          className="w-full h-full object-cover hidden lg:block"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 max-w-[800px] mx-auto text-center w-full flex flex-col items-center justify-center">
        <div className="text-white flex flex-col items-center">
          <span className="text-[0.95rem] font-light tracking-[0.28em] uppercase text-white/70 mb-6 block">
            Contacto
          </span>
          <h2 className="font-serif text-[clamp(2.5rem,4vw,3.8rem)] font-light leading-[1.12] text-white mt-4 mb-6 text-center">
            ¿Hablamos sobre<br /><em className="italic text-[#D8B7B0]">tu próximo proyecto?</em>
          </h2>
          <p className="text-[1rem] font-light leading-[1.8] text-white/80 max-w-[42ch] mb-10 text-center">
            Cada marca tiene una historia única. Contame la tuya y creemos fotografías y videos que conecten, inspiren y dejen una impresión inolvidable. Respondo en menos de 24 horas.
          </p>

          <div className="flex flex-col gap-8 justify-center items-center mt-6">
            <a
              href="https://wa.me/5491166898081"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden flex items-center gap-3
                         bg-[#ff4d6d] border border-[#ff4d6d] rounded-full
                         px-8 py-3.5
                         font-sans text-[10px] tracking-[0.22em] uppercase text-white
                         transition-all duration-400 ease-out
                         hover:bg-[#e03d5a] hover:border-[#e03d5a]
                         cursor-pointer shadow-lg"
            >
              {/* fill on hover */}
              <span
                className="absolute inset-0 rounded-full bg-white/5
                           -translate-x-full transition-transform duration-500
                           ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
                           group-hover:translate-x-0"
              />

              <span className="relative z-10">
                Contactame
              </span>

              {/* arrow */}
              <span className="relative z-10 flex items-center">
                <span
                  className="block h-px bg-white/60 transition-all duration-300 ease-out w-3.5 group-hover:w-5 group-hover:bg-white"
                />
                <span
                  className="block w-[5px] h-[5px] border-t border-r border-white/60 rotate-45 -ml-[3px]
                             transition-transform duration-300 group-hover:translate-x-[2px] group-hover:border-white"
                />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
