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
      {/* Top Bar - Disappears on scroll */}
      <div 
        className={`bg-secondary text-white transition-all duration-500 overflow-hidden ${
          isScrolled ? 'max-h-0 opacity-0' : 'max-h-12 py-2 opacity-100'
        } hidden md:block`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-xs lg:text-sm font-medium">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <MapPin className="w-3 h-3 lg:w-4 lg:h-4 text-accent" />
              <span className="opacity-90">QS 107, Samambaia - DF</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3 h-3 lg:w-4 lg:h-4 text-accent" />
              <span className="opacity-90">Seg - Sex: 07h às 16h30</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2">
               <Phone className="w-3 h-3 lg:w-4 lg:h-4 text-accent" />
               <span className="opacity-90">{CONTACT_INFO.phone}</span>
             </div>
             <div className="h-4 w-px bg-white/20"></div>
             <a 
               href={CONTACT_INFO.instagram} 
               target="_blank" 
               rel="noopener noreferrer" 
               className="hover:text-accent transition-colors flex items-center gap-1"
             >
               <Instagram className="w-3 h-3 lg:w-4 lg:h-4" />
               <span>@clinicaprontosam</span>
             </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white shadow-lg transition-all duration-300 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3 lg:py-4">
            
            {/* Logo */}
            <div className="flex-shrink-0">
              <a href="#" className="flex items-center gap-3 group">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-accent flex items-center justify-center text-white font-bold text-xl lg:text-2xl shadow-md group-hover:scale-105 transition-transform duration-300">
                  P
                </div>
                <div className="flex flex-col">
                  <span className="font-heading font-bold text-xl lg:text-2xl text-secondary leading-none group-hover:text-primary transition-colors">
                    ProntoSam
                  </span>
                  <span className="text-[10px] lg:text-xs uppercase tracking-widest text-gray-500 font-medium">
                    Clínica Médica
                  </span>
                </div>
              </a>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-600 hover:text-primary font-medium text-sm lg:text-base transition-colors relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-primary after:left-0 after:-bottom-1 hover:after:w-full after:transition-all"
                >
                  {link.name}
                </a>
              ))}
              <a href={CONTACT_INFO.whatsapp} target="_blank" rel="noopener noreferrer">
                <Button 
                  variant="primary" 
                  size="md" 
                  className="gap-2 shadow-blue-200/50 shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5"
                >
                  <Calendar className="w-4 h-4" />
                  Agendar
                </Button>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-secondary hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 absolute w-full left-0 top-full shadow-xl animate-fade-in-down">
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-lg font-medium text-gray-600 hover:text-primary hover:bg-blue-50 rounded-xl transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 mt-4 border-t border-gray-100">
                 <a href={CONTACT_INFO.whatsapp} target="_blank" rel="noopener noreferrer">
                  <Button fullWidth size="lg" className="gap-2 justify-center">
                      <Calendar className="w-5 h-5" />
                      Agendar Consulta
                  </Button>
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};