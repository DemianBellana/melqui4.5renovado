import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Reels', href: '#reels' },
    { name: 'Video Work', href: '#video-work' },
    { name: 'Fotografía', href: '#photography' },
    { name: 'Sobre Mí', href: '#about' },
    { name: 'Contacto', href: '#contact' },
  ];

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 md:px-16 py-6 bg-[rgba(250,248,244,0.92)] backdrop-blur-md border-b border-[rgba(160,140,120,0.12)] transition-all duration-300 ${
          isScrolled ? 'shadow-[0_2px_30px_rgba(20,17,14,0.08)]' : 'shadow-none'
        }`}
      >
        <a href="#" className="font-serif text-[1.15rem] font-normal tracking-[0.12em] text-[#161616] uppercase no-underline">
          Melisa Quiroga
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-10 list-none m-0 p-0">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a 
                href={link.href} 
                className="text-[0.72rem] font-light tracking-[0.18em] uppercase text-[#666] no-underline transition-colors duration-200 hover:text-[#161616]"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-[#161616] p-1"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[90] bg-[rgba(250,248,244,0.98)] backdrop-blur-lg flex flex-col items-center justify-center md:hidden"
          >
            <ul className="flex flex-col items-center gap-8 list-none m-0 p-0">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-[1.2rem] font-light tracking-[0.2em] uppercase text-[#161616] no-underline"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
