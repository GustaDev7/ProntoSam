import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Calendar } from 'lucide-react';
import { Button } from './Button';
import { CONTACT_INFO } from '../constants';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
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
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-4' : 'bg-transparent py-6 lg:py-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <a href="#" className="flex items-center gap-3 group">
              <div 
                className={`rounded-full bg-accent flex items-center justify-center text-white font-bold transition-all duration-300 group-hover:scale-110 shadow-lg ${
                  isScrolled ? 'w-10 h-10 text-xl' : 'w-12 h-12 lg:w-14 lg:h-14 text-2xl'
                }`}
              >
                P
              </div>
              <div className={`flex flex-col ${isScrolled ? 'text-secondary' : 'text-white'} group-hover:opacity-80 transition-colors`}>
                <span 
                  className={`font-heading font-bold leading-none tracking-tight transition-all duration-300 ${
                    isScrolled ? 'text-xl' : 'text-2xl lg:text-3xl'
                  }`}
                >
                  ProntoSam
                </span>
                <span className="text-xs uppercase tracking-wider font-medium opacity-90">Clínica Médica</span>
              </div>
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 lg:space-x-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-base font-medium hover:text-accent transition-colors ${
                  isScrolled ? 'text-gray-700' : 'text-gray-100'
                }`}
              >
                {link.name}
              </a>
            ))}
            <a href={CONTACT_INFO.whatsapp} target="_blank" rel="noopener noreferrer">
                <Button 
                  variant={isScrolled ? 'primary' : 'white'} 
                  size={isScrolled ? 'sm' : 'md'} 
                  className="gap-2 shadow-md transition-all duration-300"
                >
                <Calendar className="w-4 h-4" />
                Agendar Consulta
                </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-md transition-colors ${
                isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
              }`}
            >
              {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-xl absolute top-full left-0 w-full border-t border-gray-100 animate-fade-in-down">
          <div className="px-4 pt-4 pb-8 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-lg font-medium text-gray-700 hover:text-primary hover:bg-blue-50 rounded-xl transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-6 mt-6 border-t border-gray-100">
               <a href={CONTACT_INFO.whatsapp} target="_blank" rel="noopener noreferrer">
                <Button fullWidth size="lg" className="gap-2 justify-center">
                    <Calendar className="w-5 h-5" />
                    Agendar Agora
                </Button>
              </a>
              <div className="mt-6 flex items-center justify-center text-gray-500 gap-2 text-base">
                <Phone className="w-5 h-5" />
                <span>{CONTACT_INFO.phone}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};