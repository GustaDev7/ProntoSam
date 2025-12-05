import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Calendar, Clock, MapPin, Instagram } from 'lucide-react';
import { Button } from './Button';
import { CONTACT_INFO } from '../constants';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Sobre Nós', href: '#about' },
    { name: 'Serviços', href: '#services' },
    { name: 'Depoimentos', href: '#testimonials' },
    { name: 'Contato', href: '#contact' },
  ];

  return (
    <header className="fixed w-full z-50 flex flex-col font-sans">
      {/* Top Bar - Info & Contact (Dark Blue) */}
      <div 
        className={`bg-secondary text-white transition-all duration-500 overflow-hidden ${
          isScrolled ? 'max-h-0 opacity-0' : 'max-h-12 py-2.5 opacity-100'
        } hidden md:block border-b border-white/10`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-sm font-medium tracking-wide">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-accent" />
              <span className="opacity-90 hover:opacity-100 transition-opacity">QS 107, Samambaia - DF</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-accent" />
              <span className="opacity-90 hover:opacity-100 transition-opacity">Seg - Sex: 07h às 16h30</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
             <div className="flex items-center gap-2">
               <Phone className="w-4 h-4 text-accent" />
               <span className="opacity-90 hover:opacity-100 transition-opacity">{CONTACT_INFO.phone}</span>
             </div>
             <div className="h-4 w-px bg-white/20"></div>
             <a 
               href={CONTACT_INFO.instagram} 
               target="_blank" 
               rel="noopener noreferrer" 
               className="hover:text-accent transition-colors flex items-center gap-2 group"
             >
               <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform" />
               <span>@clinicaprontosam</span>
             </a>
          </div>
        </div>
      </div>

      {/* Main Navbar (White) */}
      <nav className={`bg-white shadow-lg transition-all duration-300 relative ${isScrolled ? 'py-3' : 'py-5 lg:py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            
            {/* Logo Section */}
            <div className="flex-shrink-0">
              <a href="#" className="flex items-center gap-3 group">
                <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-accent flex items-center justify-center text-white font-bold text-2xl lg:text-3xl shadow-md group-hover:scale-105 transition-transform duration-300">
                  P
                </div>
                <div className="flex flex-col justify-center">
                  <span className="font-heading font-bold text-2xl lg:text-3xl text-secondary leading-none tracking-tight group-hover:text-primary transition-colors">
                    ProntoSam
                  </span>
                  <span className="text-[10px] lg:text-xs uppercase tracking-[0.2em] text-gray-500 font-semibold mt-1 ml-0.5">
                    Clínica Médica
                  </span>
                </div>
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-600 hover:text-primary font-medium text-base transition-colors relative py-2 after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-primary after:left-0 after:bottom-0 hover:after:w-full after:transition-all after:duration-300"
                >
                  {link.name}
                </a>
              ))}
              <div className="pl-4 border-l border-gray-100">
                <a href={CONTACT_INFO.whatsapp} target="_blank" rel="noopener noreferrer">
                  <Button 
                    variant="primary" 
                    size="md" 
                    className="gap-2 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all"
                  >
                    <Calendar className="w-4 h-4" />
                    Agendar
                  </Button>
                </a>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-secondary hover:bg-gray-50 transition-colors focus:outline-none"
                aria-label="Abrir menu"
              >
                {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div className={`md:hidden absolute w-full bg-white border-t border-gray-100 shadow-xl transition-all duration-300 ease-in-out origin-top ${isOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 h-0'}`}>
          <div className="px-4 py-6 space-y-2 bg-white">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-6 py-4 text-lg font-medium text-gray-600 hover:text-primary hover:bg-blue-50 rounded-xl transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-6 mt-4 px-2 border-t border-gray-50">
               <a href={CONTACT_INFO.whatsapp} target="_blank" rel="noopener noreferrer">
                <Button fullWidth size="lg" className="gap-2 justify-center shadow-lg">
                    <Calendar className="w-5 h-5" />
                    Agendar Consulta
                </Button>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};